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
        choice1: 'The Chain Rule',
        choice2: 'L\'Hopital\'s Rule',
        choice3: 'The Product Rule',
        choice4: 'The Quotient Rule',
        answer: 4,
        image: '1.png',
    },
    { //2
        question: 'What is the 3rd derivative of y=x^3-5x^2+2?',
        choice1: '0',
        choice2: '6x-10',
        choice3: '3x^2-10x',
        choice4: '6',
        answer: 4,
        image: '0.png',
    },
    { //3
        question: 'What is the derivative of cos(x)?',
        choice1: 'tan(x)',
        choice2: 'sin(x)',
        choice3: '-sin(x)',
        choice4: 'sec^2(x)',
        answer: 3,
        image: '0.png',
    },
    { //4
        question: 'Where does the curve y=x^4-2x^2+2 have horizontal tangents?',
        choice1: 'At x=0',
        choice2: 'At x=0, 1',
        choice3: 'At x=0, 1, -1',
        choice4: 'No horizontal tangents',
        answer: 3,
        image: '0.png',
    },
    { //5
        question: 'Find the equation for the line tangent to the curve y=(x^2+3)/(2x)',
        choice1: 'y=3-x',
        choice2: 'y=x-3',
        choice3: 'y=x/2+3',
        choice4: 'y=3-x/2',
        answer: 1,
        image: '0.png',
    },
    { //6
        question: "Answer the following question:",
        choice1: '225 bushels/year',
        choice2: '365 bushels/year',
        choice3: '465 bushels/year',
        choice4: '3018 bushels/year',
        answer: 3,
        image: '2.png',
    },
    { //7
        question: 'Find dy/dx of y=(4x^3-3x^2)/(4x^5-4)',
        choice1: '(-32x^8+36x^7-48x^3+24x^2)/(4x^5-4)^2',
        choice2: '-x(8x^6-9x^5+12x-6)/(4(x^5-1)^2)',
        choice3: '(-32x^7+36x^6-48x^5+24x^2)/(4x^5-4)',
        choice4: '-x(8x^6-9x^5+12x-6)/(2(x^5-1)^2)',
        answer: 2,
        image: '0.png',
    },
    { //8
        question: 'Which order does the Chain Rule follow?',
        choice1: 'Inside-outside',
        choice2: 'PEMDAS',
        choice3: 'Product rule',
        choice4: 'Outside-inside',
        answer: 4,
        image: '0.png',
    },
    { //9
        question: 'What is the following referring to?',
        choice1: 'The Chain Rule',
        choice2: 'The Definition of Composites',
        choice3: 'The Quotient Rule',
        choice4: 'The Product Rule',
        answer: 1,
        image: '3.png',
    },
    { //10
        question: 'Find dy/dx of y=sin(3x+1)',
        choice1: 'cos(3x+1)',
        choice2: '3cos(3x+1)',
        choice3: '-cos(3x+1)',
        choice4: '-sin(3x+1)',
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