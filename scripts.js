window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const chooseContainer = document.getElementById('choose-container'),
      checkContainer = document.getElementById('check-container'),
      languageBtns = document.getElementById('language-btns'),
      correctIcon = document.getElementById('correct'),
      incorrectIcon = document.getElementById('incorrect'),
      checkBtn = document.getElementById('check-btn'),
      phrase = document.getElementById('phrase'),
      recognition = new SpeechRecognition(),
      eng = [
        'Hello',
        'Goodbye',
        'Nice to meet you',
        'I am from London',
        'Where are you from',
        'How old are you'
      ],
      rus = [
        'Привет',
        'Пока',
        'Приятно познакомиться',
        'Я из Лондона',
        'Откуда ты',
        'Сколько тебе лет'
      ],
      deu = [
        'Hallo',
        'Auf Wiedersehen',
        'Freut mich',
        'Ich bin aus London',
        'Woher kommst du',
        'Wie alt bist du'
      ];

let phrases;

languageBtns.addEventListener('click', chooseLang);
checkBtn.addEventListener('click', startCheck);

function displayIcon(icon) {
  if (icon) {
    correctIcon.classList.remove('invisible');
    phrase.innerHTML = '';

    setTimeout(function () {
      correctIcon.classList.add('invisible');
      randomPhrase();
    }, 800)
  } else {
    incorrectIcon.classList.remove('invisible');
  }
}

function handleCheck(e) {
  let result = e.results[0][0].transcript;
  if (result.toLowerCase() === phrase.innerHTML.toLowerCase()) {
    displayIcon('correct');
  } else {
    displayIcon();
  }
 
  recognition.stop();
}

function handleSpeechEnd(e) {
  checkBtn.removeAttribute('disabled');
}

function startCheck() {
  checkBtn.disabled = 'true';
  correctIcon.classList.add('invisible');
  incorrectIcon.classList.add('invisible');
  recognition.start();

  recognition.addEventListener('result', handleCheck);
  recognition.addEventListener('speechend', handleSpeechEnd);
}

function chooseLang(e) {
  const lang = e.target.getAttribute('id');

  switch (lang) {
    case 'eng':
      recognition.lang = 'en-US';
      phrases = eng;
      break;
    
    case 'rus':
      recognition.lang = 'ru-RU';
      phrases = rus;
      break;
    
    case 'deu':
      recognition.lang = 'de-DE';
      phrases = deu;
      break;
  }
  
  chooseContainer.classList.toggle('invisible');
  checkContainer.classList.toggle('invisible');

  randomPhrase(lang);
}

function randomPhrase() {
  const number = Math.floor(Math.random() * phrases.length);
  phrase.innerHTML = phrases[number];
}
      
