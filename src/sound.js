const musicHelloweenSrc = 'src/halloween-background-music-425891.mp3';

export function renderMusicPlayer() {
    const playerContainer = document.getElementById('player-container');
    playerContainer.classList.add('playPauseBtn');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-circle-play');
    playerContainer.appendChild(icon);

    const audio = document.createElement('audio');
    audio.src = musicHelloweenSrc;
    playerContainer.appendChild(audio);

    // Variable to keep track of the music state
    let isPlaying = false;

    playerContainer.addEventListener('click', () => {
        if (isPlaying){
            // If music is playing, pause it
            audio.pause();
            // Change icon class for play icon
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
        } else {
            // If music is pausing, play it
            audio.play();
            // Change icon class for pause icon
            icon.classList.remove('fa-circle-play');
            icon.classList.add('fa-circle-pause');
        }
        isPlaying = !isPlaying;
    })

}

