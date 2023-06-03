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
    console.log(board[row][column] = mark)
  }

  return {getBoard}
  
};

let sample = GameBoard()
console.log(sample.getBoard())

const GameController = (player1 , player2) => {
  player1 = 'player one';
  player2 = 'player two';

  const players = [{
    player: player1,
    mark: 'x'
  },{
    player: player2,
    mark: 'o'
  }]

  let activePlayer = players[0]

  const switchPlayer = () => {
    activePlayer = players[0] ? players[1] : players[0] 
  }

  const playRound = () => {
    console.log(`it's ${activePlayer} turn`)
  }

}

