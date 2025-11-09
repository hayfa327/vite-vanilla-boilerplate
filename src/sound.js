// Paths for Halloween and Christmas music
const musicHalloweenSrc = 'src/halloween-background-music-425891.mp3';
const musicCristmasSrc = 'src/we-wish-you-a-merry-christmas-265800.mp3';

// Global variables for audio, icon, and play state
let audio;
let icon;
let isPlaying = false;

// Function to create and render the music player
export function renderMusicPlayer() {
    const playerContainer = document.getElementById('player-container');
    playerContainer.classList.add('playPauseBtn');

    // Create the play/pause icon
    icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-circle-pause'); // initial state is playing
    playerContainer.appendChild(icon);

    // Create the audio element and start with Halloween music
    audio = document.createElement('audio');
    audio.src = musicHalloweenSrc;
    audio.loop = true;
    playerContainer.appendChild(audio);

    // Try to play immediately
    audio.play().catch((err) => {
      console.log('Autoplay blocked:', err);
    });
    isPlaying = true; // music is playing

    // Toggle play/pause when clicking the player container
    playerContainer.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause(); // pause the music
            icon.classList.replace('fa-circle-pause', 'fa-circle-play'); // update icon
        } else {
            audio.play().catch(err => console.log('Autoplay blocked:', err)); // play music
            icon.classList.replace('fa-circle-play', 'fa-circle-pause'); // update icon
        }
        isPlaying = !isPlaying; // update state
    });
}

// Function to switch music immediately when theme changes
export function switchMusic(theme) {
    if (!audio) return;

    // Change the source depending on theme
    audio.src = theme === 'christmas' ? musicCristmasSrc : musicHalloweenSrc;

    // Play immediately
    audio.play().catch(err => console.log('Autoplay blocked:', err));
    icon.classList.replace('fa-circle-play', 'fa-circle-pause'); // make icon show "playing"
    isPlaying = true; // update state
}
