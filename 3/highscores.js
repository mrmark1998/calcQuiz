const highScoresList3 = document.querySelector('#highScoresList3')
const highScores3 = JSON.parse(localStorage.getItem('highScores3')) || []

highScoresList3.innerHTML = 
highScores3.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')