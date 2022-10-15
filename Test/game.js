fetch('https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple').then((data) => {
    return data.json()
}).then((completedata) => {
    console.log(completedata)
    startGame(completedata)
})
.catch(error => console.log('ERROR'))


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

//shuffle function to shuffle the correct answers into the incorrect
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = (data) => {
    questionCounter = 0;
    score = 0;
    
    availableQuestions = [...data.results];
    getNewQuestions(data);
}

let choiceArr=[]

getNewQuestions = (data) => {
    

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

    //Start API call pulls from current Question
    document.querySelector("#category").innerHTML = `Category: ${currentQuestion.category}`
    document.querySelector("#difficulty").innerHTML = `Difficulty: ${currentQuestion.difficulty}`
    
    //document.getElementById("question-image").src=currentQuestion.image; //API doesn't have images
    
    let randomIndex=4
    choiceArr=[]
    choices.forEach(choice => {
        const number = choice.dataset['number']
        if(number<4) choiceArr.push(currentQuestion.incorrect_answers[number-1])
        if(number==4) choiceArr.push(currentQuestion.correct_answer)
    });
    shuffle(choiceArr)

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = choiceArr[number-1]
    });
    
    console.log(choiceArr[0])

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e=> {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const selectedAnswerText = choiceArr[selectedAnswer-1];

        let classToApply = selectedAnswerText == currentQuestion.correct_answer ? 'correct' : 'incorrect';

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
