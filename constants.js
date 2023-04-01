const RESTART_GAME_DELAY = 1000;
const BOT_TURN_DELAY = 200;
let ADVANCED_MODE = true;
let boardArr = new Array(9).fill(null);

const winningCombs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const introDisplayCode =
  '<h1 class="title">Tic Tac Toe</h1> <div class="playerCard playerCard1"> <h4 class="cardTitle">X</h4><img src="assets/baby-yoda.png" alt="player-icon" /><div class="cardChoice">Player</div></div><h3 class="vs">VS</h3><div data-choice="advanced" class="playerCard playerCard2"><h4 class="cardTitle">O</h4><img src="assets/r2d2.png" alt="player-icon" class="botImage" /><div class="cardChoice cardChoiceBot">Unbeatable Bot</div></div><button class="start" id="startGameBtn">Start game</button><div class="source"><span><a href="https://github.com/mathewbushuru/unbeatable-tictactoe"target="_blank"rel="noopener noreferrer">Source</a></span><img src="assets/github.png" alt="github-source" /></div>';

const gameDisplayCode =
  '<h1 class="title gameTitle">Player Vs Bot</h1><div id="gameBoard"></div><button class="start" id="restartGameBtn">Restart game</button><div class="source"><span> <a href="https://github.com/mathewbushuru/unbeatable-tictactoe" target="_blank" rel="noopener noreferrer" >Source</a></span><img src="assets/github.png" alt="github-source" /></div>';
