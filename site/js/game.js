window.onload = function(){

  // objects
  var gameStage = $('#game');
  var intro     = $('#intro');
  var start     = $('#start');
  var gameOver  = $('#gameOver');

  // check browser
  var oldIE;
  if ($('html').is('.ie6, .ie7, .ie8')) {
      oldIE = true;
  }

  if (oldIE) {
    // if you need to do something for old ie
    gameStage.children().remove();
    gameStage.append('<p>You won\'t be able to play this audio game without upgrading to IE9 or above or a more modern browser.</p>');
  }

  // get outbound links
  $('#about').find('a').each(function(){
    $(this).bind('click', function(){
      window.open($(this).attr('href'));
      return false;
    });
  });
  $('.open').bind('click', function(){
    $('#about').fadeIn(1000);
  });
  $('.close').bind('click', function(){
    $('#about').fadeOut(1000);
  });

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
  buzz.defaults.preload = 'metadata';
  buzz.defaults.formats = ['ogg', 'mp3', 'wav'];
  // let's try the audio in arrays
  var arrAudio = {
    drone      : ["audio/under_drone"],
    lose       : ["audio/lose"],
    ambience   : ["audio/room1_ambience",
                  "audio/room2_rain_loop",
                  "audio/room2_rats",
                  "audio/room2_wind",
                  "audio/room3_flies_loop"],
    puzzle     : ["audio/room2_bell1",
                  "audio/room2_bell2",
                  "audio/room2_bell3",
                  "audio/room2_bellfail"],
    room1      : ["audio/room1_1",
                  "audio/room1_2",
                  "audio/room1_3",
                  "audio/room1_4"],
    room2      : ["audio/room2_1",
                  "audio/room2_2",
                  "audio/room2_3",
                  "audio/room2_4",
                  "audio/room2_5"],
    room3      : ["audio/room3_1"]
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
  var bellFail        = new buzz.sound(arrAudio.puzzle[3]);
  var bells           = new buzz.group(bell1, bell2, bell3, bellFail);

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

  // helper functions
  function randomizr(limit){
    var randNum = 0;
    randNum = Math.floor(Math.random(1) * limit);
    return randNum;
  }

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

  // clickables

  // start
  start.bind('click', function(){
    // load bits
    drone.load();
    room1story1.load();
    room1story1.bind('canplaythrough', function(){
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
      room1story2.load();
      room1story2.bind('canplaythrough', function(){
        setTimeout(function(){
          room1choice1.find('p').fadeOut(1000);
          setTimeout(function(){
            room1story2.play();
          }, 1000);
        }, 3000);
      });
      setTimeout(function(){
        room1choice2.fadeIn(1000);
      }, 14000);
    }, 3000);
    return false;
  });

  // first actual choice
  // stand up (then get on floor) or get on floor
  room1choice2.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room1choice2.find('ul').fadeOut(1000);
    });
    if (this.innerHTML === room1choice2.find('a')[0].innerHTML) {
      room1story3.load();
      room1story3.bind('canplaythrough', function(){
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
      });
    } else {
      room1story4.load();
      room1story4.bind('canplaythrough', function(){
        room1story4.play();
        setTimeout(function(){
          // move to room 2
          room1ambient.fadeOut(4000);
          room2ambient.load();
          room2ambient.fadeIn(4000);
          room2choice1.fadeIn(1000);
          room2story1.load();
          room2story1.bind('canplaythrough', function(){
            room2story1.play();
          });
        }, 33000);
      });
    }
    return false;
  });

  // search left (fireplace) or right (find door)
  room2choice1.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room2choice1.find('ul').fadeOut(1000);
    });
    if (this.innerHTML === room2choice1.find('a')[0].innerHTML){
      room2story2.load();
      room2story2.bind('canplaythrough', function(){
        room2story2.play();
        setTimeout(function(){
          room2choice2.fadeIn(1000);
        }, 37000);
      });
    } else {
      // find door and rats
      room2story3.load();
      room2story3.bind('canplaythrough', function(){
        room2story3.play();
        setTimeout(function(){
          room2rats.load();
          room2rats.setVolume(0);
          room2rats.fadeTo(10, 1000);
        }, 27000);
        setTimeout(function(){
          room2choice3.fadeIn(1000);
        }, 51000);
      });
    }
    return false;
  });

  // search fireplace (and die) or leave well alone
  room2choice2.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room2choice2.find('ul').fadeOut(1000);
    });
    if (this.innerHTML === room2choice2.find('a')[0].innerHTML){
      endGame();
    } else {
      // find door and rats
      room2story3.load();
      room2story3.bind('canplaythrough', function(){
        room2story3.play();
        setTimeout(function(){
          room2rats.load();
          room2rats.setVolume(0);
          room2rats.fadeTo(10, 1000);
        }, 27000);
        setTimeout(function(){
          room2choice3.fadeIn(1000);
        }, 51000);
      });
    }
    return false;
  });

  // continue along the wall or feel around the door again
  room2choice3.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room2choice3.find('ul').fadeOut(1000);
    });
    if (this.innerHTML === room2choice3.find('a')[0].innerHTML){
      // discover living room
      room2story4.load();
      room2story4.bind('canplaythrough', function(){
        room2story4.play();
        setTimeout(function(){
          // go back to the door
          room2story5.load();
          room2story5.bind('canplaythrough', function(){
            room2story5.play();
            setTimeout(function(){
              room2choice4.fadeIn(1000);
            }, 21000);
          });
        }, 30000);
      });
    } else {
      // go back to the door
      room2story5.load();
      room2story5.bind('canplaythrough', function(){
        room2story5.play();
        setTimeout(function(){
          room2choice4.fadeIn(1000);
        }, 21000);
      });
    }
    return false;
  });

  // console.log(room2choice4.find('a')[diceOfDeath].text);
  bells.load();
  var arrBellSequence = ['123','132','213','231','312','321'];
  var bellSequence = arrBellSequence[randomizr(arrBellSequence.length)];
  var bellAttempt = 0;
  var diceOfDeath = randomizr(arrBellSequence.length);
  // console.log(bellSequence);
  room2choice4.find('a').bind('click', function(){
    if (bellAttempt === bellSequence) {
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
        room3story1.bind('canplaythrough', function(){
          room3story1.play();
          room2ambient.fadeTo(0, 1000, function(){
            room2ambient.stop();
          });
          room2rats.fadeTo(0, 1000, function(){
            room2rats.stop();
          });
          room3ambient.load();
          setTimeout(function(){
            room3ambient.setVolume(0);
            room3ambient.fadeIn(1000);
          }, 17000);
          setTimeout(function(){
            room3choice1.fadeIn(47000);
          });
        });
      }, 5000);
    } else {
      $(this).css({
        backgroundColor: '#222'
      });
      // play single notes
      // 1
      var playDelay = 1000;
      var testBells = setInterval(function(){
        if (bellAttempt.length > 2) {
          if (bellAttempt === bellSequence) {
            // play bells
            setTimeout(function(){
            // 123
              if (bellSequence === arrBellSequence[0]) {
                bell1.play();
                setTimeout(function(){
                  bell2.play();
                  setTimeout(function(){
                    bell3.play();
                  }, playDelay);
                }, playDelay);
              }
              // 132
              if (bellSequence === arrBellSequence[1]) {
                bell1.play();
                setTimeout(function(){
                  bell3.play();
                  setTimeout(function(){
                    bell2.play();
                  }, playDelay);
                }, playDelay);
              }
              // 213
              if (bellSequence === arrBellSequence[2]) {
                bell2.play();
                setTimeout(function(){
                  bell1.play();
                  setTimeout(function(){
                    bell3.play();
                  }, playDelay);
                }, playDelay);
              }
              // 231
              if (bellSequence === arrBellSequence[3]) {
                bell2.play();
                setTimeout(function(){
                  bell3.play();
                  setTimeout(function(){
                    bell1.play();
                  }, playDelay);
                }, playDelay);
              }
              // 312
              if (bellSequence === arrBellSequence[4]) {
                bell3.play();
                setTimeout(function(){
                  bell1.play();
                  setTimeout(function(){
                    bell2.play();
                  }, playDelay);
                }, playDelay);
              }
              // 321
              if (bellSequence === arrBellSequence[5]) {
                bell3.play();
                setTimeout(function(){
                  bell2.play();
                  setTimeout(function(){
                    bell1.play();
                  }, playDelay);
                }, playDelay);
              }
            room2choice4.fadeOut(1000, function(){
              setTimeout(function(){
                room3story1.load();
                room3story1.bind('canplaythrough', function(){
                  room3story1.play();
                  setTimeout(function(){
                    room3ambient.load();
                    room3ambient.setVolume(0);
                    room3ambient.fadeIn(1000);
                  }, 17000);
                });
              }, 1500);
              setTimeout(function(){
                room3choice1.fadeIn(1000);
              }, 47000);
            });
            }, 1000);
          } else {
            setTimeout(function(){
              room2choice4.find('a').attr('style', null).attr('data-played', null);
              bellAttempt = 0;
              bellFail.play();
            }, 1000);
          }
        }
        clearInterval(testBells);
      }, 500);
      if (this.innerHTML === room2choice4.find('a')[0].innerHTML) {
        if ($(this).attr('data-played') === undefined) {
          bell1.play();
          $(this).attr('data-played', true);
          bellAttempt = bellAttempt + $(this).attr('data-pos');
          bellAttempt = bellAttempt.replace('0','');
        }
      }
      // 2
      if (this.innerHTML === room2choice4.find('a')[1].innerHTML) {
        if ($(this).attr('data-played') === undefined) {
          bell2.play();
          $(this).attr('data-played', true);
          bellAttempt = bellAttempt + $(this).attr('data-pos');
          bellAttempt = bellAttempt.replace('0','');
        }
      }
      // 3
      if (this.innerHTML === room2choice4.find('a')[2].innerHTML) {
        if ($(this).attr('data-played') === undefined) {
          bell3.play();
          $(this).attr('data-played', true);
          bellAttempt = bellAttempt + $(this).attr('data-pos');
          bellAttempt = bellAttempt.replace('0','');
        }
      }
      if (bellAttempt.length === undefined) {
        console.log(0);
      }
    }
    return false;
  });

  // room 3
  // the table
  room3choice1.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room3choice1.find('ul').fadeOut(1000);
    });
    if (this.innerHTML === room3choice1.find('a')[0].innerHTML){
      setTimeout(function(){
        room3choice2.fadeIn(1000);
      }, 1000);
    } else {
      setTimeout(function(){
        room3choice3.fadeIn(1000);
      }, 1000);
    }
    room3choice1.fadeOut(1000);
    return false;
  });

  // take a nap?
  room3choice2.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room3choice2.find('ul').fadeOut(1000);
    });
    if (this.innerHTML === room3choice1.find('a')[0].innerHTML){
      console.log('dead');
    } else {
      setTimeout(function(){
        room3choice3.fadeIn(1000);
      }, 1000);
    }
    room3choice2.fadeOut(1000);
    return false;
  });

  // take a sword
  room3choice3.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room3choice3.find('ul').fadeOut(1000);
    });
    if (this.innerHTML === room3choice3.find('a')[0].innerHTML){
      console.log('sword taken');
      sword = true;
    }
    room3choice3.fadeOut(1000);
    return false;
  });

  gameOver.css('line-height', $(window).height() + 'px').height($(window).height() + 'px');

};