$(document).ready(function(){

    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
  
  })
  
  // images: url("https://media0.giphy.com/media/xT9DPMuhWi7YN5QY48/giphy.gif?cid=790b76115ac8f3a09d9d5e121e3c0bfc07382b386b45a186&rid=giphy.gif"),
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId : '',
    images:'',
    // questions options and answers data
    questions: {
      q1: 'How many chambers does the heart have?',
      q2: 'Which chamber of the heart pumps blood to the lungs?',
      q3: 'What is the Central Nervous System made up of?',
      q4: 'what kind of cells are found in the brain?',
      q5: "what is the fluid outside of a cell called?",
      q6: 'What is the largest organ in the body?',
      q7: "Which of these is not part of the eye?",
      q8: 'How many bones does an adult human skeleton has?',
      q9: 'Who is the father of modern anatomy and Physiology?'
    },
    options: {
      q1: ['10', '4', '3', '8'],
      q2: ['right ventricle', 'right artrium', 'left ventricle', 'left artrium'],
      q3: ['brain and nuerons', 'the heart and lungs', 'brain and spinal cord', 'kidney and liver'],
      q4: ['electrons', 'protons', 'neurons', 'myocytes'],
      q5: ['extracellular fluid','cushion fluid','easy fluid','essential fluid'],
      q6: ['liver','heart','lungs','skin'],
      q7: ['cornea', 'iris', 'macula','none of the above'],
      q8: ['206','270','300','210'],
      q9: ['Andreas Vesalius', 'Poccahontas', 'Herophilus','Hippocrates'],
    },
  
    answers: {
      q1: '4',
      q2: 'right ventricle',
      q3: 'brain and spinal cord',
      q4: 'neurons',
      q5: 'extracellular fluid',
      q6: 'skin',
      q7: 'none of the above',
      q8: '206',
      q9: 'Andreas Vesalius',
    },
  
     images: {
      q1: 'https://media0.giphy.com/media/xT9DPMuhWi7YN5QY48/giphy.gif?cid=790b76115ac8f3a09d9d5e121e3c0bfc07382b386b45a186&rid=giphy.gif',
      q2: 'right ventricle',
      q3: 'brain and spinal cord',
      q4: 'neurons',
      q5: 'extracellular fluid',
      q6: 'skin',
      q7: 'none of the above',
      q8: '206',
      q9: 'Andreas Vesalius',
    },
  
    // method to start game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
  
      // show game section
      $('#game').show();
  
      //  empty last results
      $('#results').html('');
  
      // show timer
      $('#timer').text(trivia.timer);
  
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
  
      // ask first question
      trivia.nextQuestion();
  
    },
  
  
    // method to loop through and display questions and options
    nextQuestion : function(){
  
      // set timer to 30 seconds each question
      trivia.timer = 30;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
  
      // to prevent timer speed up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
  
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
  
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
  
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
  
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, run result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 3000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
        // create an image tag
        $("#results_img").attr('src', Object.values(trivia.images)[trivia.currentSet]);
        // to turn turn out $('#results_img').attr('src', "")
  
      }
  
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
  
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
  
        // hide game sction
        $('#game').hide();
  
        // show start button to begin a new game
        $('#start').show();
      }
  
    },
    // method to evaluate the option clicked
    guessChecker : function() {
  
      // timer ID for gameResult setTimeout
      var resultId;
  
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      var imageSrc = Object.values(trivia.images)[trivia.currentSet];
  
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
  
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      $("#results_img").attr('src', Object.values(trivia.images)[trivia.currentSet]);
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
  
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>try again next time! '+ images + currentAnswer +'</h3>');
        $("#results_img").attr('src', Object.values(trivia.images)[trivia.currentSet]);
      }
  
    },
    // method to remove previous question results and options
    guessResult : function(){
  
      // increment to next question set
      trivia.currentSet++;
  
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
  
      // begin next question
      trivia.nextQuestion();
  
    }
  
  }
  