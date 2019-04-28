// TODO(you): Add your own positive messages if you'd like!
const POSITIVE_MESSAGES = [
    'You are worthy.',
    'You are enough.',
    'Be kind and forgiving to yourself.',
    'You are amazing.',
    'It\'s okay not to be okay.',
    'It\'s enough to just breathe.',
    'You are loved.',
    'I believe in you.',
    'You can do it!',
    'You are not a failure.',
    'You matter.',
    'Your life matters.'
];
const cur_url = chrome.runtime.getURL('images/rose-cursor.gif');
const bg_url = chrome.runtime.getURL('images/sparkle.gif');
const tweets = document.querySelectorAll(".tweet");

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(onMessage);
});


function onMessage(gardeningInProgress) {
    // TODO(you): Implement this function for extra credit! Add helper functions
    // as needed.

    // NOTE: This extension is EXTRA CREDIT and is not required for HW2.

    // If `gardeningInProgress` is true, that means "Start Gardening" was clicked.
    // If `gardeningInProgress` is false, that means "Stop Gardening" was clicked.

    if (gardeningInProgress) {
        tweets.forEach((tweet) => {
            tweet.style.cursor = 'url(' + cur_url + ') 4 12, auto';
            tweet.addEventListener("mouseover", addbg);
            tweet.addEventListener("mouseout", rmbg);
            tweet.addEventListener("click", replaceTweet);

        })

    } else {
        tweets.forEach((tweet) => {
            tweet.style.cursor = '';
            tweet.removeEventListener("mouseover", addbg);
            tweet.removeEventListener("mouseout", rmbg);
            tweet.removeEventListener("click", replaceTweet);
        });

    }
}

function addbg(e) {
    // console.log(e.currentTarget);
    e.currentTarget.style.background = "url(" + bg_url + ")";
    e.currentTarget.style.opacity = "0.8";
}

function rmbg(e) {
    e.currentTarget.style.background = "";
    e.currentTarget.style.opacity = "1";
}

function replaceTweet(e) {
    e.stopPropagation();
    e.preventDefault();
    text = e.currentTarget.querySelector(".tweet-text");
    console.log(text.textContent);
    text.textContent = POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)];
}
