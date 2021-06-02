var letterPicks = "abcdefghjkmnpqrstuvxwy";
var opperationPick = "+-";

function showQuestion(){
    textAlign(LEFT);
    textSize(56);
    fill(255);
    text("Question: ", 75,320);
    text(q.question, 75,390);
    text(q.letter + " = ", 75,475);
}

var q = {
        question: "",
        answer: "",
        letter: ""
    };

//Make ONE STEP questions
function oneStep(){
    var letter = letterPicks[Math.floor(Math.random() * letterPicks.length)];
    var opp = opperationPick[Math.floor(Math.random() * opperationPick.length)];
    var a = Math.floor(Math.random() * 12);
    var b = Math.floor(Math.random() * 12);
    var question = letter + " " + opp + " " + a + " " + " = " + " " + b;
    var answer;
    if(opp == "+"){
        answer = b - a;
    }else if(opp == "-"){
        answer = b + a;
    }
    
    q.question = question;
    q.answer = answer;
    q.letter = letter;
    //print("Question: " + question);
    //print("Answer: " + answer);
    //return(q);
    
    //questionDisplay.innerHTML = q.question;
}

var ansInp;

function createAnswerInput(){
    ansInp = createInput('');
    ansInp.position(175,425);
    ansInp.size(100,50);
    ansInp.changed(checkAnswer);
    ansInp.hide();
}

function checkAnswer(){
    if(ansInp.value() == q.answer){
        print("Correct Answer");
        ansInp.value("");
        tokenNum++;
        if(tokenNum>12){
            tokenNum = 12;
        }
        //show new question
        oneStep();
    }else{
        print("Incorrect anwer");
        ansInp.value("");
    }
}

