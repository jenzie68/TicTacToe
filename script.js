const GameBoard = () => {
  const board = [];
  const box = 9;

  for (let i = 0; i < box; i++) {
    board[i] = '';
  }

  const getBoard = () => board;

  const markBox = (mark,index) => { 
    board[index] = mark;
    console.log(board)
  }

  return {getBoard, markBox}
  
};

const GameController = (player1 , player2) => {
  player1 = 'player one';
  player2 = 'player two';

  let board = GameBoard()

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

  const switchPlayer = () => {
   activePlayer =
   activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0]
  }

  const playRound = (index) => {
    if (board.getBoard()[index] == 'x' || board.getBoard()[index] == 'o' ) {
      console.log('not allowed, choose another index');
      return `it's still ${activePlayer.player} turn`;
    } else {
      board.markBox(activePlayer.mark,index);
      checkWin(activePlayer.mark);
      switchPlayer();
      console.log(`it's ${activePlayer.player} turn`);
    }
  }

  const checkWin = (player) => {

    const horizontal = [0,3,6].map(i =>{return[i,i+1,i+2]});
    const vertical = [0,1,2].map(i => {return[i,i+3,i+6]});
    const diagonal = [[0,4,8],[2,4,6]];

    let allWins = [].concat(horizontal).concat(vertical.concat(diagonal));

    let check = allWins.some(indices => {
       return board.getBoard()[indices[0]] == player && board.getBoard()[indices[1]] == player && board.getBoard()[indices[2]] == player;
    });

    if (check == true) {
      console.log(`${activePlayer.player} has won`); 
      let div = document.createElement('div');
      div.setAttribute('id','displat-win');
      div.textContent = `${getActivePlayer().player} has won`;
      let container = document.querySelector('.container');
      container.appendChild(div)
    }
  }

  console.log(`it's ${activePlayer.player} turn`);

  return {playRound, getActivePlayer, activePlayer} 
}

const ScreenController = () => {
  let board = GameBoard();
  let container = document.querySelector('.container');

  const displayTurn = () => {
    let div = document.createElement('div');
      div.setAttribute('id','displat-turn');
      div.textContent = `it's ${activePlayer.player} turn`;
      let container = document.querySelector('.container');
      container.appendChild(div)
  }

  const updateScreen = () => {
    container.textContent = '';

    board.getBoard().forEach((box, index) => { 
      let btn = document.createElement('button');
      btn.dataset.box = index;
      btn.classList.add('box');
      container.appendChild(btn);
      btn.addEventListener('click', (e) => {
        const player = game.getActivePlayer();
        const selectBox = e.target.dataset.box;
        btn.textContent = player.mark;
        game.playRound(selectBox);
      })
    });
  }

  updateScreen();

  return {displayTurn};
}

let gameBoard = GameBoard()
console.log(gameBoard.getBoard())

let game = GameController();
console.log(game);

let display = ScreenController();
