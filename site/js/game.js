window.onload = function(){

  // objects
  var intro = $('#intro');
    var start = $('#start');
  var room1 = $('#room1');
  var room2 = $('#room2');
  var room3 = $('#room3');
  var room4 = $('#room4');

  // room vars
  var inRoom1 = false;
  var inRoom2 = false;
  var inRoom3 = false;
  var inRoom4 = false;

  // set vars
  var sit = false;
  var sleep = false;
  var sword = false;

  // audio gubbins
  // tower drone
  var drone           = new buzz.sound("audio/under_drone.wav",{
    loop: true
  });
  // room 1
  var room1rain       = new buzz.sound("audio/room1_ambience.wav",{
    loop: true
  });
  var room1ambient    = new buzz.group(room1rain);
  // story
  var room1story1     = new buzz.sound("audio/room1_1.wav");
  var room1story2     = new buzz.sound("audio/room1_2.wav");
  var room1story3     = new buzz.sound("audio/room1_3.wav");
  var room1story4     = new buzz.sound("audio/room1_4.wav");

  // room 2
  var room2rain       = new buzz.sound("audio/room2_rain_loop.wav",{
    loop: true
  });
  var room2rats       = new buzz.sound("audio/room2_rats.wav");
  var room2wind       = new buzz.sound("audio/room2_wind.wav");
  var room2ambient    = new buzz.group(room2rain);
  // story
  var room2story1     = new buzz.sound("audio/room2_1.wav");
  var room2story2     = new buzz.sound("audio/room2_2.wav");
  var room2story3     = new buzz.sound("audio/room2_3.wav");
  var room2story4     = new buzz.sound("audio/room2_4.wav");
  var room2story5     = new buzz.sound("audio/room2_5.wav");

  // room 3
  var room3flies      = new buzz.sound("audio/room3_flies_loop.wav");
  var room3ambient    = new buzz.group(room3flies);

  // incidentals
  // I would imagine that putting the clicks and bumps and breaks from the rest of the game in here would make sense
  var lose            = new buzz.sound("audio/lose.wav");

  intro.show();

  // $('h1').bind('click', function(){
  //   room2wind.play();
  // });

  start.bind('click', function(){
    // do the audio
    // load bits
    drone.load();
    room1story1.load();
    // set firt state to true
    inRoom1 =  true;
    // fade in and out
    drone.fadeTo(50, 4000, function(){
      room1story1.play();
      showRoom1Choice1();
    });
    room1ambient.fadeIn(4000);
    // do the animation
    intro.fadeOut(2000, function(){
      room1.fadeIn(2000);
    });
    return false;
  });

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
  var room1choice1 = $('#room1choice1');
  function showRoom1Choice1(){
    var i = 0;
    var arrLinks = [];
    room1choice1.find('a').each(function(){
      arrLinks[i] = $(this).text();
      i = i + 1;
    });
    var linksLen = arrLinks.length;
    var diceOfDeath = randomizr(linksLen);
    console.log(arrLinks[diceOfDeath]);
    if (inRoom1 === true) {
      var showChoice = setTimeout(function(){
        room1choice1.fadeIn(1000);
      }, 85000);

      room1choice1.find('a').bind('click', function(){
        if ($(this).text() === arrLinks[diceOfDeath]){
          lose.play();
          drone.fadeOut(2000);
          room1ambient.fadeOut(2000);
          setTimeout(function(){
            intro.fadeIn();
          }, 1000);
        } else {
          room1choice1.find('hidden').fadeIn(1000);
          setTimeout(function(){
            room1story2.load();
            room1story2.play();
            showRoom1Choice2();
            room1choice1.fadeOut(1000);
          }, 1000);
        }
        return false;
      });
    }
  }
  var room1choice2 = $('#room1choice2');
  var room2choice1 = $('#room2choice1');
  function showRoom1Choice2(){
    i = 0;
    arrLinks = [];
    room1choice2.find('a').each(function(){
      arrLinks[i] = $(this).text();
      i = i + 1;
    });

    function doThis(){
      setTimeout(function(){
        room1.fadeOut(1000);
        room1ambient.fadeOut();
        room2ambient.load();
        room2ambient.fadeIn(1000);
        room2.fadeIn(1000);
        room2story1.load();
        room2story1.play();
        setTimeout(function(){
          showRoom2Choice1();
        }, 39000);
      }, 33000);
    }

    var showPuzzle = setTimeout(function(){
      room1choice2.fadeIn(1000);
    }, 14000);

    room1choice2.find('a').bind('click', function(){
      if ($(this).text() === arrLinks[0]){
        room1story3.load();
        room1story3.play();
        setTimeout(function(){
          room1story4.load();
          room1story4.play();
          doThis();
        }, 34000);
      } else {
        room1story4.load();
        room1story4.play();
        doThis();
      }
      room1choice2.fadeOut();
      return false;
    });
    
  function showRoom2Choice1(){
    room2choice1.fadeIn(1000);
    i = 0;
    room2choice1.find('a').each(function(){
      $(this).bind('click', function(){
        if (i === 0){
          room2story2.load();
          room2story2.play();
          room2Chimney();
        } else {
          room2story3.load();
          room2story3.play();
        }
        room2choice1.fadeOut(1000);
        return false;
      });
      i = i + 1;
    });

    function room2Chimney(){
      setTimeout(function(){
        room2choice2();
      }, 37000);
    }
  }

  var room2choice2 = $('#room2choice2');
  function showRoom2Choice2(){
    room2choice2.fadeIn(1000);
    i = 0;
    room2choice2.find('a').each(function(){
      $(this).bind('click', function(){
        if (i === 0){
          lose.play();
          drone.fadeOut(2000);
          room2ambient.fadeOut(2000);          
        } else {
          showRoom2Choice3();
        }
        room2choice1.fadeOut(1000);
        return false;
      });
      i = i + 1;
    });
  }

  var room2choice3 = $('#room2choice3');
  function showRoom2Choice3(){
    room2choice3.fadeIn(1000);
    i = 0;
    room2choice3.find('a').each(function(){
      $(this).bind('click', function(){
        if (i === 0){
          lose.play();
          drone.fadeOut(2000);
          room2ambient.fadeOut(2000);          
        } else {
          showRoom2Choice3();
        }
        room2choice1.fadeOut(1000);
        return false;
      });
      i = i + 1;
    });
  }


  }
}