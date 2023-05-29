const GameBoard = (player, player2) => {
   let gameBoard = () => ['','','','','','','','',''];

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
     
   }

   return {gameBoard, switchPlayers, player, player2}     
};

