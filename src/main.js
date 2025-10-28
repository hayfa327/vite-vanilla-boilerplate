import './style.css'

const containerEl = document.getElementById('app')

const createImage = (src) => {
  const imageEl = document.createElement('img')
  imageEl.src = src
  containerEl.appendChild(imageEl)
}

const init = () => {
  fetch('https://image-feed-api.vercel.app/api/images?page=1')
    .then(resp => resp.json())
    .then(json => json.data.forEach(img => createImage(img.image_url)))
}

init()

