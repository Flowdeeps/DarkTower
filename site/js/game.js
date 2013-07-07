window.onload = function(){

  // objects
  var gameStage = $('#game');
  var winnar    = $('#win');
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
  var room1 = true;
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
                  "audio/room3_flies_loop",
                  "audio/room3_flies_at_table",
                  "audio/room3_sword",
                  "audio/room4_atmosphere_rain",
                  "audio/room4_outsiderain",
                  "audio/room4_beast"],
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
    room3      : ["audio/room3_1",
                  "audio/room3_2",
                  "audio/room3_3",
                  "audio/room3_4"],
    room4      : ["audio/room4_1",
                  "audio/room4_2",
                  "audio/room4_3",
                  "audio/room4_4",
                  "audio/room4_5"]
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
  // ambience
  var room3flies      = new buzz.sound(arrAudio.ambience[4],{
    loop: true
  });
  var room3tableFlies = new buzz.sound(arrAudio.ambience[5],{
    loop: true
  });
  var room3sword      = new buzz.sound(arrAudio.ambience[6]);
  // story
  var room3story1     = new buzz.sound(arrAudio.room3[0]);
  var room3story2     = new buzz.sound(arrAudio.room3[1]);
  var room3story3     = new buzz.sound(arrAudio.room3[2]);
  var room3story4     = new buzz.sound(arrAudio.room3[3]);

  // room 4
  // ambience
  var room4rain       = new buzz.sound(arrAudio.ambience[7], {
    loop: true
  });
  var room4rainOutide = new buzz.sound(arrAudio.ambience[8], {
    loop: true
  });
  var room4beast      = new buzz.sound(arrAudio.ambience[9], {
    loop: true
  });
  // story
  var room4story1     = new buzz.sound(arrAudio.room4[0]);
  var room4story2     = new buzz.sound(arrAudio.room4[1]);
  var room4story3     = new buzz.sound(arrAudio.room4[2]);
  var room4story4     = new buzz.sound(arrAudio.room4[3]);
  var room4story5     = new buzz.sound(arrAudio.room4[4]);

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
      room3flies.fadeOut(1000);
      room3tableFlies.fadeOut(1000);
    }
    if (room4 === true) {
      console.log('is room 4');
      room4ambient.fadeOut(1000);
    }
    lose.load();
    lose.play();
  }

  function win(){
    gameStage.fadeOut(1000);
    winnar.fadeIn(1000);
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
      drone.fadeTo(50, 4000, function(){
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
      room1choice1.find('.question').fadeOut(1000);
    });
    setTimeout(function(){
      room1choice1.find('.hidden').fadeIn(1000);
      room1story2.load();
      room1story2.bind('canplaythrough', function(){
        setTimeout(function(){
          room1choice1.find('.hidden').fadeOut(1000);
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
          room1story4.bind('canplaythrough', function(){
            room1story4.play();
            setTimeout(function(){
              // move to room 2
              room1ambient.fadeOut(4000);
              room2ambient.load();
              room2ambient.fadeIn(4000);
              setTimeout(function(){
                room2choice1.fadeIn(1000);
              }, 39000);
              room2story1.load();
              room2story1.bind('canplaythrough', function(){
                room2story1.play();
              });
            }, 33000);
          });
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
          setTimeout(function(){
            room2choice1.fadeIn(1000);
          }, 39000);
          room2story1.load();
          room2story1.bind('canplaythrough', function(){
            room2story1.play();
          });
        }, 33000);
      });
    }
    room1 = false;
    room2 = true;
    return false;
  });

  // search left (fireplace) or right (find door)
  room2choice1.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room2choice1.find('ul').fadeOut(1000);
      room2choice1.find('p').fadeOut(1000);
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
        room2rats.load();
        setTimeout(function(){
          room2rats.setVolume(0);
          room2rats.fadeTo(10, 6000);
        }, 22000);
        setTimeout(function(){
          room2choice3.fadeIn(1000);
        }, 51000);
      });
    }
    return false;
  });

  // search left:
  // search fireplace (and die) or leave well alone
  room2choice2.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room2choice2.find('ul').fadeOut(1000);
    });
    if (this.innerHTML === room2choice2.find('a')[0].innerHTML){
      endGame();
    } else {
      // find door and rats
      room2rats.load();
      room2story3.load();
      room2story3.bind('canplaythrough', function(){
        room2story3.play();
        setTimeout(function(){
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

  // search right
  // continue along the wall or feel around the door again
  room2choice3.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room2choice3.find('ul').fadeOut(1000);
      room2choice3.find('p').fadeOut(1000);
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
              // load room 3
              setTimeout(function(){
                room2 = false;
                room3 = true;
                room3story1.load();
                room2rats.fadeTo(0, 1000, function(){
                  room2rats.stop();
                });
                room3story1.bind('canplaythrough', function(){
                  room3story1.play();
                  room3flies.load();
                  setTimeout(function(){
                    room3flies.setVolume(0);
                    room3flies.fadeTo(50, 1000);
                  }, 16500);
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
      room3choice1.find('p').fadeOut(1000);
    });
    if (this.innerHTML === room3choice1.find('a')[0].innerHTML){
      room3story2.load();
      room3story2.bind('canplaythrough', function(){
        room3story2.play();
        room3tableFlies.load();
        setTimeout(function(){
          room3tableFlies.setVolume(0);
          room3tableFlies.fadeTo(75, 1000);
        }, 34000);
        setTimeout(function(){
          room3choice2.fadeIn(1000);
        }, 47000);
      });
    } else {
      room3story3.load();
      room3story3.bind('canplaythrough', function(){
        room3story3.play();
        setTimeout(function(){
          room3choice3.fadeIn(1000);
        }, 28000);
      });
    }
    room3choice1.fadeOut(1000);
    return false;
  });

  // take a nap?
  room3choice2.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room3choice2.find('ul').fadeOut(1000);
    });
    // sleep eternally!
    if (this.innerHTML === room3choice2.find('a')[0].innerHTML){
      console.log(this.innerHTML);
      room3story4.load();
      room3story4.bind('canplaythrough', function(){
        room3story4.play();
        setTimeout(function(){
          room3tableFlies.fadeTo(0, 1000, function(){
            room3tableFlies.stop();
          });
          endGame();
        }, 7500);
      });
    // escape!
    } else {
      setTimeout(function(){
        room3tableFlies.fadeTo(0, 1000, function(){
          room3tableFlies.stop();
        });
      }, 5000);
      room3story3.load();
      room3story3.bind('canplaythrough', function(){
        room3story3.play();
        setTimeout(function(){
          room3choice3.fadeIn(1000);
        }, 28000);
      });
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
      sword = true;
      room3sword.setVolume(50);
      room3sword.play();
    }
    room3choice3.fadeOut(1000);
    room4story1.load();
    room4story1.bind('canplaythrough', function(){
      room4story1.play();
      room4story2.load();
      setTimeout(function(){
        if (sword === true){
          room4story2.load();
          room4story2.bind('canplaythrough', function(){
            room4rain.fadeTo(100, 1000);
            room4story2.play();
            setTimeout(function(){
              endGame();
            }, 14000);
          });
        } else {
          room4story3.load();
          room4story3.bind('canplaythrough', function(){
            room4story3.play();
            setTimeout(function(){
              room4beast.setVolume(0);
              room4beast.fadeTo(25, 5000);
            }, 43000);
            setTimeout(function(){
              room4choice1.fadeIn(1000);
            }, 64000);
          });
        }
        setTimeout(function(){
          room3flies.fadeTo(0, 1000);
        }, 17000);
        room4rain.setVolume(0);
        room4rain.fadeTo(50, 4000);
      }, 22500);
    });
    return false;
  });

  // still alive? great! now choose an action
  room4choice1.find('a').bind('click', function(){
    $(this).parent().siblings().animate({'opacity': '0'}, 1000, function(){
      room4choice1.find('ul').fadeOut(1000);
    });
    // you am dead
    if (this.innerHTML === room4choice1.find('a')[0].innerHTML){
      room4story4.load();
      room4story4.bind('canplaythrough', function(){
        room4story4.play();
        setTimeout(function(){
          room4beast.fadeTo(0, 1000);
        }, 12000);
        setTimeout(function(){
          endGame();
        }, 13000);
      });
    // you amn't dead
    } else {
      room4story5.load();
      room4story5.bind('canplaythrough', function(){
        room4story5.play();
        setTimeout(function(){
          room4beast.fadeTo(0, 2000, function(){
            room4beast.stop();
          });
        }, 17600);
        setTimeout(function(){
          room4rain.fadeTo(0, 1000);
          room4rainOutide.fadeTo(100, 1000);
        }, 22000);
        setTimeout(function(){
          room4story5.fadeTo(0, 2000);
          win();
        }, 33000);
      });
    }
    return false;
  });

  gameOver.css('line-height', $(window).height() + 'px').height($(window).height() + 'px');

};