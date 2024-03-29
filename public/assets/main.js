var guessesLeft = 10;
var highScores;
var number=0;
var theGuess;
var win;

function quickFix(str){
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	str = $.trim(str);

	return str;
}

function getHighScores(){
	highScores = new Array();
	$.getJSON("/scores.json", function(data){
		$.each(data, function(obj){
			highScores.push(new Array(data[obj]['score'], data[obj]['name']));
		});
		populateHighScores(highScores);
	});
}

function generateRandomNumber(){
	number = Math.floor((Math.random()*100)+1);
}

function test(){
	generateRandomNumber();
	alert(number);
}

$(function() {
  updateScore(guessesLeft);
  getHighScores();
  generateRandomNumber();
  win = false;
});

function reset(){	
	guessesLeft = 10;
	updateScore(guessesLeft);
  	getHighScores();
  	generateRandomNumber();
  	$('h2#score span#reset').empty();
  	$('h2#score span#highLow').empty();
  	win = false;
}

function populateHighScores(scores) {
	scores.sort(customSort);
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
			name = quickFix(name);
			var obj = new Object();
			obj.name = name;
			obj.score = guessesLeft;
			if (name){
				$.post("/scores.json", obj);
			}
			getHighScores();
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
