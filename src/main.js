import './style.css'

const sentences = [{
    first: 'This is the first sentece',
    second: ', this is the second.',
    third: 'This is the third.'
}, {
    first: 'This is first ex 2',
    second: ', this is the second ex 2.',
    third: 'This is the third ex 2.'
}, {
    first: 'This is the first sentece ex3',
    second: ', this is the second. ex 3',
    third: 'This is the third ex3.'
}]

const containerEl = document.getElementById('app')

const createImage = (src) => {
    const imageEl = document.createElement('img')
    imageEl.src = src
    containerEl.appendChild(imageEl)
}

const createText = (whichString) => {

    //Get one random object from sentences array
    const randomIndex = Math.floor(Math.random() * sentences.length);
    let currentSentece = sentences[randomIndex]

    //Create HTML p
    const textEl = document.createElement('p')

    //This decides what string in the object should be used based on the argument when the function is called
    //Potential bug: the first/second/third sentences are not always from the same object. 
    let outputString = ''
    if (whichString === 'first') {
        outputString = currentSentece.first
    } else if (whichString === 'second') {
        outputString = currentSentece.second
    } else {
        outputString = currentSentece.third
    }

    //set p element text to chosen outputstring
    textEl.innerText = outputString

    containerEl.appendChild(textEl)
}

const init = () => {
    fetch('https://image-feed-api.vercel.app/api/images?page=1')
        .then(resp => resp.json())
        .then(json => {
            const images = json.data;
            const randomIndex1 = Math.floor(Math.random() * images.length);
            const randomIndex2 = Math.floor(Math.random() * images.length);
            const randomIndex3 = Math.floor(Math.random() * images.length);
            //this is not fully working (dublettes of the images can appear)
            //Also does not work if image is not at the start or the end of a sentence
            createText('first');
            createImage(images[randomIndex1].image_url);
            createText('second');
            createImage(images[randomIndex2].image_url);
            createText('third');
            createImage(images[randomIndex3].image_url);

        });
}

init()