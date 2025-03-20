// Coinbase API Live Ticker
async function fetchCoinbaseTicker() {
    try {
        const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        const data = await response.json();
        const btcPrice = data.data.amount;
        document.getElementById('live-ticker').innerHTML = `BTC: $${btcPrice} | ETH: Loading... (Coinbase API)`;
        
        const ethResponse = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot');
        const ethData = await ethResponse.json();
        const ethPrice = ethData.data.amount;
        document.getElementById('live-ticker').innerHTML = `BTC: $${btcPrice} | ETH: $${ethPrice} (Live from Coinbase API)`;
    } catch (error) {
        document.getElementById('live-ticker').innerHTML = 'Coinbase API Error - Check Console';
        console.error('Ticker Fetch Error:', error);
    }
}
fetchCoinbaseTicker();
setInterval(fetchCoinbaseTicker, 60000);

// Login Toggle
document.getElementById('login-btn').addEventListener('click', () => {
    const form = document.getElementById('login-form');
    form.classList.toggle('hidden');
});

// Dummy Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        alert(`Logged in as ${username} - Welcome to the Fuckery!`);
        document.getElementById('login-form').classList.add('hidden');
    } else {
        alert('Fill in the damn fields, asshole!');
    }
}

// Newsletter Signup
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if (email) {
        alert(`Thanks for signing up, ${email}! Prepare for crypto chaos in your inbox.`);
        document.getElementById('email').value = '';
    }
});
