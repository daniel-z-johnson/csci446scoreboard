var guessesLeft = 10;
var highScores = new Array([9, "HarryJamesPotter"], [3, "ZedCthulhu"], [2, "NearlyDied"]);
var number=0;
var theGuess;
var win;

function generateRandomNumber(){
	number = Math.floor((Math.random()*100)+1);
}

function test(){
	generateRandomNumber();
	alert(number);
}

$(function() {
  updateScore(guessesLeft);
  highScores.sort(customSort);
  populateHighScores(highScores);
  generateRandomNumber();
  win = false;
});

function reset(){	
	guessesLeft = 10;
	updateScore(guessesLeft);
  	highScores.sort(customSort);
  	populateHighScores(highScores);
  	generateRandomNumber();
  	$('h2#score span#reset').empty();
  	$('h2#score span#highLow').empty();
  	win = false;
}

function populateHighScores(scores) {
	$('div#highScores').empty();
  for (var i = 0; i < scores.length; ++i) {
    $('div#highScores').append("<p>" + scores[i][0] + " " + scores[i][1] + "</p>");
  }
}

function updateScore(score) {
  $('h2#score span#guessesLeft').empty();
  $('h2#score span#guessesLeft').append(score);
}

function hint(hl) {
  $('h2#score span#highLow').empty();
  $('h2#score span#highLow').append(hl);
}

function guessNumber(){
	theGuess = $('input#guess').val();
	if(theGuess < 1 || theGuess > 100){
		guessesLeft = 1;
	}
	if(guessesLeft != 0 && !win){
		if(theGuess == number){
			hint("You Win with a score of " + guessesLeft);
			var name = prompt("You won, now enter your name or suffer...");
			highScores.push([guessesLeft,name]);
			highScores.sort(customSort);
  			populateHighScores(highScores);
			win = true;
			++guessesLeft;
			playAgain();


		}else if( theGuess > number){
			hint("Too High");
		}else {
			hint("Too Low" );
		}
		--guessesLeft;
		if(guessesLeft == 0){
			hint("You loose, now you will die! LOLOLOLOLOLOLOL");
			playAgain();
		}
	}
	updateScore(guessesLeft);
}

function playAgain(){
	$('h2#score span#reset').empty();
	$('h2#score span#reset').append("<input type=\"button\" value=\"Play Again?\" onclick=\"reset()\">");

}

function customSort(a,b){
	if(a[0] == b[0]){
		if(a[1]>b[1]){return 1;}
		if(a[1]<b[1]){return -1;}
		return 0;
	}
	if(a[0] < b[0]){
		return 1;
	}
	return -1;
}