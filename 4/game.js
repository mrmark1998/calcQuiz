const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

var img = new Image(); 
var div = document.getElementById('question'); 
 

let questions = [
    { //1
        question: 'What is the following referring to?',
        choice1: 'Average Velocity',
        choice2: 'Instantaneous Velocity',
        choice3: 'Speed',
        choice4: 'Acceleration',
        answer: 3,
        image: '1.png',
    },
    { //2
        question: 'Which is the correct order of derivatives?',
        choice1: 'Acceleration -> Velocity -> Position',
        choice2: 'Velocity -> Speed -> Position',
        choice3: 'Position -> Accleration -> Speed',
        choice4: 'Position -> Velocity -> Acceleration',
        answer: 4,
        image: '0.png',
    },
    { //3
        question: 'Which is the following term referring to?',
        choice1: 'Acceleration',
        choice2: 'Velocity',
        choice3: 'Position',
        choice4: 'Sensitivity',
        answer: 1,
        image: '2.png',
    },
    { //4
        question: 'Which of the following graphs could represent the particle\'s speed if the following graph is its position?',
        choice1: '(a)',
        choice2: '(b)',
        choice3: '(c)',
        choice4: '(d)',
        answer: 2,
        image: '3.png',
    },
    { //5
        question: 'For a rock blasted up by dynamite (as in the picture), how do you find the highest point?',
        choice1: 'Set accelation = 0',
        choice2: 'Set speed = 0',
        choice3: 'Set position = 0',
        choice4: 'Set velocity = 0',
        answer: 4,
        image: '4.png',
    },
    { //6
        question: "If the equation for a rock thrown up from the moon is: s = 24t - 0.8t^2, how high does it go?",
        choice1: '30m',
        choice2: '15m',
        choice3: '180m',
        choice4: '300m',
        answer: 3,
        image: '4.png',
    },
    { //7
        question: 'Match the following graphs to a (distance traveled), b (velocity), and c (acceleration): ',
        choice1: 'a=iii, b=ii, c=i',
        choice2: 'a=iii, b=i, c=ii',
        choice3: 'a=i, b=iii, c=ii',
        choice4: 'a=i, b=ii, c=iii',
        answer: 2,
        image: '5.png',
    },
    { //8
        question: 'What is the y\'\'\' of y = x^(-1) + x^2?',
        choice1: '6',
        choice2: '2x^-3 + 2',
        choice3: '-24x^(-5)',
        choice4: '-6x^(-4)',
        answer: 4,
        image: '0.png',
    },
    { //9
        question: 'What is the derivative of csc(x)?',
        choice1: '-csc(x)cot(x)',
        choice2: 'sec(x)tan(x)',
        choice3: '-csc^2(x)',
        choice4: 'sex^2(x)',
        answer: 1,
        image: '0.png',
    },
    { //10
        question: 'What is the name for a sudden change in acceleration? d^3*s/dt^3?',
        choice1: 'Speed',
        choice2: 'Jerk',
        choice3: 'Absolute value of acceleration',
        choice4: 'Haste',
        answer: 2,
        image: '0.png',
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
}

getNewQuestions = () => {
    if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    document.getElementById("question-image").src=currentQuestion.image;

 
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e=> {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();

        }, 1000);
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()