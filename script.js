// Elements nav menu toggle for mobile
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Authentication related
const loginBtn = document.getElementById('loginBtn');
const modalLogin = document.getElementById('modalLogin');
const modalClose = document.getElementById('modalClose');
const showSignUpLink = document.getElementById('showSignUp');
const modalSignUp = document.getElementById('modalSignUp');
const modalSignUpClose = document.getElementById('modalSignUpClose');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const signUpUsername = document.getElementById('signUpUsername');
const signUpPassword = document.getElementById('signUpPassword');

const userInfoDiv = document.getElementById('userInfo');
const postsDiv = document.getElementById('posts');
const messageInput = document.getElementById('message');
const postBtn = document.getElementById('postBtn');
const authOnlyElements = document.querySelectorAll('.auth-only');

let currentUser = null;

// --- Modal open/close
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openLoginModal();
});

modalClose.addEventListener('click', () => {
  closeLoginModal();
});

modalSignUpClose.addEventListener('click', () => {
  closeSignUpModal();
});

showSignUpLink.addEventListener('click', (e) => {
  e.preventDefault();
  closeLoginModal();
  openSignUpModal();
});

showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  closeSignUpModal();
  openLoginModal();
});

function openLoginModal() {
  modalLogin.style.display = 'block';
}
function closeLoginModal() {
  modalLogin.style.display = 'none';
}
function openSignUpModal() {
  modalSignUp.style.display = 'block';
}
function closeSignUpModal() {
  modalSignUp.style.display = 'none';
}

// Close modal if click outside content
window.onclick = function(event) {
  if (event.target == modalLogin) closeLoginModal();
  if (event.target == modalSignUp) closeSignUpModal();
};

// --- Authentication Storage (simple demo with localStorage)
function saveUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  users[username] = password;
  localStorage.setItem('users', JSON.stringify(users));
}

function validateUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  return users[username] && users[username] === password;
}

// --- Sign Up
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = signUpUsername.value.trim();
  const password = signUpPassword.value.trim();
  if (!username || !password) {
    alert('Please fill username and password');
    return;
  }
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username]) {
    alert('Username already exists. Please choose another.');
    return;
  }
  saveUser(username, password);
  alert('Sign up successful! Please log in.');
  closeSignUpModal();
  openLoginModal();
});

// --- Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if (!validateUser(username, password)) {
    alert('Invalid username or password.');
    return;
  }
  currentUser = username;
  alert(`Welcome back, ${currentUser}!`);
  closeLoginModal();
  updateUIForLogin();
});

// --- Logout function
function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateUIForLogout();
}

// --- On page load check login status
document.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = savedUser;
    updateUIForLogin();
  } else {
    updateUIForLogout();
  }
});

// --- Update UI Functions
function updateUIForLogin() {
  // Store current user
  localStorage.setItem('currentUser', currentUser);
  loginBtn.textContent = 'Logout';
  loginBtn.removeEventListener('click', openLoginModal);
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
  authOnlyElements.forEach(e => e.style.display = '');
  userInfoDiv.textContent = `Logged in as: ${currentUser}`;
  loadPosts();
}

function updateUIForLogout() {
  loginBtn.textContent = 'Login';
  loginBtn.removeEventListener('click', logout);
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginModal();
  });
  authOnlyElements.forEach(e => e.style.display = 'none');
  userInfoDiv.textContent = '';
  postsDiv.innerHTML = '';
  messageInput.value = '';
}

// --- Forum Posting, Comments, Reactions

// Store posts in localStorage as array of objects
// Format: {id, user, message, reactions: {like: count}, comments: [{user, message}] }

function getPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
  const posts = getPosts();
  postsDiv.innerHTML = '';
  if (!posts.length) {
    postsDiv.innerHTML = '<p>No posts yet. Be the first!</p>';
    return;
  }
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');

    const header = document.createElement('div');
    header.classList.add('post-header');
    header.textContent = `${post.user}`;

    // Reaction container
    const reactionsDiv = document.createElement('div');
    reactionsDiv.classList.add('reactions');

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('reaction-btn');
    likeBtn.innerHTML = `👍 ${post.reactions.like || 0}`;
    likeBtn.title = 'Like this post';

    likeBtn.addEventListener('click', () => {
      post.reactions.like = (post.reactions.like || 0) + 1;
      savePosts(posts);
      loadPosts();
    });

    reactionsDiv.appendChild(likeBtn);
    header.appendChild(reactionsDiv);
    postEl.appendChild(header);

    const body = document.createElement('div');
    body.classList.add('post-body');
    body.textContent = post.message;
    postEl.appendChild(body);

    // Comments area
    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments');

    // Comments list
    if (post.comments && post.comments.length > 0) {
      post.comments.forEach(comment => {
        const c = document.createElement('div');
        c.classList.add('comment');
        c.innerHTML = `<strong>${comment.user}:</strong> ${comment.message}`;
        commentsDiv.appendChild(c);
      });
    }

    // Input for new comments
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';
    commentInput.classList.add('comment-input');

    const commentBtn = document.createElement('button');
    commentBtn.textContent = 'Comment';
    commentBtn.classList.add('comment-btn');

    commentBtn.addEventListener('click', () => {
      const text = commentInput.value.trim();
      if (!text) return;
      if (!post.comments) post.comments = [];
      post.comments.push({ user: currentUser, message: text });
      savePosts(posts);
      loadPosts();
    });

    commentsDiv.appendChild(commentInput);
    commentsDiv.appendChild(commentBtn);

    postEl.appendChild(commentsDiv);

    postsDiv.appendChild(postEl);
  });
}

// Post message
postBtn.addEventListener('click', () => {
  const msg = messageInput.value.trim();
  if (!msg) {
    alert('Please write a message before posting.');
    return;
  }
  let posts = getPosts();
  const newPost = {
    id: Date.now(),
    user: currentUser,
    message: msg,
    reactions: {},
    comments: []
  };
  posts.unshift(newPost);
  savePosts(posts);
  messageInput.value = '';
  loadPosts();
});

// --- Scroll slider buttons
function slideLeft(id, btnLeftId, btnRightId) {
  const slides = document.getElementById(id);
  const btnLeft = document.getElementById(btnLeftId);
  const btnRight = document.getElementById(btnRightId);

  btnLeft.addEventListener('click', () => {
    slides.scrollBy({ left: -300, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    slides.scrollBy({ left: 300, behavior: 'smooth' });
  });
}

slideLeft('slides', 'left', 'right');
slideLeft('bookSlides', 'bookLeft', 'bookRight');

// --- Daily Quote (simple hardcoded demo)
const dailyQuotes = [
  '“It is what you read when you don’t have to that determines what you will be when you can’t help it.” – Oscar Wilde',
  '“There is no friend as loyal as a book.” – Ernest Hemingway',
  '“Books are a uniquely portable magic.” – Stephen King',
  '“A room without books is like a body without a soul.” – Cicero'
];

function loadQuote() {
  let index = new Date().getDate() % dailyQuotes.length;
  document.getElementById('dailyQuote').textContent = dailyQuotes[index];
}

loadQuote();
