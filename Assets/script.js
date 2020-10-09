//Questions arrays

var questions = [{
        title: 'What is a <link> tag most commonly used for?',
        options: ['Linking to an external stylesheet', 'Linking to other webpages', 'Linking elements together to help them flow', 'Linking words together', ],
        answer: 'Linking to an external stylesheet'
    },

    {
        title: 'Where are <link> tags included?',
        options: ['<body>', '<header>', '<head>', '<footer>', ],
        answer: '<head>'
    },

    {
        title: 'In Boostrap, the grid system is based on how many columns?',
        options: ['3', '8', '10', '12', ],
        answer: '12'
    },

    {
        title: 'What does HTML stand for?',
        options: ['HyperText Media Language', 'HyperText Markup Language', 'Hyperion Transfer Manual', 'Hypertrophy Training Module', ],
        answer: 'HyperText Markup Language'
    },

    {
        title: 'Which of these is an invalid html Element?',
        options: ['<div>', '<link>', '<header>', '<end>', ],
        answer: '<end>'
    },

    {
        title: 'Inside which HTML element do we put the JavaScript?',
        options: ['<js>', '<script>', '<code>', '<javascript>', ],
        answer: '<script>'
    },

    {
        title: 'How do you write "Hello World" in an alert box?',
        options: ['msg("Hello World")', 'alert("Hello World")', 'shout("Hello World")', 'speak("Hello World")', ],
        answer: 'alert("Hello World")'
    },

    {
        title: 'How can you add a comment in a JavaScript?',
        options: ['//This is a comment', '<!--This is a comment-->', '**A comment**', '--Comment--', ],
        answer: '//This is a comment'
    },

    {
        title: 'How do you declare a JavaScript variable?',
        options: ['v carName', 'var carName', 'variable carName', 'vr carName', ],
        answer: 'var carName'
    },

    {
        title: 'Which operator is used to assign a value to a variable?',
        options: ['=', '*', '-', '+', ],
        answer: '='
    },

    {
        title: 'Which of the following is not JavaScript Data Types?',
        options: ['Undefined', 'Number', 'Boolean', 'Float', ],
        answer: 'Float'
    },

    {
        title: 'What does CSS stand for?',
        options: ['Cascading Style Sheets', 'Creative Style Sheet', 'Computer Style sheet', 'Colourful Style Sheet', ],
        answer: 'Cascading Style Sheets'
    },

    {
        title: 'Which property is used to change the font of an element?',
        options: ['font-family', 'font-weight', 'font-style', 'font-control', ],
        answer: 'font-family'
    },

    {
        title: 'How do you select an element with id "demo"?',
        options: ['*demo', '#demo', 'demo', '.demo', ],
        answer: '#demo'
    },

    {
        title: 'How do you select elements with class name "test" in the CSS?',
        options: ['#test', 'test', '*test', '.test', ],
        answer: '.test'
    }

];

//Variables

var intro = document.querySelector("#intro");
var questionsChoices = document.querySelector("#questions");
var finalScoreScreen = document.querySelector("#final-score-screen");
var startButton = document.querySelector("#start");
var submitButton = document.querySelector("#submit-button");
var countdownBox = document.querySelector("#countdown");
var countdownNumber = document.querySelector("#countdown-number");
var options = document.querySelector("#options");
var optionsChild = options.firstElementChild;
var scores = document.querySelector("#scores-display");
var scoresChild;
var userCorrectScore = document.querySelector("#user-score");
var userTimeScore = document.querySelector("#user-time-score");
var userTotalScore = document.querySelector("#user-total-score");
var correctScoreContainer = document.querySelector("#correct-score-container");
var timeScoreContainer = document.querySelector("#time-score-container");
var totalScoreContainer = document.querySelector("#total-score-container");
var enterAndSubmitContainer = document.querySelector("#enter-and-submit");
var questionText = document.querySelector("#question");
var nameInput = document.querySelector("#name-input");
var currentPage = document.location.href;
var randomedQuestions = [];
var username;
var secondsLeft;
var interval;
var correctScore = 0;
var timeScore;
var totalScore;
var questionIndex;
var oldScores;
var today;
var allScores;

//pull the local scores

function getAllScores() {
    if (!localStorage.getItem("allScores")) {
        allScores = [];
    } else {
        allScores = JSON.parse(localStorage.getItem("allScores"));
    }
}

getAllScores();

//shuffle the questions

function randomQuestions(questions) {
    var i, j, k, l, x, y;
    var randomedQuestions = questions;
    for (i = randomedQuestions.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = randomedQuestions[i];
        randomedQuestions[i] = randomedQuestions[j];
        randomedQuestions[j] = x;
        for (k = randomedQuestions[i].options.length - 1; k > 0; k--) {
            l = Math.floor(Math.random() * (k + 1));
            y = randomedQuestions[i].options[k];
            randomedQuestions[i].options[k] = randomedQuestions[i].options[l];
            randomedQuestions[i].options[l] = y;
        }
    }
    return randomedQuestions;
}


//Start the quiz

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    randomedQuestions = randomQuestions(questions);
    startTimer();
    intro.setAttribute('style', 'display:none;');
    countdownBox.setAttribute('style', 'display:block;');
    questionsChoices.setAttribute('style', 'display:block;');
    correctScore = 0;
    questionNumber = 0;
    showQuestion();
}

// Start the timer


function startTimer() {
    secondsLeft = 60;
    interval = setInterval(function () {
        renderTime();
        if (secondsLeft < 0) {
            secondsLeft--;
            clearInterval(interval);
            endQuiz();
        } else {}
    }, 1000);
}


// End quiz function

function endQuiz() {
    questionsChoices.setAttribute('style', 'display:none');
    finalScoreScreen.setAttribute('style', 'display:block;');
    countdownBox.setAttribute('style', 'display:none;');

    //Date of quiz

    date = new Date();

    dateArray = [
        date.getDate(),
        date.getMonth(),
        date.getFullYear()
    ]

    dateArray.forEach(formatDate);

    dateOfQuiz = dateArray[0] + '-' + dateArray[1] + '-' + dateArray[2];

    if (
        typeof timeScore !== 'num'
    ) {
        timeScore = 0;
    }

    totalScore = correctScore + timeScore;

    // Populate the score fields
    userTimeScore.textContent = timeScore;
    userCorrectScore.textContent = correctScore;
    userTotalScore.textContent = totalScore;

    setTimeout(function () {
        correctScoreContainer.setAttribute("class", "score-breakdown row;");
        correctScoreContainer.setAttribute("style", "");

        setTimeout(function () {
            timeScoreContainer.setAttribute("class", "score-breakdown row;");
            timeScoreContainer.setAttribute("style", "");

            setTimeout(function () {
                totalScoreContainer.setAttribute("class", "score-breakdown row;");
                totalScoreContainer.setAttribute("style", "margin-bottom: 30px;");

                setTimeout(function () {
                    enterAndSubmitContainer.setAttribute("class", "score-breakdown row;");
                    enterAndSubmitContainer.setAttribute("style", "");
                }, 1000);

            }, 1000);

        }, 1000);

    }, 1000);
}

function formatDate(item, index, arr) {
    if (arr[index] < 10) {
        arr[index] = "0" + arr[index];
    }
}

function renderTime() {
    countdownNumber.textContent = secondsLeft;
}

function showQuestion() {
    questionText.textContent = randomedQuestions[questionNumber].title;
    optionsChild = options.firstElementChild;


    while (optionsChild) {
        options.removeChild(optionsChild);
        optionsChild = options.firstElementChild;
    }

    for (var i = 0; i < randomedQuestions[questionNumber].options.length; i++) {
        var newList = document.createElement("li");
        newList.classList.add('answer-choice');
        newList.textContent = randomedQuestions[questionNumber].options[i];
        options.appendChild(newList);
    }
}

//Which option is clicked



options.addEventListener('click', function () {
    if (event.target.textContent === randomedQuestions[questionNumber].answer) {
        event.target.setAttribute('style', 'background-color: #00AA00');
        correctScore++;
    } else {
        event.target.setAttribute('style', 'background-color: #EF3F34');
        secondsLeft -= 5;
    }

    setTimeout(function () {
        if (questionNumber === randomedQuestions.length - 1) {
            setTimeout(function () {

            }, 200);

            questionsChoices.setAttribute('style', 'display:none;');

            timeScore = Math.floor(secondsLeft / 10);

            secondsLeft = 0
        } else {
            questionNumber++;
            showQuestion();
        }
    }, 200);
})

submitButton.addEventListener('click', function () {
    event.preventDefault();

    if (nameInput.value == '') {
        alert('A name is required to submit a score');
    } else {
        username = nameInput.value;
        updateScores();
        window.location.href = './scores.html';

    }
});

function updateScores() {
    if (allScores.length === 0 && allScores[0] == "") {
        allScores[0] = {
            name: username,
            score: totalScore,
            date: dateArray,
        }
    } else {
        allScores.push({
            name: username,
            score: totalScore,
            date: dateArray,
        });
    }
    localStorage.setItem("allScores", JSON.stringify(allScores));
}