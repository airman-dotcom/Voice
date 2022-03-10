window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let arr = []

if ('SpeechRecognition' in window) {
  console.log('supported speech')
} else {
  console.error('speech not supported')
}
let recognition = new window.SpeechRecognition();

recognition.continuous = true;

let user = false;
let speak = true;
let num = 0;

function Speak(string) {
  const utterance = new SpeechSynthesisUtterance(string);
  utterance.rate = 1;
  speechSynthesis.speak(utterance)
}

recognition.onresult = (event) => {
  let speech = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
  if (speech == "what time is it") {
    const date = new Date()
    let time = date.getHours();
    let a;
    if (time > 12) {
      time = time - 12;
      a = "pm"
    } else {
      a = "am"
    }
    let min = date.getMinutes();
    let b = `It is ${time} ${min} ${a}`;
    Speak(b)
  }
  if (speech.includes("who am i")) {
    Speak("I don't know Who you are. Say your name so i can save it")
    user = true;
  }
  if (speech.includes("names")) {
    Speak(arr)
  }
  if (speech.includes("i am")) {
    if (user) {
      let index = speech.indexOf("m");
      index++
      let new_s = speech.slice(index);
      if (new_s == "armon" || new_s == "online" || new_s == "m arman") {
        new_s = "arman";
      }

      Speak(`Oh okay your name is ${new_s}`)
      arr.push(new_s)
      user = false;
    }
  }
  if (speech.includes("hi")) {
    if (speak) {
      speak = false;
      Speak("Hello")
      speak = true;
    }
  }
  if (speech.includes("what is the capital of")) {
    console.log(1)
    let index = speech.indexOf("f")
    index++;
    let new_s = speech.slice(index);
    const send_data = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log(new_s)
    new_s = new_s.trim()
    fetch(`https://restcountries.com/v2/name/${new_s}`, send_data)
      .then(response => response.json())
      .then(function (json) {
        Speak(`the capital of ${new_s} is ${json[0].capital}`)
      })
  }
  if (speech.includes("what continent is") || speech.includes("what region is")) {
    let index = speech.indexOf("s");
    index++;
    speech = speech.slice(index)
    speech = speech.trim();
    index = speech.indexOf(" ")
    let new_s = speech.slice(0, index)
    const send_data = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log(new_s)
    new_s = new_s.trim()
    fetch(`https://restcountries.com/v2/name/${new_s}`, send_data)
      .then(response => response.json())
      .then(function (json) {
        Speak(`${new_s} is in the region of ${json[0].region}`);
      })
  }
  if (speech.includes("what is the national anthem of")) {
    let index = speech.indexOf("f")
    index++;
    let new_s = speech.slice(index).trim();
    const data = {
      country: new_s
    }
    const send_data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch("/anthem", send_data)
      .then(response => response.json())
      .then(function (json) {
        console.log(1)
        document.getElementById("2").style.display = "block";
        document.getElementById("2").src = `https://youtube.com/embed/${Object.values(json)[0]}?autoplay=1`

      })
  } if (speech.includes("reload")) {
    window.location.reload();
  }
  if (speech.includes("play")) {
    let index = speech.indexOf("y")
    index++;
    let new_s = speech.slice(index)
    const data = {
      words: new_s
    }
    const send_data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch("/play", send_data)
      .then(response => response.json())
      .then(function (json) {
        document.getElementById("2").style.display = "block";
        document.getElementById("2").src = `https://youtube.com/embed/${Object.values(json)[0]}?autoplay=1`;
      })
  }
  if (speech.includes("stop")){
    document.getElementById("2").style.display = "none";
    document.getElementById("2").src = "";
  }
  if (speech.includes("discord")){
    window.location.href = "https://discord.com/channels/@me"
  }
  if (speech.includes("thank you")){
    Speak("you're welcome")
  }
  if (speech.includes("your name is")){
    let index = speech.indexOf("s");
    index++;
    const new_s = speech.slice(index);
    Speak(`Oh ok my name is ${new_s}`)
  }
  if (speech.includes("add one")){
    num++;
    Speak(`You have now completed ${num}`);
  }
  if (speech == "numb"){
    Speak(`You have completed ${num}`)
  }
  console.log(speech)
}
document.addEventListener("click", () => {
  recognition.start();
})