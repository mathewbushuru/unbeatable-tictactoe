"use strict";

const GameCanvas = (() => {
  const canvas = document.getElementById("main");

  const clearCanvas = () => {
    boardArr = new Array(9).fill(null);
    canvas.innerHTML = "";
  };

  return { canvas, clearCanvas };
})();

const GameControls = (() => {
  const _checkWinner = (player) => {
    for (let option of winningCombs) {
      if (
        boardArr[option[0]] === player &&
        boardArr[option[1]] === player &&
        boardArr[option[2]] === player
      ) {
        return player;
      }
    }

    let i = 0;
    while (i < boardArr.length) {
      if (boardArr[i] === null) {
        return null;
      }
      i++;
    }
    if (i === boardArr.length) {
      return "draw";
    }

    return null;
  };

  const _botPlayRandom = () => {
    const _gameSquares = document.querySelectorAll(".gameSquare");
    const _randomSquare = _gameSquares[Math.floor(Math.random() * 9)];
    if (_randomSquare.className !== "gameSquare squareFilled") {
      let _randomSquareId = _randomSquare.getAttribute("data-id");
      boardArr[+_randomSquareId] = "O";
      _randomSquare.textContent = "O";
      _randomSquare.className += " squareFilled";
      if (_checkWinner("O") === "O") {
        _endGame("Bot ( O ) won");
      } else if (_checkWinner("O") === "draw") {
        _endGame("It's a draw");
      }
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
          let _gameSquareId = _gameSquare.getAttribute("data-id");
          boardArr[+_gameSquareId] = "X";
          _gameSquare.textContent = "X";
          _gameSquare.className += " squareFilled";
          if (_checkWinner("X") === "X") {
            _endGame("Player ( X ) won");
          } else if (_checkWinner("X") === "draw") {
            _endGame("It's a draw");
          } else {
            setTimeout(() => {
              _botPlayRandom();
            }, BOT_TURN_DELAY);
          }
        }
      });
    });
  };

  const _startGame = () => {
    Render.renderBoard();

    _addGameListeners();
  };

  const _endGame = (endMessage) => {
    const _modalDiv = document.getElementById("modal");
    _modalDiv.textContent = endMessage;
    _modalDiv.style.display = "flex";
    setTimeout(() => {
      _modalDiv.style.display = "none";
      Render.renderIntro();
    }, RESTART_GAME_DELAY);
  };

  const addIntroListeners = () => {
    const _startGameButton = document.getElementById("startGameBtn");
    _startGameButton.addEventListener("click", _startGame);

    const _botCard = document.querySelector(".playerCard2");
    _botCard.addEventListener("click", () => {
      const _botImg = document.querySelector(".botImage");
      const _botType = _botCard.getAttribute("data-choice");
      const _botTypeText = document.querySelector(".cardChoiceBot");
      if (_botType === "advanced") {
        _botCard.setAttribute("data-choice", "trivial");
        _botImg.setAttribute("src", "assets/personal-droid.png");
        _botTypeText.textContent="Trivial Bot"
      } else {
        _botCard.setAttribute("data-choice", "advanced");
        _botImg.setAttribute("src", "assets/r2d2.png");
        _botTypeText.textContent="Advanced Bot "
      }
    });
  };

  return { addIntroListeners };
})();

const Render = (() => {
  const renderIntro = () => {
    GameCanvas.canvas.innerHTML = introDisplayCode;
    GameControls.addIntroListeners();
  };

  const renderBoard = () => {
    GameCanvas.clearCanvas();
    GameCanvas.canvas.innerHTML = gameDisplayCode;

    const _gameBoard = document.getElementById("gameBoard");
    for (let i = 0; i < boardArr.length; i++) {
      if (boardArr[i]) {
        _gameBoard.innerHTML += `<div class='gameSquare' data-id='${i}'>${boardArr[i]}</div>`;
      } else {
        _gameBoard.innerHTML += `<div class='gameSquare' data-id='${i}'></div>`;
      }
    }
  };

  return { renderIntro, renderBoard };
})();

// Entry point to start application
const Init = (() => {
  GameControls.addIntroListeners();
})();
