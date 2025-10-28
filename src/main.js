import './style.css'
const containerEl = document.getElementById(‘app’)
const createImage = (src) => {
  const imageEl = document.createElement(‘img’)
  imageEl.src = src;
  containerEl.appendChild(imageEl)
}

const init = () => {
  fetch('https://image-feed-api.vercel.app/api/images/e8cd3ffd-794c-4ec6-b375-7788dbb14275')
    .then(resp => resp.json())
    .then(json => createImage(json.image_url))
}

init();
