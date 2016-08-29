'use strict';

var Simon = function(turns, score){
	var maxTurns = turns, //turns before "win" and restart game
		sequence = [],
		isStrict = false, //allows retries on incorrect input
		isPlayerTurn = false,
		currentSteps = 0, //total steps
		tempSteps = 0, //used to play back sequence
		currentPlayerSteps = 0,
		highScore = score,
		sfxAlternator = '0'; //helps prevent pops on rapid double-clicks

	//min and max handled
	if (maxTurns > 99){
		maxTurns = 99;
	} else if (maxTurns < 1){
		maxTurns = 1;
	}

	//local high score
	$('#high-score').text(highScore);

	return {
		checkPlayerMove: function(btnID){
			var thisSimon = this;

			if (sequence[currentPlayerSteps] === btnID){
				this.btnClick(btnID);
				currentPlayerSteps++;
			} else {
				isPlayerTurn = false;
				$('.score').addClass('incorrect');
				$('.score').text('X');

				if (isStrict){
					window.setTimeout(function(){
						$('.score').removeClass('incorrect');
						$('.score').text(currentSteps);
					}, 350);	
				} else {
					window.setTimeout(function(){
						$('.score').removeClass('incorrect');
					}, 300);
				}

				//game over
				if (isStrict){
					//console.log('GAME OVER');
					$('.status').find('p').text('Game Over!');
				//repeat pattern
				} else {
					currentPlayerSteps = 0;
					tempSteps = 0;
					window.setTimeout(function(){
						$('.score').text(currentSteps);
						thisSimon.playSequence();
					}, 750);
				}
			}

			if (currentPlayerSteps === currentSteps){
				//update high score
				if (currentSteps > highScore){
					highScore = currentSteps;
					localStorage.setItem('score', highScore.toString());
					$('#high-score').text(highScore);
				}

				isPlayerTurn = false;
				currentSteps++;
				currentPlayerSteps = 0;

				$('.score').addClass('correct');
				
				window.setTimeout(function(){
					$('.score').removeClass('correct');
				}, 300);

				//check for turn limit
				//console.log(currentSteps, maxTurns);
				if (currentSteps >= maxTurns + 1){
					$('.score').text(currentSteps - 1);
					$('.status').find('p').text('You win!');
				} else {
					$('.score').text(currentSteps);
					window.setTimeout(function(){
						thisSimon.generateNext();
					}, 750);
				}
			}
		},

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
			var thisSimon = this;
			this.btnClick(sequence[tempSteps]);

			tempSteps++;
			//console.log(tempSteps, currentSteps);
			
			if (tempSteps === currentSteps){
				isPlayerTurn = true;
				tempSteps = 0;
			} else {
				window.setTimeout(function(){
					thisSimon.playSequence();
				}, 500);
			}
		},

		generateNext: function(){
			sequence.push(Math.floor(Math.random() * 4));
			//console.log(sequence);
			this.playSequence();
		},

		getPlayerTurn: function(){
			return isPlayerTurn;
		},

		newGame: function(strict){
			isPlayerTurn = false;
			isStrict = strict;
			sequence = [];
			currentSteps = 1;
			tempSteps = 0;
			currentPlayerSteps = 0;
			$('.status').find('p').text('Repeat after me');
			$('.score').text(currentSteps);

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
		if (mySimon.getPlayerTurn()){
			mySimon.checkPlayerMove($(this).data('id'));
		}
	});

	$('#new-game').on('click', function(){
		mySimon.newGame(false);
	});

	$('#new-strict-game').on('click', function(){
		mySimon.newGame(true);
	});

});