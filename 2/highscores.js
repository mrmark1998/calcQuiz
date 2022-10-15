const highScoresList2 = document.querySelector('#highScoresList2')
const highScores2 = JSON.parse(localStorage.getItem('highScores2')) || []

highScoresList2.innerHTML = 
highScores2.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')