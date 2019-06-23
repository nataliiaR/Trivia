
var dataFile = JSON.stringify(jSONObj);
var obj=JSON.parse(dataFile);
var selected=0;
var wins=0;
var losses=0;
const maxQuestions=10;

i=0;
var j;



function getQuestion(){

  console.log ("obj j "+obj[j]);

  console.log ("obj "+obj);
  console.log ("obj array length "+obj.length);
  var j = Math.floor((Math.random() * obj.length));
  var currQuestion = obj[j];
  console.log(j);
  obj.splice(j);
  console.log ("obj array length "+obj.length);
  return currQuestion;

}
el =getQuestion();


createQuestionSection(el);



function createQuestionSection(question){
    var answers=question.answers;
    time = question.timeInSeconds;
    intervalId = setInterval(count, 1000);
    $(".question").html('<h2>'+question.question+'</h2>');
    for(let i=0; i<answers.length; i++){
      $(".answers").append('<div class="col-12 answerOption">'+answers[i]+'</div>');
    }
    $(".answerOption").on("click", function(){
      console.log("selected "+ selected);
      if(selected===0){
          selectedOption=$(this);
          verifyTheAnswer(selectedOption, question.correct_answer);
          clearInterval(intervalId);
      }
    
    });
}

function count(){
     if (time>0){

        time--;
        var converted = timeConverter(time);
      
        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);
        
     }  
     else{
        showCorrectAnswer(el.correct_answer);
        losses++;
        $("#losses").html("Losses "+ losses);
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

    console.log ("selected option "+ selectedOption);
    console.log("correct_answer " + correct_answer);
    if(selectedOption.text()==correct_answer){
        $(selectedOption).css({"backgroundColor":"green"});
        selected= 1;
        wins++;
        $("#wins").html("Wins " + wins);
        clearInterval(intervalId);
        console.log("selected "+ selected);
      
    }
    else{
        $(selectedOption).css({"backgroundColor":"red"});
        selected =1;
        showCorrectAnswer(correct_answer);
        losses++;
        $("#losses").html("Losses " +losses);
        clearInterval(intervalId);
        console.log("selected "+ selected);
      
    }

    setTimeout(resetAll, 5000);


}

function showCorrectAnswer(object_correct_answer){
    $(".answerOption:contains("+object_correct_answer+")").css({"backgroundColor":"green"});

}

function resetAll(){
  
  delete obj[j];

  selected=0;
  $(".answers").empty();
  $(".question").empty();
  $("#display").empty();
  clearInterval(intervalId);
  i++;
  if(i<=10){
    el=getQuestion();
  }

  createQuestionSection(el);
}

console.log("selected "+ selected);

