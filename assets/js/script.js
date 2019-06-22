
var dataFile = JSON.stringify(jSONObj);
var obj=JSON.parse(dataFile);
guessed=0;
var wins=0;
var losses=0;
//var time = obj[0].timeInMiliSeconds;

function createQuestionSection(object){
    var answers=object.answers;
    time = obj[0].timeInMiliSeconds;
    intervalId = setInterval(count, 1000);
    $(".question").html('<h2>'+object.question+'</h2');
    for(var i=0; i<answers.length; i++){
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
        showCorrectAnswer(obj[0].correct_answer);
        losses++;
        $("#losses").html("Losses "+ losses);
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
createQuestionSection(obj[0]);
//console.log(dataFile.data[0].correct);

console.log("data " + dataFile);
console.log("obj " + obj[0].correct_answer);

$(".answerOption").on("click", function(event){
    if(guessed===0){
        selectedOption=$(this);
        verifyTheAnswer(selectedOption,obj[0].correct_answer);
        clearInterval(intervalId);
    }

});


function verifyTheAnswer(selectedOption, correct_answer){

    console.log ("selected option "+ selectedOption);
    console.log("correct_answer " + correct_answer);
    if(selectedOption.text()==correct_answer){
        $(selectedOption).css({"backgroundColor":"green"});
        guessed= 1;
        wins++;
        $("#wins").html("Wins " + wins);
      
    }
    else{
        $(selectedOption).css({"backgroundColor":"red"});
        guessed =-1;
        showCorrectAnswer(correct_answer);
        losses++;
        $("#losses").html("Losses " +losses);
      
    }


}

function showCorrectAnswer(object_correct_answer){
    $(".answerOption:contains("+object_correct_answer+")").css({"backgroundColor":"green"});

}


