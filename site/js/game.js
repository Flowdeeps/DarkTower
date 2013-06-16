window.onload = function(){

  // objects
  var start = $('#start');

  // set vars
  var sit = false;
  var sleep = false;
  var sword = false;

  // audio gubbins
  // room 1
  var room1rain = new buzz.sound("audio/room1_rain_loop.wav");
  var room1ambient = new buzz.group(room1rain);
  // room 2 audio
  var room2rain = new buzz.sound("audio/room2_rain_loop.wav");
  var room2ambient = new buzz.group(room2rain);
  // room 3
  var room3flies = new buzz.sound("audio/room3_flies_loop.wav");
  var room3ambient = new buzz.group(room3flies);

  // incidentals
  // I would imagine that putting the clicks and bumps and breaks from the rest of the game in here would make sense

  start.bind('click', function(){
    room2ambient.loop().fadeIn();
    return false;
  });

  // ambient.play();

  // helper functions
  function randomizr(limit){
    var randNum = 0;
    randNum = Math.floor(Math.random(1) * limit);
    return randNum;
  }

  // set text nodes
  // set the story tree
  var storyTree = [];


  // room vars
  var room1 = true;
  var room2 = false;
  var room3 = false;
  var room4 = false;

  // puzzles
  if (room1 === true) {
    var room1puzz1 = $('#room1puzz1');
    var links = ('#room1puzz1a a').length;

    $('#room1puzz1').find('a').bind('click', function(){
      console.log($(this).text());
      return false;
    });

    var diceOfDeath = randomizr(links);

  }



};