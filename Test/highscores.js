const highScoresListAPI = document.querySelector('#highScoresListAPI')
const highScoresAPI = JSON.parse(localStorage.getItem('highScoresAPI')) || []

highScoresListAPI.innerHTML = 
highScoresAPI.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')