// initial state
var playerSelected = false;
var enemySelected = false;
var player;
var enemy;

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

  // Inform player they need to select a character.
  $("#player").html('<h3 id="step-instructions">Choose your character!</h3>')
  // Add buttons to controls
  $("#controls").html('<button class="btn btn-success" id="confirm-player">Confirm Player Selection</button><button class="btn btn-info" id="reset">Reset</button>')

  // place the game instructions in the graveyard column, we'll remove them once the player has selected ready.
  $("#graveyard-1").html("<p>First, choose the character you wish to play as!</p>")
  $("#graveyard-2").html("<p>Second, choose the character you wish to fight!</p>")
  $("#graveyard-3").html("<h4>How to Play:</h4><p>Once you have selected your player, the goal is to fight the remaining characters until all of them are defated.  Your enemy's Counter Attack Stat is the one you need to be concerned with.  Your attack stat will double on increment by an increment of itself, on each turn.  For example, if your attack is worth 10, then on turn 2 it's 20, on turn 3 it's 30, and so on.</p>")

  // once game loads, have player choose character
  $(".combatants").on("click", function () {
    var character = this.id; // get the ID of the selected combatant
    if (playerSelected === false) { // player has not been chosen
      player = "#" + character; // set the global variable
      $("#player").empty();
      $("#" + character).appendTo("#player");
    } else if (playerSelected === true && enemySelected === false) { // player has been chosen, enemy has not
      enemy = "#" + character;
      $("#target").empty;
      $(enemy).appendTo("#target");
    } else if (playerSelected === true && enemySelected === true) { // both player/enemy have been selected
      alert("Cannot change characters.");
    }


  });

  $("#confirm-player").on("click", function () {
    // lock in chosen player
    $("#controls").empty();
    $("#controls").html('<button class="btn btn-danger" id="confirm-enemy">Confirm Enemy Selection</button><button class="btn btn-info" id="reset">Reset</button>');
    $("#target").html('<h3 id="step-instructions">Select an enemy!</h3>');
    playerSelected = true;
  });

  $("#confirm-enemy").on("click", function () {
    // lock in chosen player
    $("#enemy-instructions").remove();
    $("#controls").empty();
    $("#controls").html('<button class="btn btn-danger" id="attack">Attack</button><button class="btn btn-info" id="reset">Reset</button>')
    enemySelected = true;

  });

  $("#reset").on("click", function () { // used to reset the game.
    var player = $("#player");
    var target = $("#target");
    $(player).find(".combatants").appendTo(".fighters"); // moves player back to character selections
    $(target).find(".combatants").appendTo(".fighters"); // moves enemy back to character selections
    $(player).empty();
    $(target).empty();
    playerSelected = false;
    enemySelected = false;
    console.log("reset game");
  });






});




