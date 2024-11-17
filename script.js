let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice= document.querySelector("#voice");

function speak(text) {
    if (!('speechSynthesis' in window)) {
        console.error('SpeechSynthesis API is not supported in this browser.');
        return;
    }

    if (!text) {
        console.error('Text to speak is empty.');
        return;
    }

    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1; 
    text_speak.pitch = 1; 
    text_speak.volume = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good morning...");
    } else if (hours >= 12 && hours < 17) {
        speak("Good afternoon...");
    } else {
        speak("Good evening...");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;

    if (event.results[currentIndex].isFinal) {
        content.textContent = transcript;
        takeCommand(transcript);
    }
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display="none"
    voice.style.display="block"

});

function takeCommand(message) {
    btn.style.display="flex"
    voice.style.display="none"
    if (message.toLowerCase().includes("hello")||message.toLowerCase().includes("hey")) {
        speak("Hello! How can I help you?");
    }
    else if(message.toLowerCase().includes("who are you")){
        speak("i am a virtual assistance created by sam khan sir")
    }
    else if(message.toLowerCase().includes("open youtube")){
        speak("opening youtube")
        window.open("https://www.youtube.com", "_blank")
    }
    else if(message.toLowerCase().includes("open instagram")){
        speak("opening instagram")
        window.open("https://www.instagram.com", "_blank")
    }
    else if(message.toLowerCase().includes("open facebook")){
        speak("opening facebook")
        window.open("https://www.facebook.com", "_blank")
    }
    else if(message.toLowerCase().includes("open google")){
        speak("opening google")
        window.open("https://www.google.com", "_blank")
    }
    else if(message.toLowerCase().includes("open github")){
        speak("opening github")
        window.open("https://www.github.com", "_blank")
    }
    else if(message.toLowerCase().includes("open calculator")){
        speak("opening calculator")
        window.open("calculator://")
    }
    else if(message.toLowerCase().includes("open whatsApp")){
        speak("opening whatsApp")
        window.open("WhatsApp://")
    }
    else if(message.toLowerCase().includes("open camera")){
        speak("opening camera")
        window.open("Camera://")
    }
    
    else if (message.toLowerCase()) {
        let finaltxt="This is what I found on the internet regarding " + message.replace("Tony","")
        speak(finaltxt);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message.replace("Tony",""))}`);
    }
 else {
        speak("Sorry, I didn't understand that.");
    }
}
