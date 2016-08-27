'use strict';

var Simon = function(turns, score){
	var maxTurns = turns, //turns before "win" and restart game
		sequence = [],
		isStrict = false, //allows retries on incorrect input
		highScore = score;

	//min and max handled
	if (maxTurns > 99){
		maxTurns = 99;
	} else if (maxTurns > 1){
		maxTurns = 1;
	}

	return {
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

	$('.test').on('click', function(){
		mySimon.generateNext();
	});
});