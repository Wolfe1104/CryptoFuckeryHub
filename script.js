// Coinbase API Live Ticker Setup
async function fetchCoinbaseTicker() {
    try {
        // Fetch BTC price
        const btcResponse = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        if (!btcResponse.ok) throw new Error('BTC API call failed');
        const btcData = await btcResponse.json();
        const btcPrice = parseFloat(btcData.data.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Fetch ETH price
        const ethResponse = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot');
        if (!ethResponse.ok) throw new Error('ETH API call failed');
        const ethData = await ethResponse.json();
        const ethPrice = parseFloat(ethData.data.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Update ticker with formatted prices and timestamp
        const now = new Date().toLocaleTimeString('en-US', { hour12: true });
        document.getElementById('live-ticker').innerHTML = `BTC: $${btcPrice} | ETH: $${ethPrice} | Live Coinbase Feed - Updated ${now}`;
    } catch (error) {
        document.getElementById('live-ticker').innerHTML = 'Coinbase API Down - Check Back Soon';
        console.error('Ticker Fetch Error:', error);
    }
}

// Initial fetch and refresh every 30 seconds
fetchCoinbaseTicker();
setInterval(fetchCoinbaseTicker, 30000);

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
