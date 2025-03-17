// Basic ticker rotation - replace with API later
const tickerContent = document.getElementById('ticker-content');
const spotlightContent = document.getElementById('spotlight-content');

const tickerItems = [
    "BTC: $94K—still overpriced hype",
    "ETH: $2.5K—Vitalik’s tears incoming",
    "DOGE: $0.12—Elon’s pumping it again, lord help us"
];

// Simple spotlight rotation - expand later
const spotlightItems = [
    "Solana’s down 15%, someone check Vitalik’s alibi.",
    "New memecoin scam: CumFrog—100% fuckery guaranteed.",
    "Trump’s crypto reserve: bold or bullshit?"
];

let tickerIndex = 0;
let spotlightIndex = 0;

function updateTicker() {
    tickerContent.textContent = tickerItems[tickerIndex];
    tickerIndex = (tickerIndex + 1) % tickerItems.length;
}

function updateSpotlight() {
    spotlightContent.textContent = spotlightItems[spotlightIndex];
    spotlightIndex = (spotlightIndex + 1) % spotlightItems.length;
    setTimeout(updateSpotlight, 5000); // Rotate every 5 seconds
}

// Kick it off
updateTicker();
setInterval(updateTicker, 5000); // Ticker swaps every 5 sec
updateSpotlight();
