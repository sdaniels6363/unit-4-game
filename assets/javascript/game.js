// initial state
var playerSelected = false;
var enemySelected = false;

var player;
var playerName;
var playerHP;
var playerAtt;
var attackMultiplier = 1; // we will increment this each attack cycle

var enemy;
var enemyName;
var enemyHP;
var enemyAtt;

var originalSkywalkerHP; // stored for if the game is reset, before completion.
var originalVaderHP; // stored for if the game is reset, before completion.
var orginalPalpatineHP; // stored for if the game is reset, before completion.
var originalObiWanHP; // stored for if the game is reset, before completion.

// ran as the document is loaded.
$(document).ready(function () {
  $("#player").empty();
  $("#target").empty();
  $("#graveyard-1").empty();
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
    var dataHP = randomNumber(60, 100);
    var dataAtt = randomNumber(10, 30);
    var dataCtr = randomNumber(20, 50);

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

  originalSkywalkerHP = $("#darth-vader-hp").text();
  originalVaderHP = $("#obi-wan-hp").text();
  orginalPalpatineHP = $("#palpatine-hp").text();
  originalObiWanHP = $("#skywalker-hp").text();

  // Inform player they need to select a character.
  $("#player").html('<h3 id="step-instructions">Choose your character!</h3>')
  // Add buttons to controls
  $("#controls").html('<button class="btn btn-danger" id="attack">Attack</button><button class="btn btn-info" id="reset">Reset</button>')

  // place the game instructions in the graveyard column, we'll remove them once the player has selected ready.
  $("#graveyard-1").html("<p>First, choose the character you wish to play as!</p>")
  $("#graveyard-2").html("<p>Second, choose the character you wish to fight!</p>")
  $("#graveyard-3").html("<h4>How to Play:</h4><p>Once you have selected your player, the goal is to fight the remaining characters until all of them are defated.  Your enemy's Counter Attack Stat is the one you need to be concerned with.  Your attack stat will double on increment by an increment of itself, on each turn.  For example, if your attack is worth 10, then on turn 2 it's 20, on turn 3 it's 30, and so on.</p>")

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
      $("#graveyard-1").empty();
    } else if (playerSelected === true && enemySelected === false) { // player has been chosen, enemy has not
      enemy = "#" + character;
      enemyName = character;
      $("#target").empty();
      $(enemy).appendTo("#target");
      enemySelected = true;
      enemyHP = $(enemy).attr("data-hp");
      enemyCtr = $(enemy).attr("data-counter");
      $("#graveyard-2").empty();
      $("#graveyard-3").empty();
      $("#graveyard-1").append("<h3>Defeated opponents</h3>")
    } else if (playerSelected === true && enemySelected === true) { // both player/enemy have been selected
      alert("Cannot change characters.");
    }


  });

  $("#attack").on("click",function(){
    if (playerSelected && enemySelected){ // make sure is a player and enemy selected.
      var damage = parseInt(playerAtt)*parseInt(attackMultiplier);
      playerHP = playerHP - enemyCtr;
      enemyHP = enemyHP - damage;
      playerHtmlHP = player+"-hp";
      enemyHtmlHP = enemy+"-hp";
      $(playerHtmlHP).text(playerHP);
      $(enemyHtmlHP).text(enemyHP);
      $("#player-notifications").empty();
      $("#player-notifications").html("You attacked "+enemyName+" for "+damage+" damage.<br>"+enemyName+" countered and dealt "+enemyCtr+" damage to you.");
      
      

      attackMultiplier++
    } else {
      alert("Please select your player or opponent.");
    }
  });

  $("#reset").on("click", function () { // used to reset the game.
    $("#player").find(".combatants").appendTo(".fighters"); // moves player back to character selections
    $("#target").find(".combatants").appendTo(".fighters"); // moves enemy back to character selections
    $("#player").empty();
    $("#target").empty();
    playerSelected = false;
    enemySelected = false;
    console.log("reset game");
  });






});




