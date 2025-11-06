 
document.addEventListener('DOMContentLoaded', () => {
  const bodyChristmas = document.body;

  const themeButtonChristmas = document.createElement('button');
  themeButtonChristmas.textContent = 'Christmas'
  themeButtonChristmas.classList.add('theme-btn'); 

  document.body.appendChild(themeButtonChristmas);

  let mode = 'default'; 

  const christmasTheme = () => {
    bodyChristmas.classList.add('christmas-theme')
    mode = 'christmas'
  }

  const removeChristmas = () => {
    bodyChristmas.classList.remove('christmas-theme')
    mode = 'default'; 
  }

  const switchThemeChristmas = () => {
    if (mode === 'default') {
      christmasTheme()
    } else if (mode === 'christmas') {
      removeChristmas()
    }
  }

  themeButtonChristmas.addEventListener('click', switchThemeChristmas)
});
 


 

