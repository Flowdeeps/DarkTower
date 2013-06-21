window.onload = function(){

  // objects
  var gameStage = $('section > div');
  var intro     = $('#intro');
  var start     = $('#start');
  var gameOver  = $('#gameOver');

  // set vars
  var sit = false;
  var sleep = false;
  var sword = false;

  // room states
  var room1 = false;
  var room2 = false;
  var room3 = false;
  var room4 = false;

  // puzzle attempts
  // is an increasing integer
  var puzzTry = null;

  // audio gubbins
  // let's try the audio in arrays
  var arrAudio = {
    drone      : ["audio/under_drone.mp3"],
    lose       : ["audio/lose.mp3"],
    ambience   : ["audio/room1_ambience.mp3",
                  "audio/room2_rain_loop.mp3",
                  "audio/room2_rats.mp3",
                  "audio/room2_wind.mp3",
                  "audio/room3_flies_loop.mp3"],
    puzzle     : ["audio/room2_bell1.mp3",
                  "audio/room2_bell2.mp3",
                  "audio/room2_bell3.mp3"],
    room1      : ["audio/room1_1.mp3",
                  "audio/room1_2.mp3",
                  "audio/room1_3.mp3",
                  "audio/room1_4.mp3"],
    room2      : ["audio/room2_1.mp3",
                  "audio/room2_2.mp3",
                  "audio/room2_3.mp3",
                  "audio/room2_4.mp3",
                  "audio/room2_5.mp3"],
    room3      : ["audio/room3_1.mp3"]
  };
  // tower drone
  var drone           = new buzz.sound(arrAudio.drone[0] ,{
    loop: true
  });
  // ambience
  // room 1
  var room1rain       = new buzz.sound(arrAudio.ambience[0] ,{
    loop: true
  });
  var room1ambient    = new buzz.group(room1rain);
  // story
  var room1story1     = new buzz.sound(arrAudio.room1[0]);
  var room1story2     = new buzz.sound(arrAudio.room1[1]);
  var room1story3     = new buzz.sound(arrAudio.room1[2]);
  var room1story4     = new buzz.sound(arrAudio.room1[3]);

  // room 2
  var room2rain       = new buzz.sound(arrAudio.ambience[1],{
    loop: true
  });
  var room2rats       = new buzz.sound(arrAudio.ambience[2],{
    loop: true
  });
  var room2wind       = new buzz.sound(arrAudio.ambience[3],{
    loop: true
  });
  var room2ambient    = new buzz.group(room2rain);
  // story
  var room2story1     = new buzz.sound(arrAudio.room2[0]);
  var room2story2     = new buzz.sound(arrAudio.room2[1]);
  var room2story3     = new buzz.sound(arrAudio.room2[2]);
  var room2story4     = new buzz.sound(arrAudio.room2[3]);
  var room2story5     = new buzz.sound(arrAudio.room2[4]);
  // puzzle
  var bell1           = new buzz.sound(arrAudio.puzzle[0]);
  var bell2           = new buzz.sound(arrAudio.puzzle[1]);
  var bell3           = new buzz.sound(arrAudio.puzzle[2]);
  var bells           = new buzz.group(bell1, bell2, bell3);

  // room 3
  var room3flies      = new buzz.sound(arrAudio.ambience[4],{
    loop: true
  });
  var room3ambient    = new buzz.group(room3flies);
  // story
  var room3story1     = new buzz.sound(arrAudio.room3[0]);

  // incidentals
  // I would imagine that putting the clicks and bumps and breaks from the rest of the game in here would make sense
  var lose            = new buzz.sound(arrAudio.lose[0]);

  intro.show();

  // $('h1').bind('click', function(){
  //   room2wind.play();
  // });

  // helper functions
  function randomizr(limit){
    var randNum = 0;
    randNum = Math.floor(Math.random(1) * limit);
    return randNum;
  }

  // set text nodes
  // set the story tree
  // var storyTree = [];

  // puzzles
  // room 1
  var room1choice1 = $('#room1choice1');
  var room1choice2 = $('#room1choice2');
  // room 2
  var room2choice1 = $('#room2choice1');
  var room2choice2 = $('#room2choice2');
  var room2choice3 = $('#room2choice3');
  var room2choice4 = $('#room2choice4');
  // room 3
  var room3choice1 = $('#room3choice1');
  var room3choice2 = $('#room3choice2');
  var room3choice3 = $('#room3choice3');
  // room 4
  var room4choice1 = $('#room4choice1');

  // clickables

  // gameOver scenario
  function endGame(){
    gameStage.fadeOut(1000);
    gameOver.fadeIn(1000);
    // can't die in room 1
    if (room2 === true) {
      console.log('is room 2');
      room2ambient.fadeOut(1000);
    }
    if (room3 === true ) {
      console.log('is room 3');
      room3ambient.fadeOut(1000);
    }
    if (room4 === true) {
      console.log('is room 4');
      room4ambient.fadeOut(1000);
    }
    lose.load();
    lose.play();
  }

  // start
  start.bind('click', function(){
    // load bits
    drone.load();
    room1story1.load();
    // fade in and out
    drone.setVolume(0);
    drone.fadeTo(75, 4000, function(){
      room1story1.play();
    });
    room1ambient.fadeIn(4000);
    // do the animation
    intro.fadeOut(2000, function(){
      setTimeout(function(){
        room1choice1.fadeIn(2000);
      }, 87500);
    });
    return false;
  });

  // room 1
  // onboarding
  room1choice1.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room1choice1.find('ul').fadeOut(1000);
    });
    setTimeout(function(){
      room1choice1.find('.hidden').fadeIn(1000);
      setTimeout(function(){
        room1choice1.find('.hidden').fadeOut(1000);
        setTimeout(function(){
          room1story2.load();
          room1story2.play();
        }, 1000);
      }, 3000);
      setTimeout(function(){
        room1choice2.fadeIn(1000);
      }, 14000);
    }, 3000);
    return false;
  });

  // first actual choice
  // stand up (then get on floor) or get on floor
  console.log();
  room1choice2.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room1choice2.find('ul').fadeOut(1000);
    });
    if (this.text === room1choice2.find('a')[0].text) {
      room1story3.load();
      room1story3.play();
      setTimeout(function(){
        room1story4.load();
        room1story4.play();
        setTimeout(function(){
          // move to room 2
          room1 = false;
          room2 = false;
          room1ambient.fadeOut(4000);
          room2ambient.load();
          room2ambient.fadeIn(4000);
          room2choice1.fadeIn(1000);
        }, 33000);
      }, 34500);
    } else {
      room1story4.load();
      room1story4.play();
      setTimeout(function(){
        // move to room 2
        room1ambient.fadeOut(4000);
        room2ambient.load();
        room2ambient.fadeIn(4000);
        room2choice1.fadeIn(1000);
        room2story1.load();
        room2story1.play();
      }, 33000);
    }
    return false;
  });

  // search left (fireplace) or right (find door)
  room2choice1.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room2choice1.find('ul').fadeOut(1000);
    });
    if (this.text === room2choice1.find('a')[0].text){
      room2story2.load();
      room2story2.play();
      setTimeout(function(){
        room2choice2.fadeIn(1000);
      }, 37000);
    } else {
      // find door and rats
      room2story3.load();
      room2story3.play();
      setTimeout(function(){
        room2rats.load();
        room2rats.setVolume(0);
        room2rats.fadeTo(10, 1000);
      }, 27000);
      setTimeout(function(){
        room2choice3.fadeIn(1000);
      }, 51000);
    }
  });

  // search fireplace (and die) or leave well alone
  room2choice2.find('a').bind('click', function(){
    room2choice2.find('ul').fadeOut(1000);
    if (this.text === room2choice2.find('a')[0].text){
      endGame();
    } else {
      // find door and rats
      room2story3.load();
      room2story3.play();
      setTimeout(function(){
        room2rats.load();
        room2rats.setVolume(0);
        room2rats.fadeTo(10, 1000);
      }, 27000);
      setTimeout(function(){
        room2choice3.fadeIn(1000);
      }, 51000);
    }
  });

  // continue along the wall or feel around the door again
  room2choice3.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room2choice3.find('ul').fadeOut(1000);
    });
    if (this.text === room2choice3.find('a')[0].text){
      // discover living room
      room2story4.load();
      room2story4.play();
      setTimeout(function(){
        // go back to the door
        room2story5.load();
        room2story5.play();
        setTimeout(function(){
          room2choice4.fadeIn(1000);
        }, 21000);
      }, 30000);
    } else {
      // go back to the door
      room2story5.load();
      room2story5.play();
      setTimeout(function(){
        room2choice4.fadeIn(1000);
      }, 21000);
    }
  });

  var diceOfDeath = randomizr(6);
  // console.log(room2choice4.find('a')[diceOfDeath].text);
  bells.load();
  room2choice4.find('a').bind('click', function(){
    if (puzzTry < 3) {
      if (this.text === room2choice4.find('a')[diceOfDeath].text) {
        // success!
        $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
          setTimeout(function(){
            room2choice4.find('ul').fadeOut(1000);
          }, 4000);
        });
        // move to room 3
        room2 = false;
        room3 = true;
        setTimeout(function(){
          room3story1.load();
          room3story1.play();
          room2ambient.fadeOut(1000);
          room2rats.fadeOut(1000);
          room3ambient.load();
          setTimeout(function(){
            room3ambient.setVolume(0);
            room3ambient.fadeIn(1000);
          }, 17000);
          setTimeout(function(){
            room3choice1.fadeIn(47000);
          });
        }, 5000);
      } else {
        $(this).animate({
          opacity: 0
        }, 1000);
        puzzTry = puzzTry + 1;
      }
      // play bells
      // 123
      if (this.text === room2choice4.find('a')[0].text) {
        bell1.play();
        setTimeout(function(){
          bell2.play();
          setTimeout(function(){
            bell3.play();
          }, 2000);
        }, 2000);
      }
      // 132
      if (this.text === room2choice4.find('a')[1].text) {
        bell1.play();
        setTimeout(function(){
          bell3.play();
          setTimeout(function(){
            bell2.play();
          }, 2000);
        }, 2000);
      }
      // 213
      if (this.text === room2choice4.find('a')[2].text) {
        bell2.play();
        setTimeout(function(){
          bell1.play();
          setTimeout(function(){
            bell3.play();
          }, 2000);
        }, 2000);
      }
      // 231
      if (this.text === room2choice4.find('a')[3].text) {
        bell2.play();
        setTimeout(function(){
          bell3.play();
          setTimeout(function(){
            bell1.play();
          }, 2000);
        }, 2000);
      }
      // 312
      if (this.text === room2choice4.find('a')[4].text) {
        bell3.play();
        setTimeout(function(){
          bell1.play();
          setTimeout(function(){
            bell2.play();
          }, 2000);
        }, 2000);
      }
      // 321
      if (this.text === room2choice4.find('a')[5].text) {
        bell3.play();
        setTimeout(function(){
          bell2.play();
          setTimeout(function(){
            bell1.play();
          }, 2000);
        }, 2000);
      }
    } else {
      // get eaten
      endGame();
      console.log('failure');
    }
    return false;
  });

  // room 3
  room3choice1.find('a').each(function(){
    console.log(this.text);
  });
  room3choice1.find('a').bind('click', function(){
    return false;
  });

  gameOver.css('line-height', $(window).height() + 'px').height($(window).height() + 'px');

};