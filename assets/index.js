'use strict';

var Simon = function(turns, score){
	var maxTurns = turns, //turns before "win" and restart game
		sequence = [],
		isStrict = false, //allows retries on incorrect input
		highScore = score,
		sfxAlternator = '0'; //helps prevent pops on rapid double-clicks

	//min and max handled
	if (maxTurns > 99){
		maxTurns = 99;
	} else if (maxTurns > 1){
		maxTurns = 1;
	}

	return {
		playSound: function(soundID){
			console.log(soundID.toString() + sfxAlternator);
			var thisBtn = document.getElementById(soundID.toString() + sfxAlternator);
			thisBtn.pause();
			thisBtn.currentTime = 0;
			thisBtn.play();
			sfxAlternator = (sfxAlternator === '0') ? '1' : '0';
		},

		generateNext: function(){
			sequence.push(Math.floor(Math.random() * 4));
			console.log(sequence);
		},

		newGame: function(){
			sequence = [];
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

	//document.getElementById('sfx-0').play();
	//document.getElementById('sfx-1').play();
	//document.getElementById('sfx-2').play();
	//document.getElementById('sfx-3').play();

	$('.game-btn').on('click', function(){
		mySimon.playSound($(this).data('id'));
	});

});