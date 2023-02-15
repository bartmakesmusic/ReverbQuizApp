/// / QUERY SELECTORS ////

// Menu navigation

const submitFormElement = document.getElementById("form-container");
const startBtn = document.querySelector("#startBtn");
const startBtnVisibility = document.getElementById('startButton');

var imie;

const nextBtn = document.querySelector('#nextBtn');
const finishBtn = document.querySelector('#finishBtn');
const testOne = document.querySelector('#testOne');
const testTwo = document.querySelector('#testTwo');
const testThree = document.querySelector('#testThree');

const nextBtnVisibility = document.getElementById('nextButton');
const finishBtnVisibility = document.getElementById('finishButton');

const testChoice = document.getElementById('testChoice');
const titleWelcome = document.getElementById('titleWelcome');
const titleAnswer = document.getElementById('titleAnswer');

// Sample Player
const musicPlayer = document.getElementById('sampleChoice');
const playBtnOne = document.querySelector('#playOne');
const playBtnTwo = document.querySelector('#playTwo');

const answerA = document.querySelector("#answerA");
const answerB = document.querySelector("#answerB");

const progressBar = document.getElementById('myProgress');

const audioOne = document.querySelector('#audioOne');
const audioTwo = document.querySelector('#audioTwo');


// Title
const audioTitle = document.querySelector('.music__title');


// array for random number generator
var chosenNumbers = [];

// samples
let sample;
let sampleIndex = getRandomNumber();
let currentSampleIndex;

var testNumber;

// progress bar declaration

const elem = document.getElementById("myBar");
var width = 0;

let questionIndex = 0;

var sampleSet = '';

var answerArray = [];

/// / FUNCTIONS ////

// update UI with current sample
function loadSample(sample) {

    audioOne.src = `${sample.audioA}`;
    audioTwo.src = `${sample.audioB}`;
    currentSampleIndex = `${sample.title}`;

}

// check if sample is playing
function isAudioPlaying() {
    return musicPlayer.classList.contains('playing');
}

// play audio of current sample
function playAudioOne() {
    musicPlayer.classList.add('playing');
    playBtnOne.querySelector('i').classList.remove('ph-play-circle');
    playBtnOne.querySelector('i').classList.add('ph-pause-circle');
    audioOne.play();
    audioTwo.pause();
    
}

// pause audio of current sample
function pauseAudioOne() {
    musicPlayer.classList.remove('playing');
    playBtnOne.querySelector('i').classList.add('ph-play-circle');
    playBtnOne.querySelector('i').classList.remove('ph-pause-circle');
    audioOne.pause();
}

// play audio of current sample
function playAudioTwo() {
    musicPlayer.classList.add('playing');
    playBtnTwo.querySelector('i').classList.remove('ph-play-circle');
    playBtnTwo.querySelector('i').classList.add('ph-pause-circle');
    audioTwo.play();
    audioOne.pause();
}

// pause audio of current sample
function pauseAudioTwo() {
    musicPlayer.classList.remove('playing');
    playBtnTwo.querySelector('i').classList.add('ph-play-circle');
    playBtnTwo.querySelector('i').classList.remove('ph-pause-circle');
    audioTwo.pause();
}

// when sample has finished playing
audioOne.onended = function() {
    musicPlayer.classList.remove('playing');
    playBtnOne.querySelector('i').classList.add('ph-play-circle');
    playBtnOne.querySelector('i').classList.remove('ph-pause-circle');
}; 

audioTwo.onended = function() {
    musicPlayer.classList.remove('playing');
    playBtnTwo.querySelector('i').classList.add('ph-play-circle');
    playBtnTwo.querySelector('i').classList.remove('ph-pause-circle');
}; 

// Load samples from "server"
async function retrieveSamplesFromServer(sampleSet) {
    await fetch(sampleSet)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            sample = data.samples;
            loadSample(sample[sampleIndex]);
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Function to generate a random number from 1 to 50, excluding previously chosen numbers
function getRandomNumber() {
    let num;
    do {
      num = Math.floor(Math.random() * 5) + 0;
    } while (chosenNumbers.includes(num));
    chosenNumbers.push(num);
    return num;
}

// Progress Bar

function moveProgressBar() {

    if (width >= 100) {
        width = 0;
    } else {
        width += 20;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
    }
}

function resetProgressBar() {
    elem.style.width = 0 + "%";
    elem.innerHTML = 0 + "%";
    width = 0;
}

function hideMainMenu() {
    titleWelcome.classList.add('hide');
    titleAnswer.classList.remove('hide');
    testChoice.classList.add('hide');
    musicPlayer.classList.remove('hide');
    progressBar.classList.remove('hide');
    //nextBtnVisibility.classList.remove('hide');
}

function showMainMenu() {
    submitFormElement.classList.add('hide');
    titleWelcome.classList.remove('hide');
    titleAnswer.classList.add('hide');
    testChoice.classList.remove('hide');
    musicPlayer.classList.add('hide');
    progressBar.classList.add('hide');
    finishBtnVisibility.classList.add('hide');
    titleAnswer.innerText = 'Wybierz Odpowiedź';
}

function sendInfoToDiscord() {
    
    // get the message from the user
    const message = {imie, answerArray, testNumber};

    console.log(JSON.stringify({message}));
    // send the message to the backend using fetch
    fetch('https://reverbquizbackend.onrender.com/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : 'https://reverbquizbackend.onrender.com'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        // display a confirmation message to the user
        alert(data.message);
    })
    .catch(error => {
        console.error(error);
    });

}

/// / EVENT LISTENERS ////

startBtn.addEventListener('click', () => {

    imie = document.getElementById("imie").value;
    var nameError = document.getElementById("nameError");
    nameError.innerHTML = "";
    var isValid = true;
    if (imie == "") {
        nameError.innerHTML = "Name is required";
        isValid = false;
        return false;
    }
    startBtnVisibility.classList.add('hide');
    showMainMenu();
    return true;

});

playBtnOne.addEventListener('click', () => {
    isAudioPlaying() ? pauseAudioOne() : playAudioOne();
});

playBtnTwo.addEventListener('click', () => {
    isAudioPlaying() ? pauseAudioTwo() : playAudioTwo();
});

answerA.addEventListener('click', () => {
    nextBtnVisibility.classList.remove('hide');
    let currentAnswer = ('A' + currentSampleIndex);
    answerArray.push(currentAnswer);

});

answerB.addEventListener('click', () => {
    nextBtnVisibility.classList.remove('hide');
    let currentAnswer = ('B' + currentSampleIndex);
    answerArray.push(currentAnswer);

});

nextBtn.addEventListener('click', () => {
    
    nextBtnVisibility.classList.add('hide');
    moveProgressBar();

    if(questionIndex >= 4) {
        
        questionIndex = 0;
        chosenNumbers.length = 0;
        musicPlayer.classList.add('hide');
        finishBtnVisibility.classList.remove('hide');
        titleAnswer.innerText = 'Dziękujemy za wykonanie testu!';
        //console.log(answerArray);

    } else {
        questionIndex++;
    }

    sampleIndex = getRandomNumber();
    console.log(chosenNumbers);
    retrieveSamplesFromServer(sampleSet);

    console.log(questionIndex);
    
});

finishBtn.addEventListener('click', () => {

    showMainMenu();
    resetProgressBar();
    console.log(imie);
    sendInfoToDiscord();
    answerArray.length = 0;

});


testOne.addEventListener('click', () => {
    
    chosenNumbers.length = 0;
    sampleIndex = getRandomNumber();
    sampleSet = 'audioOne.json';
    testNumber = 'Test Pierwszy';
    retrieveSamplesFromServer(sampleSet);
    hideMainMenu();

});

testTwo.addEventListener('click', () => {

    chosenNumbers.length = 0;
    sampleIndex = getRandomNumber();
    sampleSet = 'audioTwo.json';
    testNumber = 'Test Drugi';
    retrieveSamplesFromServer(sampleSet);
    hideMainMenu();

});

testThree.addEventListener('click', () => {

    chosenNumbers.length = 0;
    sampleIndex = getRandomNumber();
    sampleSet = 'audioThree.json';
    testNumber = 'Test Trzeci';
    retrieveSamplesFromServer(sampleSet);
    hideMainMenu();
    
});


