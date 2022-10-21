const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores3')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

//confetti for Scores >=800
if(mostRecentScore >= 800) {
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = '../confetti.js';
    document.getElementsByTagName('head')[0].appendChild(newScript);
    if (mostRecentScore <1000) finalScore.innerText += "\rGood Job!"
}

//anime character for perfect score
if(mostRecentScore >= 1000) {
    let anime = ['cats.png', 'charmander.jpg', 'chihiro.png', 'eevee.png', 'ghibli.jpg', 
                'kakashi.jpg', 'naruto.jpg', 'nausicaa.png', 'noface.png', 'onesies.jpg', 'pikachu.jpg', 
                'sakura.jpg', 'sasuke.png', 'squirtle.jpg', 'togepi.jpg', 'totoro.png']
    let randomIndex = Math.floor(Math.random()*anime.length)
    document.getElementById("anime-box").innerHTML = "<img id=\"anime-image\" src=\"/anime/" + anime[randomIndex]+ "\">";
    finalScore.innerText += "\rYou Rock!"
    
}

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)
    
    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores3', JSON.stringify(highScores))
    window.location.assign('index.html')

}
