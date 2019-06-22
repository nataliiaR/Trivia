
var dataFile = JSON.stringify(jSONObj);
var obj=JSON.parse(dataFile);
guessed=0;

function createQuestionSection(object){
    var answers=object.answers;
    $(".question").html('<h2>'+object.question+'</h2');
    for(var i=0; i<answers.length; i++){
    $(".answers").append('<div class="col-12 answerOption">'+answers[i]+'</div');
    }

}

createQuestionSection(obj[0]);
//console.log(dataFile.data[0].correct);

console.log("data " + dataFile);
console.log("obj " + obj[0].correct_answer);

$(".answerOption").on("click", function(event){
    if(guessed===0){
    selectedOption=$(this);
    verifyTheAnswer(selectedOption,obj[0].correct_answer);
    }

});


function verifyTheAnswer(selectedOption, correct_answer){

    console.log ("selected option "+ selectedOption);
    console.log("correct_answer " + correct_answer);
    if(selectedOption.text()==correct_answer){
        $(selectedOption).css({"backgroundColor":"green"});
        guessed= 1;
      
    }
    else{
        $(selectedOption).css({"backgroundColor":"red"});
        guessed =-1;
        showCorrectAnswer(correct_answer);
      
    }
    if(guessed===1){
        alert("win");
    }
}

function showCorrectAnswer(object_correct_answer){
    $(".answerOption:contains("+object_correct_answer+")").css({"backgroundColor":"green"});

}
