const GameCanvas = (() => {
  const canvas = document.getElementById("main");

  const clearCanvas = () => {
    canvas.innerHTML = "";
  };

  return { canvas, clearCanvas };
})();

const GameControls = (() => {
  const _botPlayRandom = () => {
    const _gameSquares = document.querySelectorAll(".gameSquare");
    const _randomSquare = _gameSquares[Math.floor(Math.random() * 9)];
    if (_randomSquare.className !== "gameSquare squareFilled") {
      _randomSquare.textContent = "O";
      _randomSquare.className += " squareFilled";
    } else {
      _botPlayRandom();
    }
  };

  const _addGameListeners = () => {
    const _restartGameBtn = document.getElementById("restartGameBtn");
    _restartGameBtn.addEventListener("click", () => Render.renderIntro());

    const _gameSquares = document.querySelectorAll(".gameSquare");
    _gameSquares.forEach((_gameSquare) => {
      _gameSquare.addEventListener("click", () => {
        if (_gameSquare.className !== "gameSquare squareFilled") {
          _gameSquare.textContent = "X";
          _gameSquare.className += " squareFilled";
          _botPlayRandom();
        }
      });
    });
  };

  const startGame = () => {
    GameCanvas.clearCanvas();
    GameCanvas.canvas.innerHTML = gameDisplayCode;

    Render.renderBoard();

    _addGameListeners();
  };

  const addIntroListeners = () => {
    const _startGameButton = document.getElementById("startGameBtn");
    _startGameButton.addEventListener("click", startGame);
  };

  return { startGame, addIntroListeners };
})();

const Render = (() => {
  const renderIntro = () => {
    GameCanvas.canvas.innerHTML = introDisplayCode;
    GameControls.addIntroListeners();
  };

  const renderBoard = () => {
    const _gameBoard = document.getElementById("gameBoard");
    for (let i = 0; i < 9; i++) {
      _gameBoard.innerHTML += "<div class='gameSquare'></div>";
    }
  };

  return { renderIntro, renderBoard };
})();

// Entry point to start application
const Init = (() => {
  GameControls.addIntroListeners();
})();
