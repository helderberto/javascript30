(function() {
  const canvas = document.getElementById('draw');
  const ctx = canvas.getContext('2d');

  const MAX_HUE = 360;
  const CTX_MAX_LINE_WIDTH = 100;
  const CTX_MIN_LINE_WIDTH = 1;

  const state = {
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    hue: 0,
    direction: true,
  };

  function configureCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = '#BADA55';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = 'multiply';
  }

  function setCurrentPosition(e) {
    state.lastX = e.offsetX;
    state.lastY = e.offsetY;
  }

  function handleListeners() {
    canvas.addEventListener('mousedown', e => {
      state.isDrawing = true;
      setCurrentPosition(e);
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => (state.isDrawing = false));
    canvas.addEventListener('mouseout', () => (state.isDrawing = false));
  }

  function updateColor() {
    ctx.strokeStyle = `hsl(${state.hue}, 100%, 50%)`;

    state.hue++;

    if (state.hue >= MAX_HUE) {
      state.hue = 0;
    }
  }

  function flipDirection() {
    if (
      ctx.lineWidth >= CTX_MAX_LINE_WIDTH ||
      ctx.lineWidth <= CTX_MIN_LINE_WIDTH
    ) {
      state.direction = !state.direction;
    }

    if (state.direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }
  }

  function updateContext(e) {
    ctx.beginPath();

    // start from
    ctx.moveTo(state.lastX, state.lastY);

    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  function draw(e) {
    if (!state.isDrawing) {
      return;
    }

    updateContext(e);
    setCurrentPosition(e);
    updateColor();
    flipDirection();
  }

  configureCanvas();
  handleListeners();
})();
