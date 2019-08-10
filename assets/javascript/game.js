// initial state
var playerSelected = false;
var enemySelected = false;
var playerLost = false;
var playerAlliance;

var player;
var playerName;
var playerHP;
var playerAtt;
var attackMultiplier = 1; // we will increment this each attack cycle

var enemy;
var enemyName;
var enemyHP;
var enemyAtt;

var graveyardPostion = 1;// use this to track the graveyard the defeated enemy should go to.
var remainingEnemies = 3;// set how many enemies there are.

function loadGame() {
  $("#player").empty();
  $("#target").empty();
  $("#graveyard-2").empty();
  $("#graveyard-3").empty();

  function randomNumber(min, max) { // used to generate HP, attack, and counter, goes in increments of 10
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }

  function generateCharAttrs(id) {
    // this function is responsible for generating each fighter's attributes
    var character = "#" + id;
    var htmlHP = "#" + id + "-hp"; // used for the HP value
    var htmlAtt = "#" + id + "-attack"; // used for the attack value
    var htmlCtr = "#" + id + "-counter"; // used for the counter-attack value
    var dataHP = randomNumber(80, 100);
    var dataAtt = randomNumber(10, 30);
    var dataCtr = randomNumber(20, 40);

    // set the content of the actual text to display
    $(htmlHP).text(dataHP); // used for the HP value
    $(htmlAtt).text(dataAtt); // used for the attack value
    $(htmlCtr).text(dataCtr); // used for the counter-attack value
    // set the attributes of the fighter button
    $(character).attr("data-hp", dataHP); // used for the HP value
    $(character).attr("data-attack", dataAtt);// used for the attack value
    $(character).attr("data-counter", dataCtr);// used for the counter-attack value
  }

  // generate HP settings for characters
  generateCharAttrs("darth-vader");
  generateCharAttrs("obi-wan");
  generateCharAttrs("palpatine");
  generateCharAttrs("skywalker");

  // Inform player they need to select a character.
  $("#player").html('<h3 id="step-instructions">Choose your character!</h3>')

  // place the game instructions in the graveyard column, we'll remove them once the player has selected a character.  
  // I know inline styling is frowned upon but this only exists at the beginning of the game.  This HTML is temp.
  $("#target").html('<div style="padding: 20px;text-align: justify; background-color: rgb(0,0,0,.75); color:rgb(255,255,0);"><h4>How to Play:</h4><p>Once you have selected your player, the goal is to fight the remaining characters until all of them are defated.  Your enemy&apos;s Counter Attack Stat is the one you need to be concerned with.  Your attack stat will double per successful attack.  For example, if your attack is worth 10, then on turn 2 it&apos; s 20, on turn 3 it&apos;s 30, and so on.</p></div>')

}


// ran as the document is loaded.
$(document).ready(function () {
  // play startup music
  new Audio("assets/music/cantina.mp3").play();

  // run function to load the game
  loadGame();

  // once game loads, have player choose character
  $(".combatants").on("click", function () {

    var character = this.id; // get the ID of the selected combatant

    if (playerSelected === false) { // player has not been chosen
      player = "#" + character; // set the global variable
      playerName = character;
      $("#player").empty();
      $("#" + character).appendTo("#player");
      playerSelected = true;
      playerAtt = $(player).attr("data-attack");
      playerHP = $(player).attr("data-hp");
      playerAlliance = $(player).attr("data-alliance");
      $("#target").empty()
      $("#target").append('<h3 id="step-instructions">Choose your opponent!</h3>');

    } else if (playerSelected === true && enemySelected === false) { // player has been chosen, enemy has not
      enemy = "#" + character;
      enemyName = character;
      $("#target").empty();
      $(enemy).appendTo("#target");
      enemySelected = true;
      enemyHP = $(enemy).attr("data-hp");
      enemyCtr = $(enemy).attr("data-counter");

    } else if (playerSelected === true && enemySelected === true) { // both player/enemy have been selected
      alert("Cannot change characters.");
    }


  });

  $("#attack").on("click", function () {

    if (playerSelected && enemySelected) { // make sure the player and an enemy are selected.

      if (playerLost) { // if the player has lost, prevent the attack button from working.
        $("#player-notifications").empty()
        $("#player-notifications").append("<h3>You have lost, press reset to start over!</h3>")
      } else { // if the player hasn't lost yet, allow the game to continue

        // determines how much damange the player will do per round of attacks
        var damage = parseInt(playerAtt) * parseInt(attackMultiplier);

        // player attacks
        enemyHP = enemyHP - damage;
        enemyHtmlHP = enemy + "-hp";
        $(enemyHtmlHP).text(enemyHP);
        $("#player-notifications").empty();
        $("#player-notifications").append("<p>You attacked " + enemyName + " for " + damage + " damage.</p>");

        if (enemyHP > 0) { // if enemy hp is greater than zero, allow the counter attack.
          // enemy attacks
          playerHP = playerHP - enemyCtr;
          playerHtmlHP = player + "-hp";
          $(playerHtmlHP).text(playerHP);
          $("#player-notifications").append("<p>" + enemyName + " countered and dealt " + enemyCtr + " damage to you.</p>");
          if (playerHP <= 0) { // if the player's hp is less than or equal to zero, the player loses.
            $("#player-notifications").empty()
            $("#player-notifications").append("<h3>You have lost, press reset to start over!</h3>")
            playerLost = true;

            // This part just played music for fun.  If you lose, the theme opposite of your character is played.
            if (playerAlliance === "rebel") {
              // if the player selected a rebel player and lost, play the empire's theme.
              new Audio("assets/music/empire.mp3").play();
            } else {
              // if they selected empire player, play rebel theme:
              new Audio("assets/music/rebel.mp3").play();
            }
          }

        } else if (enemyHP <= 0) { // enemy dies and is moved to graveyard

          var graveyardDest = "#graveyard-" + graveyardPostion;
          $(enemy).appendTo(graveyardDest);
          // $("#target").empty(); // remove enemy once defeated
          $("#player-notifications").append("<p>You have defeated " + enemyName + "!</p>");
          remainingEnemies = remainingEnemies - 1;

          if (remainingEnemies === 0) { // if you run out of enemies, announce that the player has won.
            $("#player-notifications").empty();
            $("#player-notifications").append("<h1>YOU WIN</h1>");

            // This part just played music for fun.  If you there are no remaining enemies, the theme of your character is played.
            if (playerAlliance === "rebel") {
              // if the player selected a rebel player and won, play the rebel theme.
              new Audio("assets/music/rebel.mp3").play();
            } else {
              // if they selected empire player, play empire theme:
              new Audio("assets/music/empire.mp3").play();
            }
          }

          enemySelected = false; // set the enemy selected setting for false, so the player must pick another enemy.
          graveyardPostion++ // increment the graveyard identifier, this will move each defeated enemy to a different space

        }

        attackMultiplier++; //increment the attack multiplier
      }
    } else {
      alert("Please select your player or opponent.");
    }
  });

  $("#reset").on("click", function () { // used to reset the game.

    $(player).appendTo(".fighters"); // moves player back to character selections
    $(enemy).appendTo(".fighters"); // moves enemy back to character selections
    $("#graveyard-1").find(".combatants").appendTo(".fighters"); // moves enemy back to character selections
    $("#graveyard-2").find(".combatants").appendTo(".fighters"); // moves enemy back to character selections
    $("#graveyard-3").find(".combatants").appendTo(".fighters"); // moves enemy back to character selections


    $("#player").empty(); // just any remaining cleanup.
    $("#target").empty();  // just any remaining cleanup.
    $("#player-notifications").empty(); // just any remaining cleanup.


    //hardset variables to original state
    playerSelected = false;
    enemySelected = false;
    playerLost = false;

    player = "";
    playerName = "";
    playerHP = "";
    playerAtt = "";
    attackMultiplier = 1; // we will increment this each attack cycle

    enemy = "";
    enemyName = "";
    enemyHP = "";
    enemyAtt = "";

    graveyardPostion = 1;// use this to track the graveyard the defeated enemy should go to.
    remainingEnemies = 3;// set how many enemies there are.

    loadGame(); // regenerates player stats

  });

});
