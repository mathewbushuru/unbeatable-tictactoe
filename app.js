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
  const _checkWinner = (player, board = boardArr) => {
    for (let option of winningCombs) {
      if (
        board[option[0]] === player &&
        board[option[1]] === player &&
        board[option[2]] === player
      ) {
        return player;
      }
    }

    let i = 0;
    while (i < board.length) {
      if (board[i] === null) {
        return null;
      }
      i++;
    }
    if (i === board.length) {
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

  const _minimaxAlg = (board, maximizingBot = true) => {
    const _winner = _checkWinner(maximizingBot ? "O" : "X", board);

    if (_winner === "O") return maximizingBot ? 10 : -10;
    else if (_winner === "X") return maximizingBot ? -10 : 10;
    else if (_winner === "draw") return 0;

    const _moves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const boardCpy = [...board];
        boardCpy[i] = maximizingBot ? "O" : "X";
        const _score = _minimaxAlg(boardCpy, !maximizingBot);
        _moves.push({ index: i, score: _score });
      }
    }

    const _bestMove = _moves.reduce(
      (prev, curr) => {
        return maximizingBot
          ? curr.score > prev.score
            ? curr
            : prev
          : curr.score < prev.score
          ? curr
          : prev;
      },
      {
        index: -1,
        score: maximizingBot ? -Infinity : Infinity,
      }
    );

    return _bestMove.score;
  };

  const _botPlayMinmax = () => {
    //first check  if there is an immediate win or loss in any next available move
    const _allSquares = document.querySelectorAll(".gameSquare");
    const _emptySquares = [..._allSquares].filter((square) => {
      return square.className !== "gameSquare squareFilled";
    });
    const _emptySquaresIds = _emptySquares.map((square) =>
      square.getAttribute("data-id")
    );

    const _payoffsArr = new Array(9).fill(null);
    let _winResult, _winResultX;

    for (let id of _emptySquaresIds) {
      const _boardArrCopy = [...boardArr];
      _boardArrCopy[id] = "O";
      _winResult = _checkWinner("O", _boardArrCopy);
      _boardArrCopy[id] = "X";
      _winResultX = _checkWinner("X", _boardArrCopy);
      if (_winResult === "O" || _winResultX === "X") {
        _payoffsArr[id] = 10;
      } else {
        _payoffsArr[id] = null;
      }
    }

    let _idx = 0;
    for (let i = 0; i < _payoffsArr.length; i++) {
      if (_payoffsArr[i] === 10) {
        boardArr[i] = "O";
        _allSquares[i].textContent = "O";
        _allSquares[i].className += " squareFilled";
        if (_checkWinner("O") === "O") {
          _endGame("Bot ( O ) won");
        } else if (_checkWinner("O") === "draw") {
          _endGame("It's a draw");
        }
        break;
      }
      _idx++;
    }
    if (_idx === 9) {
      // No immediate win or loss possibility
      // Hence do recursive minmax check for best play considering all game possibilities
      let _bestScore = -Infinity;
      let _bestMove = -1;
      for (let i = 0; i < boardArr.length; i++) {
        if (boardArr[i] === null) {
          const _boardCpy = [...boardArr];
          _boardCpy[i] = "O";
          const _score = _minimaxAlg(_boardCpy, true);
          if (_score > _bestScore) {
            _bestScore = _score;
            _bestMove = i;
          }
        }
      }

      boardArr[_bestMove] = "O";
      _allSquares[_bestMove].textContent = "O";
      _allSquares[_bestMove].className += " squareFilled";
      if (_checkWinner("O") === "O") {
        _endGame("Bot ( O ) won");
      } else if (_checkWinner("O") === "draw") {
        _endGame("It's a draw");
      }
    }
  };

  const _addGameListeners = () => {
    const _restartGameBtn = document.getElementById("restartGameBtn");
    _restartGameBtn.addEventListener("click", () => {
      ADVANCED_MODE = true;
      Render.renderIntro();
    });

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
              ADVANCED_MODE ? _botPlayMinmax() : _botPlayRandom();
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

  const _endGameDisplay = (endMessage) => {
    const _modalDiv = document.getElementById("modal");
    _modalDiv.textContent = endMessage;
    _modalDiv.style.display = "flex";
    setTimeout(() => {
      _modalDiv.style.display = "none";
      Render.renderIntro();
    }, RESTART_GAME_DELAY);
  };

  const _endGame = (endMessage) => {
    setTimeout(() => {
      _endGameDisplay(endMessage);
    }, 0);
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
        _botTypeText.textContent = "Trivial Bot";
        ADVANCED_MODE = false;
      } else {
        _botCard.setAttribute("data-choice", "advanced");
        _botImg.setAttribute("src", "assets/r2d2.png");
        _botTypeText.textContent = "Advanced Bot ";
        ADVANCED_MODE = true;
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
