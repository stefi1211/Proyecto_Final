// updateNavBar.js

document.addEventListener('DOMContentLoaded', () => {
  const userName =
    sessionStorage.getItem('username') ||
    localStorage.getItem('username') ||
    null;

 
  const userLink = document.getElementById('user-link');

  if (userName) {
    
    userLink.innerHTML = `<strong> Hola! </strong> ${userName}`;
    userLink.href = 'profile.html'; 
  } else {
    
    userLink.textContent = 'Login';
    userLink.href = 'login.html';
  }
});
