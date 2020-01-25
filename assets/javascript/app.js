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
      q9: 'Who is the father of modern anatomy and Physiology?',
      q10: 'where does food digestion begins from?',
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
      q10: ['stomach', 'mouth', 'small intestine', 'lungs'],
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
      q10: 'mouth',
    },
  
    images: {
       q1: 'https://media2.giphy.com/media/cEDZpEumzeJ3i/giphy.gif?cid=790b7611f03fded48c3a10efe18663c007e5462a4981e9c1&rid=giphy.gif',
       q2: 'https://media1.giphy.com/media/oSH9ZZ9vWNByU/giphy.gif?cid=790b7611f03fded48c3a10efe18663c007e5462a4981e9c1&rid=giphy.gif',
       q3: 'https://media2.giphy.com/media/38tjCITcNUmWc/giphy.gif?cid=790b76110276864ece1453c800a8410fca16f2637c96caf1&rid=giphy.gif',
       q4: 'https://media0.giphy.com/media/ojmB7lOn3VUU8/giphy.gif?cid=790b7611f602f94c5041302ff0a55987ca1755d00f7bd7d1&rid=giphy.gif',
       q5: 'https://media0.giphy.com/media/3o85xATk5jD26iO0Ss/giphy.gif?cid=790b76119ad63c5d953786ab70722a61566333e2d8b6e9d1&rid=giphy.gif',
       q6: 'https://media0.giphy.com/media/l3Ucsc7Zk4upFzWGk/giphy.gif?cid=790b76115c59ed74959c9f48f12eccb53262fa763ca877a6&rid=giphy.gif',
       q7: 'https://images.emedicinehealth.com/images/slideshow/eye_diseases_and_cond_s2_illustartion_anatomy_of_eye.jpg',
       q8: 'https://media3.giphy.com/media/3ohhwvOnBaE8TtyBaw/giphy.gif?cid=790b76110b1fa3afdddb880ad98b71a578ddfbeddf60b3ab&rid=giphy.gif',
       q9: 'https://images.theconversation.com/files/68085/original/image-20141229-8211-kqouyx.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=237&fit=clip',
       q10:'https://media1.giphy.com/media/HoAR9LkExGGJO/giphy.gif?cid=790b76110b940953f63fb4cc34b203a2b55548698be62d62&rid=giphy.gif',
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

      var img = Object.values(trivia.images)[trivia.currentSet];
  
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
          .html('<h3>Thank you!</h3>'+
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
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>Correct Answer!</h3>');
      $("#results_img").attr('src', Object.values(trivia.images)[trivia.currentSet]);
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
  
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>nope, the answer is '+ currentAnswer +'</h3>');
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
      $('#results_img').empty()
  
      // begin next question
      trivia.nextQuestion();
  
    }
  
  }
  