const fullScreenBtn = document.querySelector('.fullscreen');
const pianoKeys = document.querySelectorAll('.piano-key');
const btnContainer = document.querySelector('.btn-container');
const piano = document.querySelector('.piano');

let isPiano = false; // Флаг для проверки нахождения курсора мыши над пианино

const playAudio = (key) => {
  const audio = new Audio();
  audio.src = `./assets/audio/${key.dataset.note}.mp3`;
  key.classList.add('piano-key-active');
  key.classList.add('piano-key-active-pseudo');
  audio.currentTime = 0;
  audio.play();
};

const removeActivePianoClass = (key) => {
  key.classList.remove('piano-key-active');
  key.classList.remove('piano-key-active-pseudo');
};

const handleClickButton = (e) => {
  if (e.target.classList.contains('btn-active')) return;
  Array.from(btnContainer.children)
    .find((btn) => btn.classList.contains('btn-active'))
    .classList.remove('btn-active');
  e.target.classList.add('btn-active');
  pianoKeys.forEach((key) => key.classList.toggle('piano-key-letter'));
};

const handleKeyDown = (e) => {
  const letter = e.code.slice(3);
  const key = document.querySelector(`div[data-letter="${letter}"]`);
  if (!key) return;
  playAudio(key);
  setTimeout(() => removeActivePianoClass(key), 300);
};

const handleClickFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.webkitCancelFullScreen();
  }
};

pianoKeys.forEach((key) => {
  key.addEventListener('mousedown', () => playAudio(key));
  key.addEventListener('mouseup', () => removeActivePianoClass(key));
  key.addEventListener('mouseenter', (e) => {
    if (e.which === 1 && isPiano) {
      playAudio(key);
    }
  });
  key.addEventListener('mouseleave', (e) => {
    if (e.which === 1) {
      removeActivePianoClass(key);
    }
  });
});

piano.addEventListener('mouseleave', (e) => {
  if (e.buttons === 1 && isPiano) return;
  isPiano = false;
});

document.addEventListener('keydown', handleKeyDown);

document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('piano-key')) {
    isPiano = true;
  }
});

document.addEventListener('mouseup', (e) => {
  if (e.target.classList.contains('main')) {
    isPiano = false;
  }
});

fullScreenBtn.addEventListener('click', handleClickFullScreen);
btnContainer.addEventListener('click', handleClickButton);
