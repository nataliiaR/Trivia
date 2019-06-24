
var dataFile = JSON.stringify(jSONObj);
var obj=JSON.parse(dataFile);
var selected=0;
var wins=0;
var losses=0;
const maxQuestions=10;
var questionCount=0;


createQuestionSection(getQuestion());

function getQuestion(){

  var j = Math.floor((Math.random() * obj.length));
  var currQuestion = obj[j];
  obj.splice(j,1);
  return currQuestion;

}

function createQuestionSection(question){
    var answers=question.answers;
    time = question.timeInSeconds;
    intervalId = setInterval( function() {
      count (question)},
      1000);
    $(".question").html('<h2>'+question.question+'</h2>');
    for(let i=0; i<answers.length; i++){
      $(".answers").append('<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 answerOption"><p class="answer">'+answers[i]+'</p></div>');
    }
    $(".answer").on("click", function(){
      if(selected===0){
          selectedOption=$(this);
          verifyTheAnswer(selectedOption, question.correct_answer);
          clearInterval(intervalId);
      }
    
    });
}

function count(question){
     if (time>0){

        time--;
        var converted = timeConverter(time);
        $("#display").text("TIME LEFT: " + converted);
        
     }  
     else{
        setTimeout(showCorrectAnswer(question.correct_answer), 2000);
        losses++;
        $("#losses").html("Losses: "+ losses);
        setTimeout(resetAll, 5000);
        clearInterval(intervalId);
 
     }
 
}

function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }


function verifyTheAnswer(selectedOption, correct_answer){

    if(selectedOption.text()==correct_answer){
        $(selectedOption).addClass("blink_me").css({"backgroundColor":"green"});
        selected= 1;
        wins++;
        $("#wins").html("Wins: " + wins);
        clearInterval(intervalId);
      
    }
    else{
        $(selectedOption).css({"backgroundColor":"red"});
        selected =1;
        setTimeout(showCorrectAnswer(correct_answer),2000);
        losses++;
        $("#losses").html("Losses: " +losses);
        clearInterval(intervalId);

      
    }

    setTimeout(resetAll, 5000);


}

function showCorrectAnswer(object_correct_answer){
    $(".answer:contains("+object_correct_answer+")").addClass("blink_me").css({"backgroundColor":"green"});

}

function resetAll(){
  
  selected=0;
  $(".answers").empty();
  $(".question").empty();
  $("#display").text("TIME LEFT ...");
  clearInterval(intervalId);
  questionCount++;
  if(questionCount<maxQuestions){
    var question =getQuestion();
    createQuestionSection(question);
  }
  else{
    $("#display").empty();
    if(wins===10){
      $(".question").text("FLAWLESS VICTORY!").css({"color":"green","font-family":"serif","font-weight":"bold","text-align":"center"});
  
    } else{
    $(".question").text("GAME IS OVER!").css({"color":"#6495AB","font-family":"serif","font-weight":"bold","text-align":"center"});
  }
  }

}


