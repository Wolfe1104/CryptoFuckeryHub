// Shared Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const dropdownContent = document.querySelector('.dropdown-content');
    const authBtn = document.getElementById('auth-btn');
    const authForm = document.getElementById('auth-form');
    const loginSubmit = document.getElementById('login-submit');
    const signupSubmit = document.getElementById('signup-submit');
    const profileModal = document.getElementById('profile-modal');
    const saveProfile = document.getElementById('save-profile');
    const closeButtons = document.querySelectorAll('.close');

    // Hamburger Menu Toggle
    if (hamburger && dropdownContent) {
        hamburger.addEventListener('click', () => {
            dropdownContent.classList.toggle('active');
        });
    }

    // Check if a user is logged in
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        authBtn.textContent = 'Profile';
        if (!document.querySelector('.dropdown-content a[href="#profile"]')) {
            const profileLink = document.createElement('a');
            profileLink.href = '#';
            profileLink.textContent = 'Profile';
            profileLink.addEventListener('click', showProfileModal);
            dropdownContent.appendChild(profileLink);
        }
    } else {
        authBtn.textContent = 'Login';
    }

    // Auth Button Click
    authBtn.addEventListener('click', () => {
        if (authBtn.textContent === 'Login') {
            authForm.classList.remove('hidden');
        } else {
            showProfileModal();
        }
    });

    // Close Buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            authForm.classList.add('hidden');
            profileModal.classList.add('hidden');
        });
    });

    // Login Handler
    loginSubmit.addEventListener('click', handleLogin);
    function handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', username);
            authBtn.textContent = 'Profile';
            if (!document.querySelector('.dropdown-content a[href="#profile"]')) {
                const profileLink = document.createElement('a');
                profileLink.href = '#';
                profileLink.textContent = 'Profile';
                profileLink.addEventListener('click', showProfileModal);
                dropdownContent.appendChild(profileLink);
            }
            authForm.classList.add('hidden');
            location.reload();
        } else {
            alert('Invalid credentials');
        }
    }

    // Sign-Up Handler
    signupSubmit.addEventListener('click', handleSignUp);
    function handleSignUp() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.username === username)) {
            alert('Username already exists');
        } else {
            users.push({ username, password, email: '' });
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', username);
            authBtn.textContent = 'Profile';
            const profileLink = document.createElement('a');
            profileLink.href = '#';
            profileLink.textContent = 'Profile';
            profileLink.addEventListener('click', showProfileModal);
            dropdownContent.appendChild(profileLink);
            authForm.classList.add('hidden');
            location.reload();
        }
    }

    // Show Profile Modal
    function showProfileModal() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === currentUser);
            if (user) {
                document.getElementById('profile-username').value = user.username;
                document.getElementById('profile-email').value = user.email || '';
                profileModal.classList.remove('hidden');
            }
        }
    }

    // Save Profile Data
    saveProfile.addEventListener('click', saveProfileData);
    function saveProfileData() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.username === currentUser);
            if (userIndex !== -1) {
                users[userIndex].email = document.getElementById('profile-email').value;
                localStorage.setItem('users', JSON.stringify(users));
                profileModal.classList.add('hidden');
                alert('Profile updated');
            }
        }
    }

    // Blog Page Specific Functionality
    if (window.location.pathname.endsWith('blog.html')) {
        const topics = [
            "Bitcoin", "Ethereum", "Altcoins", "Blockchain", "DeFi",
            "NFTs", "Crypto News", "Trading", "Mining", "Regulations"
        ];

        const usernames = [
            "CryptoKing", "BlockchainBard", "DeFiDude", "NFTNerd", "MiningMaven",
            "TradingTitan", "AltcoinAce", "EthereumEnthusiast", "BitcoinBeliever", "RegulatorRanger"
        ];

        const keywords = {
            "Bitcoin": ["BTC", "halving", "mining", "Satoshi", "blockchain"],
            "Ethereum": ["ETH", "smart contracts", "DeFi", "gas fees", "layer 2"],
            "Altcoins": ["altseason", "memecoins", "utility tokens", "stablecoins", "privacy coins"],
            "Blockchain": ["consensus", "decentralization", "immutability", "smart contracts", "dApps"],
            "DeFi": ["yield farming", "liquidity pools", "DEX", "lending", "staking"],
            "NFTs": ["digital art", "collectibles", "metaverse", "royalties", "minting"],
            "Crypto News": ["market update", "regulation", "adoption", "partnership", "hack"],
            "Trading": ["technical analysis", "chart patterns", "indicators", "strategies", "risk management"],
            "Mining": ["ASIC", "GPU", "proof of work", "hash rate", "difficulty"],
            "Regulations": ["SEC", "compliance", "KYC", "AML", "taxes"]
        };

        function generateContent() {
            const sentences = [
                "The crypto market is wild right now.",
                "Blockchain tech is the real deal.",
                "DeFi could flip traditional finance.",
                "NFTs are blowing up—good or bad?",
                "Mining’s a power hog, no lie.",
                "Regulations might kill the vibe.",
                "Trading’s all about timing.",
                "Altcoins are a gamble worth taking.",
                "Ethereum’s got more than just hype.",
                "Bitcoin’s still the king of the hill."
            ];
            let content = "";
            for (let i = 0; i < 3; i++) {
                content += sentences[Math.floor(Math.random() * sentences.length)] + " ";
            }
            return content.trim();
        }

        function generatePosts(num) {
            const posts = [];
            for (let i = 0; i < num; i++) {
                const topic = topics[Math.floor(Math.random() * topics.length)];
                const keyword = keywords[topic][Math.floor(Math.random() * keywords[topic].length)];
                const title = `${keyword} in ${topic}: What’s Up?`;
                const content = generateContent();
                const author = usernames[Math.floor(Math.random() * usernames.length)];
                const timestamp = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleString();
                posts.push({ title, content, author, topic, timestamp });
            }
            return posts;
        }

        let posts = generatePosts(100);

        function renderPosts(postsToRender) {
            const postsContainer = document.getElementById('posts-container');
            if (!postsContainer) {
                console.error('Posts container not found');
                return;
            }
            postsContainer.innerHTML = '';
            postsToRender.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <p>By ${post.author} on ${post.timestamp}</p>
                `;
                postsContainer.appendChild(postDiv);
            });
        }

        function renderRecentPosts() {
            const recentPostsList = document.getElementById('recent-posts');
            if (!recentPostsList) {
                console.error('Recent posts list not found');
                return;
            }
            recentPostsList.innerHTML = '';
            const recentPosts = posts.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
            recentPosts.forEach(post => {
                const li = document.createElement('li');
                li.textContent = post.title;
                recentPostsList.appendChild(li);
            });
        }

        // Initial render
        renderPosts(posts);
        renderRecentPosts();

        // Show/hide post form
        const postForm = document.getElementById('post-form');
        if (localStorage.getItem('currentUser')) {
            postForm.classList.remove('hidden');
        }

        // Handle new post submission
        const createPostForm = document.getElementById('create-post-form');
        createPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;
            const topic = document.getElementById('post-topic').value;
            const author = localStorage.getItem('currentUser');
            const timestamp = new Date().toLocaleString();
            const newPost = { title, content, author, topic, timestamp };
            posts.unshift(newPost);
            renderPosts(posts);
            renderRecentPosts();
            createPostForm.reset();
        });

        // Search functionality
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const filteredPosts = posts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.author.toLowerCase().includes(query) ||
                post.topic.toLowerCase().includes(query)
            );
            renderPosts(filteredPosts);
        });
    }
});