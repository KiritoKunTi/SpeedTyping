// const url = 'https://api.quotable.io/random';
const url = 'https://type.fit/api/quotes';
const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInput = document.getElementById('quoteInput');
const timer = document.getElementById('timer');

quoteInput.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');

    let correct = true;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if ( character == null ) {
            removeStyle(characterSpan);
            correct = false;
        } else if ( character === characterSpan.innerText ) {
            if ( isSpace(characterSpan.innerText) ) {
                characterSpan.classList.remove('incorrect-bg');
            } else {
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');
            }
        } else {
            if ( isSpace(characterSpan.innerText) ) {
                characterSpan.classList.add('incorrect-bg');
            } else {
                characterSpan.classList.remove('correct');
                characterSpan.classList.add('incorrect');
            }
            correct = false;
        }
    });

    if ( correct ) {
        renderNewQuote();
    }
});

function removeStyle(characterSpan) {
    characterSpan.classList.remove('correct-bg');
    characterSpan.classList.remove('incorrect-bg');
    characterSpan.classList.remove('correct');
    characterSpan.classList.remove('incorrect');
}

function isSpace(character) {
    return character == ' ';
}

function getRandomQuote() {
    return fetch(url).then(response => response.json());
}

function getRandomNumber(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

async function renderNewQuote() {
    const quotes = await getRandomQuote();
    const quote = quotes[getRandomNumber(0, quotes.length)].text;
    quoteDisplay.innerText = '';
    quoteInput.value = null;

    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplay.appendChild(characterSpan);
    });
    startTimer();
}

let startTime;

function startTimer() {
    timer.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}


renderNewQuote();