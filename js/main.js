$(document).ready(function () {
  const album = $('.flipbook');
  const numberOfImages = 76;
  let currentPage = 1;
  let mouseDownTime = 0;
  let isAudioPlaying = false;
  let audioTimeout;

  const startFlipAudio = new Audio('start-flip.mp3');

  // Preload the audio files
  startFlipAudio.load();
  
  album.on('mousedown', function () {
    mouseDownTime = Date.now();
    audioTimeout = setTimeout(function () {
      if (Date.now() - mouseDownTime > 30) {
        playAudio(startFlipAudio);
        isAudioPlaying = true;
      }
    }, 30);
  });

  album.on('mouseup', function () {
    clearTimeout(audioTimeout);
    if (isAudioPlaying) {
      isAudioPlaying = false;
    }
  });

  // for (let i = 1; i <= numberOfImages; i++) {
  //   const imageURL = `imgs/imgs/core3web${i}.png`;
  //   const div = $('<div></div>');
  //   div.css('background-image', `url(${imageURL})`);
  //   album.append(div);
  // }

  function playAudio(audio) {
    audio.currentTime = 0;
    audio.play();
    audio.onended = function () {
      isAudioPlaying = false;
    };
  }

  const videoSources = ['vids/1.mp4', 'vids/2.mp4', 'vids/3.mp4', 'vids/4.mp4', 'vids/5.mp4', 'vids/6.mp4', 
  'vids/7.mp4', 'vids/8.mp4', 'vids/9.mp4', 'vids/10.mp4', 'vids/11.mp4', 'vids/12.mp4', 'vids/13.mp4', 'vids/14.mp4' /* ... */];
  videoSources.sort(() => Math.random() - 0.5);

  const video = document.querySelector('video');
  for (let i = 0; i < videoSources.length; i++) {
    const source = document.createElement('source');
    source.src = videoSources[i];
    source.type = 'video/mp4';
    video.appendChild(source);
  }

  function playVideo() {
    const video = document.querySelector('video');
    video.play();
  }
  document.body.addEventListener('mouseover', playVideo);

});

