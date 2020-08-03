const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if (!loader.hidden){
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// Get Quote From API
async function getQuote() {
	showLoadingSpinner();
//Uses proxy to obtain API call without errors/loading times.	
	const proxyUrl = 'https://afternoon-basin-00806.herokuapp.com/'
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
// If author is blank, populaters to anonymous
		if (data.quoteAuthor === ''){
			authorText.innerText = '-anonymous'
		} else {
			authorText.innerText = data.quoteAuthor; 
		}
//Reduce font size for longer quotes
		if (data.quoteText.length > 120){
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}
		quoteText.innerText = data.quoteText;
// Stop loader,show quote
		removeLoadingSpinner();
	} catch (error) {
		getQuote();
	}
}

// Tweets current quote with author.
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
