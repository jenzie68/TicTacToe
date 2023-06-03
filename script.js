const GameBoard = () => {
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < columns; c++) {
     board[r].push('')
    }
  }

  const getBoard = () => board;

  const markBox = (mark,row,column) => {
    board[row][column] = mark;
    console.log(board)
  }

  return {getBoard, markBox}
  
};

let sample = GameBoard()
console.log(sample.getBoard())

const GameController = (player1 , player2) => {
  player1 = 'player one';
  player2 = 'player two';

  let board = GameBoard()

  const players = [{
    player: player1,
    mark: 'x'
  },{
    player: player2,
    mark: 'o'
  }]

  let activePlayer = players[0];

  const switchPlayer = () => {
   activePlayer =
   activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0]
  }

  const playRound = (row,column) => {
    board.markBox(activePlayer.mark,row,column);
    switchPlayer();
    console.log(`it's ${activePlayer.player} turn`);
  }

  console.log(`it's ${activePlayer.player} turn`);

  return {playRound}
}

let game = GameController();
console.log(game);

