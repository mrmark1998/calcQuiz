const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')



resetHighScore = e => {
    e.preventDefault()

    localStorage.removeItem('highScores')
    localStorage.removeItem('highScores2')
    localStorage.removeItem('highScores3')
    localStorage.removeItem('highScoresAPI')
    location.reload()
}