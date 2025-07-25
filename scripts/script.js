'use strict';

//loading
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');

    function showLoading() {
        loading.style.display = 'flex';
    }

    function hideLoading() {
        loading.style.display = 'none';
    }

    showLoading();

    setTimeout(hideLoading, 1000);
});


// slider
document.addEventListener('DOMContentLoaded', function () {
  const slide = document.getElementById('slide');
  if (!slide) return; // ← slideがなければスライダー処理はスキップ！

  const indicators = document.querySelectorAll('.indicator li');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const toggleBtn = document.getElementById('toggle-autoplay');
  const btnImg = document.getElementById('ssBtn');


  const totalSlides = 4;
  let currentIndex = 1;
  let isAnimating = false;
  let autoPlayInterval = null;
  let isPlaying = true;

  // スライド移動
  function moveSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    slide.style.transition = 'transform 0.3s';
    slide.style.transform = `translateX(-${index * 100 / 6}%)`;
    currentIndex = index;

    setTimeout(() => {
      if (currentIndex === 0) {
        slide.style.transition = 'none';
        slide.style.transform = `translateX(-${totalSlides * 100 / 6}%)`;
        currentIndex = totalSlides;
      }
      if (currentIndex === totalSlides + 1) {
        slide.style.transition = 'none';
        slide.style.transform = `translateX(-${100 / 6}%)`;
        currentIndex = 1;
      }
      updateIndicators();
      isAnimating = false;
    }, 350);
  }

  function updateIndicators() {
    indicators.forEach((dot, i) => {
      dot.style.backgroundColor = (i === currentIndex - 1) ? '#000' : '#fff';
    });
  }

  function nextClick() {
    moveSlide(currentIndex + 1);
  }
  function prevClick() {
    moveSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextClick, 3000);
  }
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  function resetAutoPlay() {
    if (isPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  }

  // 初期化
  moveSlide(1);
  startAutoPlay();

  // ボタンイベント
  next.addEventListener('click', () => {
    nextClick();
    resetAutoPlay();
  });
  prev.addEventListener('click', () => {
    prevClick();
    resetAutoPlay();
  });
  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      moveSlide(i + 1);
      resetAutoPlay();
    });
  });

  // ▶｜←→■ 画像切替
  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopAutoPlay();
      btnImg.classList.remove('stop');
      btnImg.classList.add('start');
    } else {
      startAutoPlay();
      nextClick();
      btnImg.classList.remove('start');
      btnImg.classList.add('stop');
    }
    isPlaying = !isPlaying;
  });
});



// ドロワー
document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.getElementById('wrapper');
  const openNav = document.getElementById('open_nav'); 
  const nav = document.getElementById('nav');
  const closeNav = document.getElementById('batu');

  openNav.addEventListener('click', function () {
    nav.classList.add('show');
    nav.classList.remove('show_reverse');
    wrapper.classList.add('show');
  });

  closeNav.addEventListener('click', function () {
    nav.classList.remove('show');
    nav.classList.add('show_reverse');
    wrapper.classList.remove('show');
  });

  wrapper.addEventListener('click', function () {
    nav.classList.remove('show');
    nav.classList.add('show_reverse');
    wrapper.classList.remove('show');
  });

  window.addEventListener('scroll', function () {
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
      nav.classList.add('show_reverse');
      wrapper.classList.remove('show');
    }
  });
});

