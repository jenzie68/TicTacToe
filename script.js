const GameBoard = (player, player2) => {
   let gameBoard = ['o','o','o','','','','','','x'];

   let displayBoard = () => {
    gameBoard.forEach((e) => {
      const container = document.querySelector('.container');
      const div = document.createElement('div');
      div.textContent = e;
      div.classList.add('box');
      container.appendChild(div);
    });
   };

   let switchPlayers = () => {
    player = 'x';
    player2 = 'o';

    if (player) {
        player2
    } else if (player2) {
        player
    };
   };

   let winCheck = () => {
      switch ('x') {
        case gameBoard[0] && gameBoard[1] && gameBoard[2]:
          console.log('it works')
          break;
        case gameBoard[0] && gameBoard[3] && gameBoard[6]:
          console.log('it works') 
          break;
        case gameBoard[0] && gameBoard[4] && gameBoard[8]:
          console.log('it works') 
          break;
        case gameBoard[2] && gameBoard[5] && gameBoard[8]:
          console.log('it works') 
          break;
        default:
          console.log('does not work')
          break;
      }
   };

   return {gameBoard, displayBoard, switchPlayers, player, player2, winCheck}     
};

const jenny = GameBoard('jenny','AI')

jenny.displayBoard()


