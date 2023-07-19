// main.js

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    init();
});

function init() {
    // Initialize your ARG website here
    // This could include setting up event listeners, loading data, etc.
}

// Function to handle user interaction
function handleUserInteraction(event) {
    // Handle user interaction here
    // This could include updating the DOM, playing audio or video, etc.
}

// Function to load data
function loadData() {
    // Load data here
    // This could include making a fetch request to a server, loading data from local storage, etc.
}

// Function to update the DOM
function updateDOM() {
    // Update the DOM here
    // This could include adding or removing elements, updating element content, etc.
}

// Function to play audio
function playAudio(filename) {
    let audio = new Audio(`../audio/${filename}`);
    audio.play();
}

// Function to play video
function playVideo(filename) {
    let video = document.getElementById('video');
    video.src = `../video/${filename}`;
    video.play();
}