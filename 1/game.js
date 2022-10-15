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
        question: 'Which of the statements are false about y = f(x) in the graph?',
        choice1: 'lim x->-1+ f(x) = 1',
        choice2: 'lim x->0- f(x) = 0',
        choice3: 'lim x->0- f(x) = 1',
        choice4: 'lim x->0- f(x) = lim x->0+ f(x)',
        answer: 3,
        image: '1.png',
    },
    { //2
        question: 'Determine limit as x approaches (1/2) for the function int x',
        choice1: '1',
        choice2: '1/2',
        choice3: '0',
        choice4: 'Infinity',
        answer: 3,
        image: '0.png',
    },
    { //3
        question: 'Use algebra to determine lim x->5 (x^3 - 125)/(x-5). Confirm graphically.',
        choice1: '25',
        choice2: '50',
        choice3: '75',
        choice4: 'None of the above',
        answer: 3,
        image: '0.png',
    },
    { //4
        question: 'Which of the following is true if lim x->b f(x)=7 and lim x->b g(x) = -3 ?',
        choice1: 'lim x->b (f(x)/g(x)) = 4',
        choice2: 'lim x->b 4*g(x) = 4',
        choice3: 'lim x->b (f(x)*g(x)) = 4',
        choice4: 'lim x->b (f(x) + g(x)) = 4',
        answer: 4,
        image: '0.png',
    },
    { //5
        question: 'Use the following function below.  What is the value of lim x->1+ f(x)?',
        choice1: '5/2',
        choice2: '3/2',
        choice3: '1',
        choice4: '0',
        answer: 2,
        image: '2.png',
    },
    { //6
        question: 'Use the Squeeze Theorem to determine lim x->0 (x^2 * cos(1/x^2)).  Confirm graphically.',
        choice1: 'infinity',
        choice2: '1',
        choice3: '0',
        choice4: 'None of the above',
        answer: 3,
        image: '0.png',
    },
    { //7
        question: 'Use the Squeeze Theorem to determine lim x->inf (1-cos(x))/x^2.  Confirm graphically.',
        choice1: '0',
        choice2: '1',
        choice3: 'infinity',
        choice4: 'None of the above',
        answer: 1,
        image: '0.png',
    },
    { //8
        question: 'Determine the limit as x approaches negative infinity for the following function: ',
        choice1: '0',
        choice2: '1',
        choice3: 'infinity',
        choice4: '-infinity',
        answer: 2,
        image: '3.png',
    },
    { //9
        question: 'Which of the following lines is a horizontal asymptote for',
        choice1: 'y=(3/2)x',
        choice2: 'y=0',
        choice3: 'y=2/3',
        choice4: 'y=3/2',
        answer: 4,
        image: '4.png',
    },
    { //10
        question: 'lim x->2- (x/(x-2)) = ',
        choice1: '-infinity',
        choice2: 'infinity',
        choice3: '1',
        choice4: '-1/2',
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