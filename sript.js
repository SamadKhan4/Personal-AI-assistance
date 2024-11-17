let btn=document.querySelector("#btn")
let content=document.querySelector("#content")

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
    text_speak.rate =1; 
    text_speak.pitch = 1.5; 
    text_speak.volume = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours < 12){
        speak("good morning....")
    }
    else if(hours>=12 && hours<=5){
        speak("good afternoon....")
    }
    else{
        speak("good evening.....")
    }
}
window.addEventListener('load',()=>{
     wishMe()
})
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition =new SpeechRecognition()
recognition.onresult=((event)=>{
    let currentIndex = event.resultIndex 
    let transcript = event.results[currentIndex][0].transcript
    content.textContent = transcript
    takeCommand(transcript)
})
btn.addEventListener("click" ,()=>{
    recognition.start()
})
function takeCommand(message){
    if (message.toLowerCase().includes("hello")){
        speak("hello how can i help you ?")
    }
}