/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, scores, roundScore, isGamePlaying,previousDice0 , previousDice1;

//Initial Variables that is considered as the main content
init();



//On clicking roll dice button the following things happen
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(isGamePlaying){
    //Dice value is calculated
    var dice = Math.floor(Math.random() * 6)+1;
    
    //setting the dice value and dice image matchingly on the screen
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';
    
    //updating the round score which is not the overall score, but the score below overall score(check the webpage you will understand)
    if(dice !== 1 ){
        roundScore += dice;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
    }else{
        nextPlayer();
    }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(isGamePlaying){                                                
    scores[activePlayer] += roundScore;
                                                     
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    var input = document.querySelector('.final-score').value;
    var winningScore;
        
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }
    if(scores[activePlayer]>=winningScore){
        document.querySelector('#name-'+activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        isGamePlaying = false;

    }else{
        nextPlayer();
    }
    }
});


document.querySelector('.btn-new').addEventListener('click',init);


function nextPlayer(){
    roundScore = 0;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
        diceDOM.style.display = 'none';
}



function init(){
scores=[0,0];
activePlayer = 0;
roundScore = 0;
isGamePlaying = true;
previousDice0 = 0;
previousDice1 = 0;


//setting the dice invisisble at the start of the game
document.querySelector('.dice').style.display = 'none';


//setting the points to be 0 inititally
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('name-0').textContent = "Player 1";
document.getElementById('name-1').textContent = "Player 2";
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');  
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');  
document.querySelector('.player-0-panel').classList.add('active');
}
