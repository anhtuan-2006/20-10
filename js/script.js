(() => {
  'use strict';

  // ĐỔI TÊN NGƯỜI NHẬN TẠI ĐÂY
  const CONFIG = {
    recipient: 'Mai Phương',
    totalScenes: 8,
    closeLetterDelay: 2350
  };

  const body = document.body;
  const intro = document.getElementById('intro');
  const universe = document.getElementById('universe');
  const gallery = document.getElementById('gallery');
  const memories = document.getElementById('memories');
  const letterScreen = document.getElementById('letterScreen');
  const secretNote = document.getElementById('secretNote');
  const ending = document.getElementById('ending');
  const counter = document.getElementById('counterCurrent');
  const letterHint = document.getElementById('letterHint');
  const paper = document.getElementById('paper');
  const paperInner = document.getElementById('paperInner');
  const letterLines = Array.from(document.querySelectorAll('.letter-line'));

  // Hiện từng đoạn theo nhịp nhẹ nhàng, không bắt người đọc chờ quá lâu.
  letterLines.forEach((line, index) => {
    line.style.setProperty('--reveal-delay', `${Math.min(index * 0.105, 2.15)}s`);
  });
  const letterSign = document.querySelector('.letter-sign');
  if (letterSign) letterSign.style.setProperty('--reveal-delay', `${Math.min(letterLines.length * 0.105, 2.35)}s`);
  const nameDisplay = document.getElementById('nameDisplay');
  const starField = document.getElementById('starField');
  const particleLayer = document.getElementById('particleLayer');

  nameDisplay.textContent = CONFIG.recipient;
  let stage = 0;
  let closingTimer = null;
  let sceneTimer = null;
  let isTransitioning = false;

  // Tạo các đốm sáng nhỏ trên nền.
  for (let i = 0; i < 42; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.textContent = Math.random() > 0.5 ? '·' : '✦';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2.8 + Math.random() * 5}s`);
    star.style.animationDelay = `${Math.random() * -6}s`;
    star.style.fontSize = `${5 + Math.random() * 9}px`;
    starField.appendChild(star);
  }

  // Trái tim và đốm sáng trôi chậm, không cản thao tác chạm.
  const heartSymbols = ['♡', '♥', '✧', '✦', '·'];
  for (let i = 0; i < 19; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty('--size', `${10 + Math.random() * 15}px`);
    particle.style.setProperty('--duration', `${11 + Math.random() * 15}s`);
    particle.style.setProperty('--delay', `${Math.random() * -24}s`);
    particle.style.setProperty('--drift', `${Math.round(Math.random() * 120 - 60)}px`);
    particle.style.setProperty('--spin', `${Math.round(Math.random() * 100 - 50)}deg`);
    if (Math.random() > 0.42) particle.style.color = '#8bf7ff';
    particleLayer.appendChild(particle);
  }

  function restartAnimations(container) {
    if (!container) return;
    const elements = [container, ...container.querySelectorAll('*')];
    elements.forEach((element) => { element.style.animation = 'none'; });
    void container.offsetWidth;
    elements.forEach((element) => { element.style.removeProperty('animation'); });
  }

  function updateCounter() {
    const visibleStage = stage === 0 ? 0 : Math.min(stage, CONFIG.totalScenes);
    counter.textContent = String(visibleStage).padStart(2, '0');
  }

  function clearTimers() {
    if (closingTimer) window.clearTimeout(closingTimer);
    if (sceneTimer) window.clearTimeout(sceneTimer);
    closingTimer = null;
    sceneTimer = null;
  }

  function setStage(nextStage) {
    clearTimers();
    stage = nextStage;
    body.dataset.stage = String(stage);
    updateCounter();
    isTransitioning = stage === 6;

    if (memories) memories.classList.remove('falling-away');

    if (stage === 0) restartAnimations(intro);
    if (stage === 1) restartAnimations(universe);
    if (stage === 2) restartAnimations(gallery);
    if (stage === 3) restartAnimations(memories);
    if (stage === 7) restartAnimations(secretNote);
    if (stage === 8) restartAnimations(ending);

    if (stage === 4) {
      // La cảnh kỷ niệm quét đi từ trên xuống, đồng thời phong thư xuất hiện.
      if (memories) memories.classList.add('falling-away');
      letterHint.innerHTML = 'chạm để mở thư <span>♡</span>';
      sceneTimer = window.setTimeout(() => {
        if (memories) memories.classList.remove('falling-away');
      }, 1120);
    }

    if (stage === 5) {
      // Đưa vùng nội dung cuộn về đầu mỗi lần mở thư.
      if (paperInner) paperInner.scrollTop = 0;
      letterHint.innerHTML = 'cuộn xuống để đọc tiếp <span>·</span> chạm ngoài tờ giấy để khép lại <span>♡</span>';
      if (paper) paper.focus({ preventScroll: true });
    }

    if (stage === 6) {
      letterHint.textContent = '';
      closingTimer = window.setTimeout(() => {
        isTransitioning = false;
        setStage(7);
      }, CONFIG.closeLetterDelay);
    }

    if (stage === 7 || stage === 8) isTransitioning = false;
  }

  function advance() {
    if (isTransitioning) return;
    if (stage === 0) setStage(1);
    else if (stage === 1) setStage(2);
    else if (stage === 2) setStage(3);
    else if (stage === 3) setStage(4);
    else if (stage === 4) setStage(5);
    else if (stage === 5) setStage(6);
    else if (stage === 6) return;
    else if (stage === 7) setStage(8);
    else if (stage === 8) setStage(0);
  }

  // Khi đang đọc thư, mọi thao tác bên trong giấy chỉ dùng để cuộn/chọn chữ.
  document.addEventListener('pointerup', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (stage === 5 && event.target instanceof Element && event.target.closest('#paper')) return;
    advance();
  });

  document.addEventListener('keydown', (event) => {
    const readingPaper = stage === 5 && event.target instanceof Element && event.target.closest('#paper');
    if (readingPaper && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
      return;
    }
    if (stage === 5 && event.key === 'Escape') {
      event.preventDefault();
      setStage(6);
    } else if (readingPaper && ['ArrowLeft', 'ArrowRight', 'Enter'].includes(event.key)) {
      return;
    } else if (['ArrowRight', ' ', 'Enter'].includes(event.key)) {
      event.preventDefault();
      advance();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (!isTransitioning && stage > 0) {
        // Bước 6 là hoạt ảnh đóng thư; quay lại từ lời nhắn cuối sẽ về bức thư đang mở.
        if (stage === 7) setStage(5);
        else setStage(stage - 1);
      }
    }
  });

  // Cập nhật nhãn bộ đếm và trạng thái ban đầu.
  setStage(0);
})();
