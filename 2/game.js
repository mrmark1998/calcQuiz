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
        question: 'W`hi`ch of the following graphs have a jump discontinuity?',
        choice1: '(a)',
        choice2: '(b) and (c)',
        choice3: '(d)',
        choice4: 'Other',
        answer: 3,
        image: '1.png',
    },
    { //2
        question: 'Which of the following graphs have a removable discontinuity?',
        choice1: '(a)',
        choice2: '(b) and (c)',
        choice3: '(d)',
        choice4: 'Other',
        answer: 2,
        image: '1.png',
    },
    { //3
        question: 'What theorem does the following graph represent?',
        choice1: 'The Squeeze Theorem',
        choice2: 'Definition of Derivative',
        choice3: 'End Behavior Model',
        choice4: 'Intermediate Value Theorem',
        answer: 4,
        image: '2.png',
    },
    { //4
        question: 'We can always think of an average rate of change as the slope of the ______ line, whereas the instantaneous rate is the _______ line.',
        choice1: 'tangent, vertical asymptote',
        choice2: 'horizontal aymptote, tangent',
        choice3: 'parallel, tangent',
        choice4: 'secant, tangent',
        answer: 4,
        image: '0.png',
    },
    { //5
        question: 'Slope of curve is just the definition of the derivative. True or False?',
        choice1: 'True',
        choice2: 'False',
        choice3: 'Maybe',
        choice4: 'Maybe Not',
        answer: 1,
        image: '0.png',
    },
    { //6
        question: 'We can get the derivative of the following function on the blue line by doing what?',
        choice1: 'Take the limit as h approaches 0',
        choice2: 'Find the equation of the blue line',
        choice3: 'Finding the slope of the black line',
        choice4: 'Take the limit as h approaches infinity',
        answer: 1,
        image: '3.png',
    },
    { //7
        question: 'Which of the following is an INCORRECT notation for the derivative of a function y=f(x)?',
        choice1: 'y\"',
        choice2: 'dy/dx',
        choice3: 'y\'',
        choice4: 'df/dx',
        answer: 1,
        image: '0.png',
    },
    { //8
        question: 'The following graphs are ALL examples of what?',
        choice1: 'Discontinuities examples',
        choice2: 'Examples of vertical and horizontal asymptotes',
        choice3: 'Examples of points where the derivatives do not exist',
        choice4: 'Examples of squared functions',
        answer: 3,
        image: '4.png',
    },
    { //9
        question: 'Which rule of derivatives is the following?',
        choice1: 'The Sum and Difference Rule',
        choice2: 'The Constant Multiple Rule',
        choice3: 'The Quotient Rule',
        choice4: 'The Product Rule',
        answer: 4,
        image: '5.png',
    },
    { //10
        question: 'Find dy/dx of (x^2 + 1)(x^3 +1)',
        choice1: '5x^4 + 3x^2 + 2x',
        choice2: '2x + 3x^2',
        choice3: '2x * 3x^2',
        choice4: 'x^5 + 7x^3 + x^2 + 1',
        answer: 1,
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