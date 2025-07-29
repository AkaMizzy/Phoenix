const playOnHoverInit = () => {
  const isPause = (playIcon, pauseIcon) => {
    if (!playIcon || !pauseIcon) return;
    playIcon.classList.add('d-block');
    pauseIcon.classList.add('d-none');
    playIcon.classList.remove('d-none');
    pauseIcon.classList.remove('d-block');
  };

  const isPlay = (playIcon, pauseIcon) => {
    if (!playIcon || !pauseIcon) return;
    playIcon.classList.add('d-none');
    pauseIcon.classList.add('d-block');
    playIcon.classList.remove('d-block');
    pauseIcon.classList.remove('d-none');
  };

  const playVideo = (video, playIcon, pauseIcon) => {
    video.play();
    isPlay(playIcon, pauseIcon);
  };

  const pauseVideo = (video, playIcon, pauseIcon) => {
    video.pause();
    isPause(playIcon, pauseIcon);
  };

  const controlIsContainer = (container, state) => {
    const video = container.querySelector('[data-play-on-hover]');
    const controller = container.querySelector('[data-video-controller]');
    if (controller) {
      const playIcon = controller.querySelector('.play-icon');
      const pauseIcon = controller.querySelector('.pause-icon');
      if (state === 'play') {
        playVideo(video, playIcon, pauseIcon);
      } else {
        pauseVideo(video, playIcon, pauseIcon);
      }
    }
  };

  document.addEventListener('mouseover', e => {
    if (e.target.closest('[data-play-on-hover]')) {
      const video = e.target.closest('[data-play-on-hover]');
      playVideo(video, null, null);
    } else if (e.target.closest('[data-play-on-container-hover]')) {
      const container = e.target.closest('[data-play-on-container-hover]');
      controlIsContainer(container, 'play');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest('[data-play-on-hover]')) {
      const video = e.target.closest('[data-play-on-hover]');
      pauseVideo(video, null, null);
    } else if (e.target.closest('[data-play-on-container-hover]')) {
      const container = e.target.closest('[data-play-on-container-hover]');
      controlIsContainer(container, 'pause');
    }
  });

  document.addEventListener('touchstart', e => {
    if (e.target.closest('[data-play-on-hover]')) {
      const video = e.target.closest('[data-play-on-hover]');
      playVideo(video, null, null);
    } else if (e.target.closest('[data-play-on-container-hover]')) {
      const container = e.target.closest('[data-play-on-container-hover]');
      controlIsContainer(container, 'play');
    }
  });

  document.addEventListener('touchend', e => {
    if (e.target.closest('[data-play-on-hover]')) {
      const video = e.target.closest('[data-play-on-hover]');
      pauseVideo(video, null, null);
    } else if (e.target.closest('[data-play-on-container-hover]')) {
      const container = e.target.closest('[data-play-on-container-hover]');
      controlIsContainer(container, 'pause');
    }
  });

  document.addEventListener('click', e => {
    if (e.target.closest('[data-video-controller]')) {
      const controller = e.target.closest('[data-video-controller]');
      const container = controller.closest('[data-play-on-container-hover]');
      const video = container.querySelector('[data-play-on-hover]');
      const playIcon = controller.querySelector('.play-icon');
      const pauseIcon = controller.querySelector('.pause-icon');

      if (video.paused) {
        playVideo(video, playIcon, pauseIcon);
      } else {
        pauseVideo(video, playIcon, pauseIcon);
      }
    }
  });

  const videoContainers = document.querySelectorAll(
    '[data-play-on-container-hover]'
  );
  videoContainers.forEach(container => {
    const video = container.querySelector('[data-play-on-hover]');
    const controller = container.querySelector('[data-video-controller]');
    if (controller) {
      const playIcon = controller.querySelector('.play-icon');
      const pauseIcon = controller.querySelector('.pause-icon');

      if (video.paused) {
        isPause(playIcon, pauseIcon);
      }
    }
  });
};

export default playOnHoverInit;
