// Header Functionality
const hamburger = document.querySelector('.hamburger');
const dropdownContent = document.querySelector('.dropdown-content');
const authBtn = document.getElementById('auth-btn');
const authForm = document.getElementById('auth-form');
const loginSubmit = document.getElementById('login-submit');
const signupSubmit = document.getElementById('signup-submit');
const profileModal = document.getElementById('profile-modal');
const saveProfile = document.getElementById('save-profile');
const closeButtons = document.querySelectorAll('.close');

// Check if a user is logged in
let currentUser = localStorage.getItem('currentUser');
if (currentUser) {
    authBtn.textContent = 'Profile';
    const profileLink = document.createElement('a');
    profileLink.href = '#';
    profileLink.textContent = 'Profile';
    profileLink.addEventListener('click', showProfileModal);
    dropdownContent.appendChild(profileLink);
} else {
    authBtn.textContent = 'Login';
}

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    dropdownContent.classList.toggle('active');
});

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
        if (!document.querySelector('.dropdown-content a[href="#"]')) {
            const profileLink = document.createElement('a');
            profileLink.href = '#';
            profileLink.textContent = 'Profile';
            profileLink.addEventListener('click', showProfileModal);
            dropdownContent.appendChild(profileLink);
        }
        authForm.classList.add('hidden');
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