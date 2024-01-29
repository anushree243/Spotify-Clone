// play and other buttons
let masterplay = document.getElementById("masterPlay"); // masterPlay is the main play Button
let duration = document.getElementById("duration"); // duration of song means how much is played
let audioElement = new Audio('song/0.mp3') // starting with 0th index audio

let songs = ['Stay with me', 'Everytime', 'Beautiful', 'Christmas Tree',
    'Call Me Maybe', "I'M Missing You", 'Heartbeat', 'Round and Round',
    'Dynamite', 'Reset'] // songs array

// on clicking play button
masterplay.addEventListener("click", () => { // when we click on masterPlay our song is played
    if (audioElement.paused || audioElement.duration <= 0) { // song is not played yet or not playing
        idx = (audioElement.src).charAt(27); //index of our song
        const idOfCurrentSong = document.getElementById(idx); // id of that song's image of play or pause 
        idOfCurrentSong.src = "pause icon.jpg"; // changing image to pause
        const img = document.getElementById('gif'); // getting our gif element
        img.style.opacity = '1'; // updating gif
        audioElement.play(); // playing song
        masterplay.innerHTML = '<img src="pause icon.jpg">' // updating masterPlay icon

    } else {
        idx = (audioElement.src).charAt(27);
        const idOfCurrentSong = document.getElementById(idx);
        idOfCurrentSong.src = "play green.png";
        masterplay.innerHTML = '<img src="play green.png">'
        const img = document.getElementById('gif');
        img.style.opacity = '0';
        audioElement.pause();
    }
})

// updating current time of audioElement
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); // progress of our song in percentage
    duration.value = progress; // updating our duration bar
})

// updating duration of song or current time of song
duration.addEventListener('input', () => {
    progress = duration.value; // tp update when user update it
    audioElement.currentTime = (progress * audioElement.duration) / 100; // updating song's time with duration bar
})

// making all button of song of play
function makeAllPlay() { // converting all song's icon to play
    Array.from(document.getElementsByClassName("play")).forEach(e => {
        // e is button image of every song
        e.children[0].src = "play green.png" //button's children is image and updating image's source
    })
}


// play individually from any play button of any song
Array.from(document.getElementsByClassName("play")).forEach(e => {
    e.addEventListener('click', (e) => {
        // e.target is img tag of every song
        // checking if button is play or pause
        if (e.target.src == 'http://127.0.0.1:5501/play%20green.png') {
            makeAllPlay();
            idx = e.target.id;
            bottomSongName = document.getElementById("bottomSongName");
            bottomSongName.innerHTML = songs[idx];
            e.target.src = 'pause icon.jpg';
            // src of song
            let str = 'song/' + idx + '.mp3';
            audioElement.src = str;
            const img = document.getElementById('gif');
            img.style.opacity = '1';
            audioElement.play();
            masterplay.innerHTML = '<img src="pause icon.jpg">'
        } else{
            makeAllPlay();
            masterplay.innerHTML = '<img src="play green.png">'
            const img = document.getElementById('gif');
            img.style.opacity = '0';
            audioElement.pause();
        }
    })
})

// JS for prevBtn 

// get prevBtn element
prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener('click', () => {
    idx = parseInt((audioElement.src).charAt(27));
    if (idx != 0) {
        idx -= 1;
        str = 'song/' + idx + '.mp3';
        if (audioElement.paused || audioElement.duration <= 0) {
            duration.value = 0;
            audioElement.src = str
            bottomSongName = document.getElementById("bottomSongName");
            console.log(bottomSongName);
            console.log(idx);
            bottomSongName.innerHTML = songs[idx];
        } else {
            duration.value = 0;
            audioElement.src = str
            audioElement.play();
            const idOfPreviousSong = document.getElementById(String(idx + 1));
            idOfPreviousSong.src = "play green.png";
            const idOfCurrentSong = document.getElementById(String(idx));
            idOfCurrentSong.src = "pause icon.jpg";
            const img = document.getElementById('gif');
            img.style.opacity = '1';
            bottomSongName = document.getElementById("bottomSongName");
            console.log(bottomSongName);
            console.log(idx);
            bottomSongName.innerHTML = songs[idx];
        }

    } else {
        if (audioElement.paused || audioElement.duration <= 0) {
            duration.value = 0;
            audioElement.currentTime = 0
        } else {
            duration.value = 0;
            str = 'song/' + idx + '.mp3';
            audioElement.currentTime = 0;
            audioElement.src = str;
            audioElement.play()
        }
    }
})

// get nextBtn element
nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener('click', () => {
    idx = parseInt((audioElement.src).charAt(27));
    if (idx != 9) {
        idx += 1;
        str = 'song/' + idx + '.mp3';
        if (audioElement.paused || audioElement.duration <= 0) {
            duration.value = 0;
            audioElement.src = str
            bottomSongName = document.getElementById("bottomSongName");
            bottomSongName.innerHTML = songs[idx];
        } else {
            duration.value = 0;
            audioElement.src = str
            audioElement.play();
            const idOfPreviousSong = document.getElementById(String(idx - 1));
            idOfPreviousSong.src = "play green.png";
            const idOfCurrentSong = document.getElementById(String(idx));
            idOfCurrentSong.src = "pause icon.jpg";
            const img = document.getElementById('gif');
            img.style.opacity = '1';
            bottomSongName = document.getElementById("bottomSongName");
            bottomSongName.innerHTML = songs[idx];
        }

    } else {
        if (audioElement.paused || audioElement.duration <= 0) {
            duration.value = 0;
            audioElement.currentTime = 0
        } else {
            duration.value = 0;
            str = 'song/' + idx + '.mp3';
            audioElement.currentTime = 0;
            audioElement.src = str;
            audioElement.play()
        }
    }
})

// ended is used for songs when they end
audioElement.addEventListener('ended', () => {
    idx = parseInt((audioElement.src).charAt(27));
    makeAllPlay();
    if (idx == 9) {
        const idOfCurrentSong = document.getElementById('0');
        audioElement.src = 'song/0.mp3';
        audioElement.play();
        idOfCurrentSong.src = 'pause icon.jpg';
        masterplay.children[0].src = 'pause icon.jpg'
        img = document.getElementById('gif');
        img.opacity = 1;
        bottomSongName = document.getElementById("bottomSongName");
        bottomSongName.innerHTML = songs[0];
    } else {
        const idOfCurrentSong = document.getElementById(String(idx + 1));
        audioElement.src = 'song/' + String(idx + 1) + '.mp3';
        audioElement.play();
        idOfCurrentSong.src = 'pause icon.jpg';
        masterplay.children[0].src = 'pause icon.jpg'
        img = document.getElementById('gif');
        img.opacity = 1;
        bottomSongName = document.getElementById("bottomSongName");
        bottomSongName.innerHTML = songs[idx + 1];
    }
})