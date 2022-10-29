const highScoresList4 = document.querySelector('#highScoresList4')
const highScores4 = JSON.parse(localStorage.getItem('highScores4')) || []

highScoresList4.innerHTML = 
highScores4.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')