const GameCanvas = (() => {
  const canvas = document.getElementById("main");

  const clearCanvas = () => {
    canvas.innerHTML = "";
  };

  return { canvas, clearCanvas };
})();

const GameControls = (() => {
  const _addGameListeners = () => {
    const _restartGameBtn = document.getElementById("restartGameBtn");
    _restartGameBtn.addEventListener("click", () => Render.renderIntro());
  };

  const startGame = () => {
    GameCanvas.clearCanvas();
    GameCanvas.canvas.innerHTML = gameDisplayCode;
    _addGameListeners()
  };

  const addIntroListeners = () => {
    const _startGameButton = document.getElementById("startGameBtn");
    _startGameButton.addEventListener("click", startGame);
  };

  addIntroListeners();

  return { startGame, addIntroListeners };
})();

const Render = (() => {
  const renderIntro = () => {
    GameCanvas.canvas.innerHTML = introDisplayCode;
    GameControls.addIntroListeners();
  };
  return { renderIntro };
})();

const GameBoard = () => {};
