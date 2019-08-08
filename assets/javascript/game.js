// ran as the document is loaded.
$(document).ready(function () {
  $("#player").empty();
  $("#target").empty();
  $("#graveyard-1").empty();
  $("#graveyard-2").empty();
  $("#graveyard-3").empty();

  function randomNumber(min, max) { // used to generate HP, attack, and counter
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateCharAttrs(id) {
    // this function is responsible for generating each fighter's attributes
    var character = "#" + id;
    var htmlHP = "#" + id + "-hp"; // used for the HP value
    var htmlAtt = "#" + id + "-attack"; // used for the attack value
    var htmlCtr = "#" + id + "-counter"; // used for the counter-attack value
    var dataHP = randomNumber(60, 100);
    var dataAtt = randomNumber(5, 10);
    var dataCtr = randomNumber(1, 9);

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

  // initial state
  var playerSelected = false;

  // Inform player they need to select a character.
  $("#player").html('<div id="step-1-instructions">Select a character from above to play as!</div>')
  // Add buttons to controls
  $("#controls").html('<button class="btn btn-success" id="confirm-player">Confirm Player Selection</button><button class="btn btn-info" id="reset">Reset</button>')

  // once game loads, have player choose character
  $(".combatants").on("click", function () {
    var player = $("#player");
    var character = this.id;
    var selected = "#" + character;
    if (player.html().includes("Select a")) {
      $(player).empty();
      $(selected).appendTo(player);
      console.log("moved " + selected + " to player zone.")
    } else if (playerSelected) {
      var enemy = "#" + character;
      $(enemy).appendTo("#target");
    } else if (player.attr("id")) {
      var prevSelected = $(player).find('button')
      $(prevSelected).appendTo(".fighters");
      $(player).empty();
      $(selected).appendTo(player);
      console.log("replaced previous character");

    }
  });

  $("#confirm-player").on("click", function () {
    // lock in chosen player
    playerSelected = true;
    $("target").html("<h3>Select an enemy!</h3>");
    console.log("player hit confirm.")
  });

  $("#reset").on("click", function () {
    var player = $("#player");
    var target = $("#target");
    $(player).appendTo(".fighters");
    $(target).appendTo(".fighters")
    $(player).empty();
    $(target).empty();
    console.log("reset game");
  });







});




