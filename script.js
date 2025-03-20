<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>CryptoFuckeryHub</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="logo-container">
            <img src="logo.jpg" alt="CryptoFuckeryHub Logo" class="logo-img">
            <h1>CryptoFuckeryHub</h1>
        </div>
        <nav class="dropdown">
            <button class="dropbtn">Menu</button>
            <div class="dropdown-content">
                <a href="news.html">News</a>
                <a href="presales.html">Presales</a>
                <a href="blog.html">Blog</a>
                <a href="tools.html">Tools</a>
            </div>
        </nav>
        <div class="user-auth">
            <button id="auth-btn">Login</button>
            <div id="auth-form" class="auth-form hidden">
                <input type="text" id="username" placeholder="Username">
                <input type="password" id="password" placeholder="Password">
                <button id="login-submit">Login</button>
                <button id="signup-submit">Sign Up</button>
            </div>
        </div>
    </header>
    <main>
        <section class="intro">
            <p>CryptoFuckeryHub—ripping the chains off the blockchain, exposing the truth, the bullshit, and the hype with nothing but savage takes and news that shatters. We’re locked on the prize, tearing through the crypto swamp with a snarl and a middle finger—get in or get fucked.</p>
        </section>
        <section class="ticker">
            <h2 class="ticker-title">Live Market Feed</h2>
            <div class="ticker-container">
                <div id="live-ticker-btc" class="ticker-item">BTC: Loading...</div>
                <div id="live-ticker-eth" class="ticker-item">ETH: Loading...</div>
                <div id="ticker-status" class="ticker-status">Powered by Coinbase API | Updating...</div>
            </div>
        </section>
        <section class="newsletter">
            <h2>Sign Up for Our Newsletter</h2>
            <form id="newsletter-form">
                <input type="email" id="email" placeholder="Enter your email" required>
                <button type="submit">Subscribe</button>
            </form>
        </section>
    </main>
    <script src="script.js"></script>
</body>
</html>
