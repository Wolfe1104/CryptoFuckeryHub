// User Authentication and Persistence
let currentUser = localStorage.getItem('currentUser') || null;

function updateAuthButton() {
    const authBtn = document.getElementById('auth-btn');
    if (currentUser) {
        authBtn.textContent = `Logged in as ${currentUser}`;
        authBtn.disabled = true;
    } else {
        authBtn.textContent = 'Login';
        authBtn.disabled = false;
    }
}

document.getElementById('auth-btn').addEventListener('click', () => {
    if (!currentUser) {
        document.getElementById('auth-form').classList.toggle('hidden');
    }
});

document.getElementById('login-submit').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username] && users[username] === password) {
        currentUser = username;
        localStorage.setItem('currentUser', username);
        alert(`Welcome back, ${username}!`);
        document.getElementById('auth-form').classList.add('hidden');
        updateAuthButton();
    } else {
        alert('Invalid credentials!');
    }
});

document.getElementById('signup-submit').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
        alert('Username already taken!');
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Signed up as ${username} - Now login!`);
    }
});

updateAuthButton();

// Coinbase API Live Ticker
async function fetchCoinbaseTicker() {
    try {
        const btcResponse = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        if (!btcResponse.ok) throw new Error('BTC API failed');
        const btcData = await btcResponse.json();
        const btcPrice = parseFloat(btcData.data.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('live-ticker-btc').textContent = `BTC/USD: $${btcPrice}`;

        const ethResponse = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot');
        if (!ethResponse.ok) throw new Error('ETH API failed');
        const ethData = await ethResponse.json();
        const ethPrice = parseFloat(ethData.data.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('live-ticker-eth').textContent = `ETH/USD: $${ethPrice}`;

        const now = new Date().toLocaleTimeString('en-US', { hour12: true });
        document.getElementById('ticker-status').textContent = `Powered by Coinbase API | Last Updated: ${now}`;
    } catch (error) {
        document.getElementById('live-ticker-btc').textContent = 'BTC: API Error';
        document.getElementById('live-ticker-eth').textContent = 'ETH: API Error';
        document.getElementById('ticker-status').textContent = 'Coinbase API Offline - Retry Later';
        console.error('Ticker Error:', error);
    }
}

fetchCoinbaseTicker();
setInterval(fetchCoinbaseTicker, 30000);

// Newsletter Signup
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if (email) {
        alert(`Thanks for signing up, ${email}!`);
        document.getElementById('email').value = '';
    }
});
