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
    return null;
  };

  const _botPlayRandom = () => {
    const _gameSquares = document.querySelectorAll(".gameSquare");
    const _randomSquare = _gameSquares[Math.floor(Math.random() * 9)];
    if (_randomSquare.className !== "gameSquare squareFilled") {
      let _randomSquareId = _randomSquare.getAttribute("data-id");
      boardArr[+_randomSquareId] = "O";
      // TODO: remove
      console.log(boardArr);
      _randomSquare.textContent = "O";
      _randomSquare.className += " squareFilled";
        if (_checkWinner("O")==="O") {
          _endGame();
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
          // TODO: remove
          console.log(boardArr);
          _gameSquare.textContent = "X";
          _gameSquare.className += " squareFilled";
          if (_checkWinner("X") === "X") {
            _endGame();
          } else {
            setTimeout(() => {
              _botPlayRandom();
            }, 200);
          }
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

  const _endGame = () => {
    Render.renderIntro();
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
