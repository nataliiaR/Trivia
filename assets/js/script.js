
var dataFile = JSON.stringify(jSONObj);
var obj=JSON.parse(dataFile);
guessed=0;
var wins=0;
var losses=0;

i=1;
createQuestionSection(obj[i]);


$(".answerOption").on("click", function(event){
    if(guessed===0){
        selectedOption=$(this);
        verifyTheAnswer(selectedOption,obj[i].correct_answer);
        clearInterval(intervalId);
    }

});



function createQuestionSection(object){
    var answers=object.answers;
    time = object.timeInSeconds;
    intervalId = setInterval(count, 1000);
    $(".question").html('<h2>'+object.question+'</h2');
    for(let i=0; i<answers.length; i++){
    $(".answers").append('<div class="col-12 answerOption">'+answers[i]+'</div');
    }

}
function count(){
     if (time>0){
        // DONE: increment time by 1, remember we cant use "this" here.
        time--;
      
        // DONE: Get the current time, pass that into the timeConverter function,
        //       and save the result in a variable.
        var converted = timeConverter(time);
      
        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);
        
     }  
     else{
        showCorrectAnswer(obj[i].correct_answer);
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
        guessed= 1;
        wins++;
        $("#wins").html("Wins " + wins);
        setTimeout(resetAll, 5000);
      
    }
    else{
        $(selectedOption).css({"backgroundColor":"red"});
        guessed =-1;
        showCorrectAnswer(correct_answer);
        losses++;
        $("#losses").html("Losses " +losses);
        setTimeout(resetAll, 5000);
      
    }


}

function showCorrectAnswer(object_correct_answer){
    $(".answerOption:contains("+object_correct_answer+")").css({"backgroundColor":"green"});

}

function resetAll(){

  $(".answers").empty();
  $(".question").empty();
  $("#display").empty();

}
//createQuestionSection(obj[1]);

