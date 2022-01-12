//code inspired by another user on github.  Original code is left commented to show work.  Credit at bottom of page.
var highscore = document.querySelector("#highscoreSelect");
var highScores = document.querySelector("#highScores");
var listOfHighScores = document.querySelector("#listOfHighScores");
var timer = document.querySelector("#timer");
var quiz = document.querySelector("#quiz");
var question = document.querySelector("#question");
var description = document.querySelector("#description");
var startQuiz = document.querySelector("#start_quiz");
var answerButtons = document.querySelector(".answers");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var response = document.querySelector("#answerResponse");
response = "";
var score = 0;
var timeLeft;
var i;
var initialsInput = document.querySelector("#initialsInput");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");
var gameOngoing = false;


var test = [

    {
    //Question 1
    question: "How do you call a class or id from the html?",
    answers: ["Call","function", "querySelector", "transform"],
    correct: "querySelector"
    },
    {
    //Question 2
    question: "What do you write before a variable to declare it?",
    answers: ["Summon", "variable", "Sub", "var"],
    correct: "var"
    },
    {
    //Question 3
    question: "A list of items under the object class is called:",
    answers: ["properties", "array", "list", "points"],
    correct: "properties"
    },
    {
    //Question 4
    question: "How do you create a function in JavaScript",
    answers: ["var function", "function myFunction()", "<function>", "call myFunction"],
    correct: "function myFunction()"
    },
    {
    //Question 5
    question: "How do you add a comment in Javascript?",
    answers: ["**", "-->", "//", "!^"],
    correct: "//"
    }
];

startQuiz.addEventListener("click", function(event) {

    event.preventDefault();

    gameOngoing = true;

    answerButtons.style.visibility = "visible";
    startQuiz.style.visibility = "hidden";

    score = 0;
    i = 0;
    timeLeft = 75;

    countdown();

    description.textContent = "";

    runTest(); 

});

/*This part below gave me a headache
originally, I put down "answer1.addEventListener("click", checkAnswer(0));" 
which returned "null".
Had to ask a friend for help, and he explained that i cant call a function with the number in the argument. */
answer1.addEventListener("click", () => checkAnswer(0));
answer2.addEventListener("click", () => checkAnswer(1));
answer3.addEventListener("click", () => checkAnswer(2));
answer4.addEventListener("click", () => checkAnswer(3));

function countdown() {

    var timeInterval = setInterval(function() {

        if (gameOngoing == false) {
            clearInterval(timeInterval);
        }

        if (timeLeft > 0) {
            timer.textContent = timeLeft;
            timeLeft--;
        } else {
            timer.textContent = 0;
            description.textContent = "You ran out of time!";
            clearInterval(timeInterval);
            gameEnd();
        }  

    }, 1000);
        
}

function timeReduce() {

    timeLeft = timeLeft - 10;
    timer.textContent = timeLeft;

}

function runTest() {

    question.textContent = test[i].question;
    answer1.textContent = test[i].answers[0];
    answer2.textContent = test[i].answers[1];
    answer3.textContent = test[i].answers[2];
    answer4.textContent = test[i].answers[3];

    //     //this was my original code.  It didnt work, so I went to research a working version.  credit at the bottom of the js code.
    //     if (i == 0) {
    //         answer1.addEventListener("click", timeReduce());
    //         answer2.addEventListener("click", timeReduce());
    //         answer3.addEventListener("click", scoreAdd());
    //         answer4.addEventListener("click", timeReduce());
    //     } else if (i == 1) {
    //         answer1.addEventListener("click", timeReduce());
    //         answer2.addEventListener("click", timeReduce());
    //         answer3.addEventListener("click", timeReduce());
    //         answer4.addEventListener("click", scoreAdd());
    //     } else if (i == 2) {
    //         answer1.addEventListener("click", scoreAdd());
    //         answer2.addEventListener("click", timeReduce());
    //         answer3.addEventListener("click", timeReduce());
    //         answer4.addEventListener("click", timeReduce());
    //     } else if (i == 3) {
    //         answer1.addEventListener("click", scoreAdd());
    //         answer2.addEventListener("click", timeReduce());
    //         answer3.addEventListener("click", timeReduce());
    //         answer4.addEventListener("click", timeReduce());
    //     }


    // }
};

function checkAnswer(answer) {

    if (test[i].correct === test[i].answers[answer]) {
        
        score++;
        response.textContent = "Correct!";

    } else {

        timeReduce();
        response.textContent = "Wrong!";

    }
    i++;

    if (i < test.length) { 
        runTest();
    } else {
        gameEnd();
    }

};

// function scoreAdd() {

//     event.preventDefault();
//     score++;

// };

function gameEnd() {

    gameOngoing = false;

    response.textContent = "";
    question.textContent = "Your final score is: " + score;
    
    answerButtons.style.visibility = "hidden";

    initialsInput.style.visibility = "visible";

};

function saveScore() {

    //preventDefault();
    if (initials.value == "") {
        alert("Please enter your intials.")
        return
    } 
    
    var storedScores = localStorage.getItem("high scores");
    var scoresArray;

    if (storedScores === null) {
        scoresArray = [];
    }else {
        scoresArray = JSON.parse(storedScores);
    }

    userScore = {
        initials: initials.value,
        score: score
    }

    console.log(userScore);

    scoresArray.push(userScore);

    console.log(scoresArray);

    var scoresToJSON = JSON.stringify(scoresArray);

    localStorage.setItem("high scores", scoresToJSON);
}

submit.addEventListener("click", function() {

    saveScore();


});

highscore.addEventListener("click", function() {
  
    var savedScores = localStorage.getItem("high scores");

    if (savedScores === null) {

        alert("There are no scores listed yet. Start Playing!");

    } else {
        
        highScores.style.visibility = "visible";
        listOfHighScores.style.visibility = "visible";

        var storedScores = JSON.parse(savedScores);

        for(i=0; i < storedScores.length; i++) {
            var newScore = document.createElement("p");
            newScore.innerHTML = storedScores[i].initials + ": " + storedScores[i].score;
            listOfHighScores.appendChild(newScore);
        };

    }

});


//credit to https://github.com/mmeii/code-quiz/blob/main/Assets/script.js 