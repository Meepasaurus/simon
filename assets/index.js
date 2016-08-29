'use strict';

var Simon = function(turns, score){
	var maxTurns = turns, //turns before "win" and restart game
		sequence = [],
		isStrict = false, //allows retries on incorrect input
		currentSteps = 0,
		highScore = score,
		sfxAlternator = '0'; //helps prevent pops on rapid double-clicks

	//min and max handled
	if (maxTurns > 99){
		maxTurns = 99;
	} else if (maxTurns > 1){
		maxTurns = 1;
	}

	return {
		btnClick: function(btnID){
			this.playSound(btnID);
			$('.btn-' + btnID).addClass('active-' + btnID);
			window.setTimeout(function(){
				$('.btn-' + btnID).removeClass('active-' + btnID);
			}, 200);
		},

		playSound: function(soundID){
			var thisBtn = document.getElementById(soundID.toString() + sfxAlternator);
			thisBtn.pause();
			thisBtn.currentTime = 0;
			thisBtn.play();
			sfxAlternator = (sfxAlternator === '0') ? '1' : '0';
		},

		playSequence: function(){
			for (var i=0, x=sequence.length; i<x; i++){
				this.btnClick(sequence[i]);
			}
		},

		generateNext: function(){
			currentSteps++;
			$('.score').text(currentSteps);
			sequence.push(Math.floor(Math.random() * 4));
			console.log(sequence);
			this.playSequence();
		},

		newGame: function(strict){
			isStrict = strict;
			sequence = [];
			currentSteps = 0;
			this.generateNext();
		}
	};
};

$(document).ready(function(){
	//check for local high score
	var localScore = $.parseJSON(localStorage.getItem('score'));

	if (localScore === null){
		localStorage.setItem('score', '0');
		localScore = 0;
	}

	//recommended 99 turns but freecodecamp asks for 20 turn limit
	var mySimon = new Simon(20, localScore);

	$('.game-btn').on('click', function(){
		mySimon.btnClick($(this).data('id'));
	});

	$('#new-game').on('click', function(){
		mySimon.newGame('false');
	});

});