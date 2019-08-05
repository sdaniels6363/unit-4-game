// ran as the document is loaded.
$(document).ready(function () {
  $("#player").empty();
  $("#target").empty();
  $("#graveyard-1").empty();
  $("#graveyard-2").empty();
  $("#graveyard-3").empty();

  function randomNumber(min,max){ // used to generate HP, attack, and counter
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  // generate HP settings for characters
  $("#darth-vader-hp").text(randomNumber(60,100));
  $("#obi-wan-hp").text(randomNumber(60,100));
  $("#palpatine-hp").text(randomNumber(60,100));
  $("#skywalker-hp").text(randomNumber(60,100));

  // generate attack/counter-attack power ratings
  $("#darth-vader-attack").text(randomNumber(5,10));
  $("#obi-wan-attack").text(randomNumber(5,10));
  $("#palpatine-attack").text(randomNumber(5,10));
  $("#skywalker-attack").text(randomNumber(5,10));

  $("#darth-vader-counter").text(randomNumber(1,9));
  $("#obi-wan-counter").text(randomNumber(1,9));
  $("#palpatine-counter").text(randomNumber(1,9));
  $("#skywalker-counter").text(randomNumber(1,9));

});

