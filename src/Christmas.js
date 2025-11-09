import { switchMusic } from './sound.js';

document.addEventListener('DOMContentLoaded', () => {
  const bodyChristmas = document.body;
  const appTitle = document.getElementById('app-title'); 

  const themeButtonChristmas = document.createElement('button');
  themeButtonChristmas.textContent = 'Christmas'
  themeButtonChristmas.classList.add('theme-btn'); 

  document.body.appendChild(themeButtonChristmas);

  let mode = 'default'; 

  const christmasTheme = () => {
    bodyChristmas.classList.add('christmas-theme');
    mode = 'christmas';
    emojisAnimation();

    // Change title for Christmas mode
    switchMusic('christmas');
    if (appTitle) {
      appTitle.innerHTML = `🎄 Merry Christmas, ${getUserName()} 🎄`;
    }
    themeButtonChristmas.textContent = 'Halloween';
  }


  const removeChristmas = () => {
    bodyChristmas.classList.remove('christmas-theme');
    mode = 'default'; 
    emojisAnimation();

    //  Revert title to Halloween theme
    switchMusic('halloween');
    if (appTitle) {
      appTitle.innerHTML = `🎃 Future Predictions for ${getUserName()} 🎃`;
    }
    themeButtonChristmas.textContent = 'Christmas';
  }

  // Helper function to retrieve username from modal or stored data
  const getUserName = () => {
    const usernameInput = document.getElementById('usero');
    if (usernameInput && usernameInput.value.trim()) {
      return usernameInput.value.trim();
    }

    // If modal is already closed, get name from title if it exists
    const currentTitle = appTitle?.innerText || "";
    const match = currentTitle.match(/for (.+) 🎃/);
    return match ? match[1] : "User";
  };

  const switchThemeChristmas = () => {
    if (mode === 'default') {
      christmasTheme()
    } else if (mode === 'christmas') {
      removeChristmas()
    }
  }

  themeButtonChristmas.addEventListener('click', switchThemeChristmas);
 
  emojisAnimation();
 });