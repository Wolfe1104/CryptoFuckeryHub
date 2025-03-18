// Basic ticker animation
const ticker = document.getElementById('ticker-content');
ticker.style.animation = 'scroll 20s linear infinite';

// Spotlight rotator (example)
const spotlight = document.getElementById('spotlight-content');
const updates = [
    "Solana’s down 15%, someone check Vitalik’s alibi.",
    "Bitcoin pumps while altcoins eat dirt—same old shit.",
    "Polygon’s gas fees laugh at Ethereum’s corpse."
];
let index = 0;
setInterval(() => {
    spotlight.textContent = updates[index];
    index = (index + 1) % updates.length;
}, 5000);
