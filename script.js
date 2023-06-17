const GameBoard = (() => {
  let board = [];
  const box = 9;

  for (let i = 0; i < box; i++) {
    board[i] = '';
  }

  const getBoard = () => board;

  const markBox = (mark,index) => { 
    board[index] = mark;
    console.log(getBoard());
    game.checkWin(board);
  }

  const resetBoard = () => {
    board = [];
    for (let i = 0; i < box; i++) {
      board[i] = '';
    }  
  }

  return {
    getBoard, 
    markBox, 
    resetBoard
  };
})();

const GameController = (player1, player2 
  ) => {
  player1 = getPlayerNames().playerOne, 
  player2 = getPlayerNames().playerTwo

  const players = [{
    player: player1,
    mark: 'x',
    points: 0
  },{
    player: player2,
    mark: 'o',
    points: 0
  }]

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  function switchPlayer() {
   activePlayer =
   activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0]
  }

  const playRound = (index) => {
      GameBoard.markBox(activePlayer.mark,index);
      switchPlayer();
      console.log(`it's ${activePlayer.player} turn`);
  }

  const checkWin = (board) => {
    let player = activePlayer.mark

    function check(mark) {
      return board[0] == mark && board[1] == mark && board[2] == mark ? true
              :board[3] == mark&& board[4] == mark && board[5] == mark ? true
              :board[6] == mark && board[7] == mark && board[8] == mark ? true
              :board[0] == mark && board[3] == mark && board[6] == mark ? true
              :board[1] == mark && board[4] == mark && board[7] == mark ? true
              :board[2] == mark && board[5] == mark && board[8] == mark ? true
              :board[0] == mark && board[4] == mark && board[8] == mark ? true
              :board[2] == mark && board[4] == mark && board[6] == mark ? true
              :false
      }

    const btns = document.querySelectorAll('.box');

    if (check(player) == true) {
      for(const btn of btns) {
        btn.disabled = true;
      }
      DisplayController.displayWin(activePlayer.player);
    } else if (
      (board.every((i => i == 'x' || i == 'o')) == true ) 
      && (check(player) == false)
      ) {
        for(const btn of btns) {
          btn.disabled = true;
        }
        DisplayController.displayTie();
      } 
  }

  let resetBtn = document.querySelector('.replay');
  resetBtn.addEventListener('click', () => {
    GameBoard.resetBoard()
    DisplayController.updateScreen();
    DisplayController.resetDisplay();
  });

  console.log(`it's ${activePlayer.player} turn`);

  return {
    playRound, 
    getActivePlayer, 
    activePlayer, 
    checkWin
  } 
};

let game = '';

const getPlayerNames = () => {

  let playerOne = document.getElementById('player-1').value;
  let playerTwo = document.getElementById('player-2').value;
  
  const form = document.getElementById('submit-btn');
  form.addEventListener('click',(e) => {
    e.preventDefault();
    playerOne;
    playerTwo;
    game = GameController();
    const form = document.getElementById('names');
    form.style.display = 'none';
  });

 return {
    playerOne, 
    playerTwo
  }  
};

const DisplayController = (() => {
  const resetBtn = document.querySelector('.replay');
  const divTurn = document.querySelector('.display-win');

  function displayWin(player) {
    divTurn.textContent = `${player} has won`;
    resetBtn.style.display = 'inline-block';
  }

  function displayTie() {
    divTurn.textContent = `ITS A TIE`;
    resetBtn.style.display = 'inline-block';
  }

  function resetDisplay() {
    divTurn.textContent = '';
    resetBtn.style.display = 'none';
  }

  function changeTheme() {
    const root = document.documentElement;
    const newTheme = root.className === 'dark' ? 'light' : 'dark';
    root.className = newTheme;
  }
  
  let switchSlider = document.getElementById('switch');
  switchSlider.addEventListener('click',changeTheme);

  function updateScreen() {
    const container = document.querySelector('.container');
    container.textContent = '';

    GameBoard.getBoard().forEach((box, index) => { 
      const btn = document.createElement('button');
      btn.dataset.box = index;
      btn.classList.add('box');
      container.appendChild(btn);
      btn.addEventListener('click', addMark);

      function addMark(e) {
        const player = game.getActivePlayer();
        const selectBox = e.target.dataset.box;
        if (player.mark == 'x') {
          btn.setAttribute('id','x')
        } else if(player.mark == 'o') {
          btn.setAttribute('id','o');
        }
        btn.textContent = player.mark;
        btn.disabled = true;
        game.playRound(selectBox);
      }
    });
  }

  updateScreen();

  return {
    displayWin, 
    updateScreen, 
    displayTie,
    resetDisplay
  };
})();

getPlayerNames();
DisplayController;



