//----------------------------- light theme button ----------------------------- 

// Creates a slider button
const themeButtonLabelEl = document.createElement('label')
themeButtonLabelEl.classList.add('switch')
const themeButtonInputEl = document.createElement('input')
themeButtonInputEl.type = 'checkbox'
const themeButtonSpanEl = document.createElement('span')
themeButtonSpanEl.classList.add('slider', 'round')
themeButtonLabelEl.appendChild(themeButtonInputEl)
themeButtonLabelEl.appendChild(themeButtonSpanEl)

const headerEl = document.querySelector('header')
headerEl.appendChild(themeButtonLabelEl)

const bodyEl = document.body;
let theme = 'default' // sets the current theme to default

export const lightTheme = () => {
  bodyEl.classList.add('light-theme')
  theme = 'theme'
}

export const reverseLightTheme = () => {
  bodyEl.classList.remove('light-theme')
  theme = 'default'
}

export const switchTheme = () => {
  if (theme === 'default') {
    //light theme function that overrides the current css
    //and sets theme to 'theme' so the switchTheme function reacts correctly
    lightTheme();
  } else if (theme === 'theme') {
    //sets css values back to the initial values. 
    reverseLightTheme();
  }
}

themeButtonInputEl.addEventListener('click', switchTheme)