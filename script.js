const GameBoard = (player, player2) => {
   let gameBoard = ['x','o','x','x','','','','',''];

   let displayBoard = () => {
    gameBoard.forEach((e) => {
      const container = document.querySelector('.container');
      const div = document.createElement('div');
      div.textContent = e;
      div.classList.add('box');
      container.appendChild(div);
    });
   };

   let win = 0;

   const getWin = () => win;

   let switchPlayers = () => {
    player = 'x';
    player2 = 'o';

    if (player) {
        player2
    } else if (player2) {
        player
    }
   }

   let winCheck = () => {
    const players = player || player2

    if (gameBoard === [players,players,players]) {
    }
   };

   return {gameBoard, displayBoard, switchPlayers, player, player2, getWin}     
};

const jenny = GameBoard('jenny','AI')

jenny.displayBoard()

