const url = 'https://type.fit/api/quotes';
function getRandomQuote() {
    return fetch(url)
        .then(response => response.json())
}


async function renderNewQuote() {
    const quote = await getRandomQuote();
    const randomNumber = getRandomNumber(0, quote.length);
    console.log(randomNumber);
    console.log(quote[randomNumber].text);
}

function getRandomNumber(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

renderNewQuote();