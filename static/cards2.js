


/*===================================================================================================================*/

var createDeck = function() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
  var ranks = ["A","J","7","K","A","J","7","K"];
 var suits = ["♣","♠"];
  var j, k, index=0;
  var pack_size;

  // Set array of cards.
  // total number of cards
  pack_size = ranks.length * suits.length;
  var cards = [];
  

  // Fill the array with 'n' packs of cards.
  while (index < pack_size)
  {
    for (j = 0; j < suits.length; j++)
     {
       for (k = 0; k < ranks.length; k++)
         {
            console.log("k:",k,"index:",index);
            cards[index] = {rank:ranks[k], suite:suits[j]};
            index++;
          }
       }
    }
  console.log(cards.length);
  return cards;
}

/*===================================================================================================================*/


var showCards = function(cardJSON)
{
    txt = cardJSON.rank + cardJSON.suite;
    
     
      
    var bfcard = document.createElement("div");
    bfcard.textContent = "❅";
    bfcard.className = "cardback";
    
    var ffcard = document.createElement("div");
    ffcard.textContent = txt;
    ffcard.className = "cardfront";

      
      
    var crd = document.createElement("div");
    crd.className = "flipper";
    
    console.log(ffcard);
    console.log(bfcard);
    console.log(crd);
    
    crd.appendChild(ffcard);
    crd.appendChild(bfcard);
      
    
    crd.setAttribute("onclick", "cardCheck(this)");
   
    document.querySelector(".sideBox").appendChild(crd);
}

/*===================================================================================================================*/



var audio1 = document.getElementById("audio1");
var audio2 = document.getElementById("audio2");
var audio3 = document.getElementById("audio3");
var audio4 = document.getElementById("audio4");



/*===================================================================================================================*/



var restart = function()
{
 var msg = "Game over, would you like to try again?";
 confirm(msg);
 setTimeout("location.reload(true);",1000);
	
}

/*===================================================================================================================*/

var turns = 24;
var clicks = [];
var safe = 0;

var cardCheck = function(t)
{
  if(turns == 0)
  {
    audio2.play();
    restart();
    return
  }
  else if(t)
  {
   audio1.play();
   t.querySelector('.cardfront').className = "cardfrontF";
   t.querySelector('.cardback').className = "cardbackF";
  }
  else if(t.querySelector(".cardfrontF").className == "cardfrontF")
  {
    return    
  }
  else if(t.querySelector(".cardfrontF.matched").className == "cardfrontF matched")
  {
   return    
  }

  turns--;
  pushtoCardStack(t);
  checkforMatch();
  
  
}


/*=================================================================================================================*/


var pushtoCardStack = function(t) 
{  
    if (t.classList.contains("matched")) 
    {
      return
    }
   
    clicks.push(t.querySelector(".cardfrontF"),t.querySelector(".cardbackF"));
    console.log("clicks: " + clicks);
}

/*=================================================================================================================*/


var tempt2 = document.getElementById("status2");
tempt2.textContent = "Number of turns remaining: " + 24;


/*=================================================================================================================*/


var checkforMatch = function()
{
      
       
       if (clicks.length > 1)
       {  
         
         console.log("turns so far: " + turns);
         
         tempt2.textContent = "Number of turns remaining: " + turns;
  
         
         if (clicks[0].innerText == clicks[2].innerText) 
         {
           audio4.play();
           window.alert("you got a match");
           
           clicks[0].className += " matched";
           clicks[2].className += " matched";
           clicks[1].className += " matched";
           clicks[3].className += " matched";
           safe++;
           
           if(safe == 8)
           {
             audio3.play();
             confirm("Congrats, you won !!!!. Would you like to play again?");
             setTimeout("location.reload(true);",1000);
           }
           
          
           
         } 
         else 
         {
           
           alert ("sorry, no match");
           clicks[0].className = "cardfront";
           clicks[1].className = "cardback";
           
           clicks[2].className = "cardfront";
           clicks[3].className = "cardback";
           audio1.play();
           
         }
         giveprompt();
         clicks = [];
       }
  
      
}


/*===================================================================================================================*/

var tempt = document.getElementById("status");
tempt.textContent = "Number of Matched Cards: " +  safe;

/*===================================================================================================================*/

var giveprompt = function()
{
  
  
  
  if(document.querySelector('.cardfrontF.matched'))
  {
    
    tempt.textContent = "Number of Matched Cards: " +  safe; 
    console.log("number of matched cards: " + safe);
  }
  
}


/*===================================================================================================================*/

var showDeck = function(deck)
{
    var idx;
    for (idx = 0; idx < deck.length; ++idx) 
    {
            console.log("so far, so good",deck[idx]);
            showCards(deck[idx]);
    }
}

/*===================================================================================================================*/

var game = function()
{
var deck = createDeck();
var cards = deck.sort( function() { return 0.5 - Math.random() } );
showDeck(cards);
}

game();


/*=====================================================================================================================*/

var p1 = document.getElementById("player1");
var p2 = document.getElementById("player2");
var player1 = "";
var player2 = "";

var playerChoice = function()
{
 
  player1 = window.prompt("Please enter Name of player one"); 
  player2 = window.prompt("Please enter Name of player two");  
  
  if((player1 == "") || (player2 == ""))
  {
   alert("Not a valid entry, please try again");
   playerChoice();
  }
  else
  {
   p1.textContent += "Player 1: " + player1;
   p2.textContent += "Player 1: " + player2;
  }

}

playerChoice();


/*===============================================================================================*/


var saveboard = function(){
 var certain = confirm("are you sure you want to save this game?");
 if(certain == true)
 {
  
  var gamePlay = document.getElementsByClassName("sideBox");
  var sv = gamePlay[0].innerHTML;
  
  
  localStorage.twoplayerInfo = JSON.stringify({"pl1":player1, "pl2":player2, "turns":turns, "matched":safe, "gameArea":sv});
  alert("Game successfully saved");
  console.log("LS: " + localStorage);
 }
  else
  {
    alert("Please continue playing this game");
    return
  }
}
/*===============================================================================================*/


var resetboard = function(){

var certain = confirm("are you sure you want to reset saved game?");

  if(certain == true)
  {
    
    var keeper = JSON.parse(localStorage.twoplayerInfo);
    
   
     if((player1 != keeper.pl1 ) && (player2 != keeper.pl2))
     {
       alert("You are not one of the owners of this saved game. Access denied!!");
       return
     }
     else if((player1 == keeper.pl1 ) && (player2 != keeper.pl2))
     {
       p1.textContent = "Player 1: " + keeper.pl1;
       p2.textContent = "Player 2: " + keeper.pl2;
     }
    else if((player1 != keeper.pl1 ) && (player2 == keeper.pl2))
     {
       p1.textContent = "Player 1: " + keeper.pl1;
       p2.textContent = "Player 2: " + keeper.pl2;
     }
    else if((player1 == keeper.pl1 ) && (player2 == keeper.pl2))
     {
       p1.textContent = "Player 1: " + keeper.pl1;
       p2.textContent = "Player 2: " + keeper.pl2;
     }
    
        var n = document.getElementsByClassName("sideBox");
        n[0].innerHTML = keeper.gameArea;
        
        turns = keeper.turns;
        tempt2.textContent = "Number of turns remaining: " + keeper.turns;
        safe = keeper.matched
        tempt.textContent = "Number of Matched Cards: " + keeper.matched;


   }
   else
   {
     return
   }
};


/*===============================================================================================*/

