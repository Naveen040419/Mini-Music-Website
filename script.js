// Filter the songs...
let currentIndex = 0;

let selectedPlaylist = null;

const genreFilter = document.getElementById('genreFilter');
const songsButtons = document.querySelectorAll('.song-btn');

const songCard_Heading = document.querySelector('.song-card h3');
const songCard_ParaGraph = document.querySelector('.song-card p');
const actionControls = document.querySelector('.action-controls');


const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const addToPlaylistBtn = document.getElementById('addToPlaylistBtn');


const playlist_Input = document.querySelector('.playlist-form input');
const playlist_Submit = document.querySelector('.playlist-form button');
const playlist_Container = document.querySelector('.playlists');


const themeToggle = document.getElementById("themeToggle");
const bodyClass = document.body; // ✅ Correct way to get the <body>
const leftPanel = document.querySelector('.left-panel');
const centerPanel = document.querySelector('.center-panel');
const rightPanel = document.querySelector('.right-panel');


window.addEventListener("DOMContentLoaded", () => {
  themeToggle.checked = false; // or true if you want default dark
  bodyClass.classList.add("light-theme");
});

// Filter the songs based on genre selection.
genreFilter.addEventListener("change", function(){

    const selectedGenre = genreFilter.value.toLowerCase();

    songsButtons.forEach((button)=>{
        if( button.classList.contains(selectedGenre) || selectedGenre === "all" ){
            button.style.display = "block";
        }
        else{
            button.style.display = "none";
        }
    })
});

// display the song using the buttons.

songsButtons.forEach((button) => {
    button.addEventListener("click", function () {
        displaySong(button);
    });
});

function displaySong(button){

        currentIndex = Array.from(songsButtons).indexOf(button);

        songCard_Heading.textContent = button.textContent;
        songCard_ParaGraph.textContent = button.dataset.genre || "Unknown Genre";

        actionControls.style.display = "flex";
        console.log("Current Index: ", currentIndex);
}


// Change the song using the next and previous buttons.

prevBtn.addEventListener("click", function(){
    currentIndex = (currentIndex -1 + songsButtons.length) % songsButtons.length;
    songsButtons[currentIndex].click();
});

nextBtn.addEventListener("click", function(){
    currentIndex = (currentIndex  + 1 ) % songsButtons.length;
    songsButtons[currentIndex].click();
});


// Lets Create a playlist.

playlist_Submit.addEventListener("click", createPlaylist);

function createPlaylist(event){
    event.preventDefault();

    const playlistName = playlist_Input.value.trim();
    if( playlistName === ""){
        alert("please enter a playlist name");
        return;
    }else{

        const playlistdiv = document.createElement('div');
        playlistdiv.classList.add('playlist');
        playlistdiv.textContent = playlistName;
        
        playlist_Container.appendChild(playlistdiv);
        playlist_Input.value = ""; // Clear input
    }
}


// Add songs to the playlist.

playlist_Container.addEventListener("click", function(event){
    event.preventDefault();
    const target = event.target;

    // Only if it's a playlist
    if(target.classList.contains('playlist')){
        // Highlight it
        document.querySelectorAll('.playlist').forEach(p => p.classList.remove('selected'));
        target.classList.add('selected');

        // Store reference
        selectedPlaylist = target;

        // Optionally, show songs (if maintaining data structure for each)
        console.log("Selected playlist:", selectedPlaylist.textContent);
    }
});

addToPlaylistBtn.addEventListener("click", function(){
    if (!selectedPlaylist) {
        alert("Please select a playlist first!");
        return;
    }

    const currentSong = songsButtons[currentIndex].textContent;

    // Find song list container
    let songList = selectedPlaylist.querySelector(".songs-list");

    // If not present, create it
    if (!songList) {
        songList = document.createElement("div");
        songList.classList.add("songs-list");
        selectedPlaylist.appendChild(songList);
    }

    // Prevent duplicate songs in playlist
    const exists = Array.from(songList.children).some(
        btn => btn.textContent === currentSong
    );
    if (exists) {
        alert("Song already in playlist!");
        return;
    }

    // Add song button to playlist
    const songBtn = document.createElement("button");
    songBtn.textContent = currentSong;
    songBtn.classList.add("playlist-song-btn"); // Use a different class

    songList.appendChild(songBtn);
});


// Add Functionality for dark mode...

themeToggle.addEventListener('change', function() {
    if (themeToggle.checked) {
        bodyClass.classList.remove('light-theme');
        bodyClass.classList.add('dark-theme');

        leftPanel.style.backgroundColor = 'rgb(81, 79, 79)';
        centerPanel.style.backgroundColor = 'rgb(81, 79, 79)';
        rightPanel.style.backgroundColor = 'rgb(81, 79, 79)';

    } else {
        bodyClass.classList.remove('dark-theme');
        bodyClass.classList.add('light-theme');

        leftPanel.style.backgroundColor = "#7ec9f3";
        centerPanel.style.backgroundColor = "#7ec9f3";
        rightPanel.style.backgroundColor = "#7ec9f3";
    }
});





