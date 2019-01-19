const QUOTE_API_URL = "https://favqs.com/api/quotes/";
let API_KEY = "32420ff240347cc660883e68bd7382af";
let quotes = [];

const getQuotes = function () {
    const options = {
        headers: {
            'Access-Control-Allow-Headers': 'Authorization',
            'Authorization': `Token token="${API_KEY}"`,
        },
        method: 'GET'
    };
    fetch(QUOTE_API_URL, options)
        .then(data => data.json())
        .then(data => {
            quotes = quotes.concat(data['quotes']);
            console.log(quotes);
        })
        .catch(e => {
            console.log("===============ERROR===============");
            console.log(e);
            console.log("===============ERROR===============");
        });
};

const renderQuote = function (quote) {
    console.log(quote);
    let content = quote['body'], author = quote['author'];
    $("#quote").html(content);
    $("#author").html("- " + author);
};


$(document).ready(function () {
    getQuotes();

    $("#get-another-quote-button").on("click", () => {
        let index = parseInt(Math.random() * quotes.length);
        renderQuote(quotes[index]);
    });

    //twitter share
    $("#social-btn-twitter").on("click", () => {
        const text = document.getElementById('quote').innerHTML + ' '
            + document.getElementById('author').innerHTML;
        const link = "https://twitter.com/intent/tweet?text=" + text + "&hashtags=quote";
        window.open(link, '_blank');
    });
    /*end of twitter share =============*/
});