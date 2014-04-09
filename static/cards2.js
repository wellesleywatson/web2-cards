


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
    //bfcard.textContent = "❅";
    bfcard.className = "cardback";
    bfcard.style.backgroundImage="url('static/cardback.png')";
    //bfcard.style.backgroundImage="{{ url_for('static', filename='cardback.jpg') }}";
    
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


var clicks = [];
var safe1 = 0;
var safe2 = 0;
var vault = 0;

var cardCheck = function(t)
{

  if(t)
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
var whosplay = 1;
var who1 = document.getElementById("player1");
var who2 = document.getElementById("player2");

who1.style.backgroundColor="#000000";
who1.style.color="#A0702E";


var checkforMatch = function()
{
      
       
       if (clicks.length > 1)
       { 
         if ((clicks[0].innerText == clicks[2].innerText) && (whosplay == 1))
         {
           audio4.play();
           vault++;
           safe1++;
           window.alert("you got a match");
           
           clicks[0].className += " matched";
           clicks[2].className += " matched";
           clicks[1].className += " matched";
           clicks[3].className += " matched";
           
           
           whosplay = 1;
           clicks = [];
         }  
         else if ((clicks[0].innerText != clicks[2].innerText) && (whosplay == 1))
         {
           alert ("sorry, no match");
           clicks[0].className = "cardfront";
           clicks[1].className = "cardback";
           
           clicks[2].className = "cardfront";
           clicks[3].className = "cardback";
           audio1.play();
           
           whosplay++;
           clicks = [];
           who2.style.backgroundColor="#000000";
           who2.style.color="#A0702E";
           
           who1.style.backgroundColor="#A0702E";
           who1.style.color="#000000";
           
         } 
         else if ((clicks[0].innerText == clicks[2].innerText) && (whosplay == 2))
         {
           audio4.play();
           vault++;
           safe2++;
           window.alert("you got a match");
           
           clicks[0].className += " matched";
           clicks[2].className += " matched";
           clicks[1].className += " matched";
           clicks[3].className += " matched";
           
           
           whosplay = 2;
           clicks = [];
           
           who2.style.backgroundColor="#000000";
           who2.style.color="#A0702E";
           
           who1.style.backgroundColor="#A0702E";
           who1.style.color="#000000";
         } 
         else if ((clicks[0].innerText != clicks[2].innerText) && (whosplay == 2))
         {
           alert ("sorry, no match");
           clicks[0].className = "cardfront";
           clicks[1].className = "cardback";
           
           clicks[2].className = "cardfront";
           clicks[3].className = "cardback";
           audio1.play();
           
           whosplay--;
           clicks = [];
           who2.style.backgroundColor="#A0702E";
           who2.style.color="#000000";
           
           who1.style.backgroundColor="#000000";
           who1.style.color="#A0702E";
         }
         if(vault == 8)
        {
            if(safe1 > safe2)
            {
             audio3.play();
             confirm("Congrats " + player1 + " you won !!!!. Would you like to play again?");
             setTimeout("location.reload(true);",1000);
            }
            else if(safe2 > safe1)
            {
             audio3.play();
             confirm("Congrats " + player2 + " you won !!!!. Would you like to play again?");
             setTimeout("location.reload(true);",1000);
            }
            else 
            {
             audio3.play();
             confirm("The game has ended with a tie, Would you like to play again?");
             setTimeout("location.reload(true);",1000);
            }
        } 

         giveprompt();
       }
  
      
}


/*===================================================================================================================*/

var tempt = document.getElementById("status");


/*===================================================================================================================*/

var giveprompt = function()
{
  
  
  
  if(document.querySelector('.cardfrontF.matched'))
  {
    
  
    scr1.textContent =  "Pairs Matched: " + safe1;
    scr2.textContent =  "Pairs Matched: " + safe2;
    console.log("player1's matched cards: " + safe1);
    console.log("player2's matched cards: " + safe2);
  }
  
}


/*===================================================================================================================*/

var p1 = document.getElementById("player1");
var p2 = document.getElementById("player2");
var scr1 = document.getElementById("score1");
var scr2 = document.getElementById("score2");
p1.textContent = "Player1: " + player1;
p2.textContent = "Player2: " + player2;
scr1.textContent = "Pairs Matched: " + safe1;
scr2.textContent = "Pairs Matched: " + safe2;
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
    
   p1.textContent = "Player1: " + player1;
   p2.textContent = "Player2: " + player2;
    
  }
  
}

playerChoice();

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

var saveboard = function(){
 var certain = confirm("are you sure you want to save this game?");
 if(certain == true)
 {
  
  var gamePlay = document.getElementsByClassName("sideBox");
  var sv = gamePlay[0].innerHTML;
  
  
   localStorage.twoplayerInfo = JSON.stringify({"pl1":player1, "pl2":player2, "who":whosplay, "matchedp1":safe1, "matchedp2":safe2, "gameArea":sv});
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
        
        safe1 = keeper.matchedp1;
        scr1.textContent = "Pairs Matched: " + safe1;
        safe2 = keeper.matchedp2;
        scr2.textContent = "Pairs Matched: " + safe2;
        whosplay = keeper.who;
    
    if(whosplay == 1)
    {
      who2.style.backgroundColor="#A0702E";
      who2.style.color="#000000";
           
       who1.style.backgroundColor="#000000";
       who1.style.color="#A0702E";
    }
    else
    {
      who2.style.backgroundColor="#000000";
      who2.style.color="#A0702E";
           
      who1.style.backgroundColor="#A0702E";
      who1.style.color="#000000";
    }

   }
   else
   {
     return
   }
};


/*===============================================================================================*/


