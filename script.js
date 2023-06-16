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

  return {getBoard, markBox, resetBoard}
})();

const GameController = (
  player1 = getPlayerNames().playerOne, 
  player2 = getPlayerNames().playerTwo
  ) => {

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
    if (GameBoard.getBoard()[index] == 'x' || GameBoard.getBoard()[index] == 'o' ) {
      console.log('not allowed, choose another index');
      return `it's still ${activePlayer.player} turn`;
    } else {
      GameBoard.markBox(activePlayer.mark,index);
      switchPlayer();
      console.log(`it's ${activePlayer.player} turn`);
    }
  }

  const checkWin = (bord) => {
    let player = activePlayer.mark

    const horizontal = [0,3,6].map(i =>{return[i,i+1,i+2]});
    const vertical = [0,1,2].map(i => {return[i,i+3,i+6]});
    const diagonal = [[0,4,8],[2,4,6]];

    let allWins = [].concat(horizontal).concat(vertical.concat(diagonal));

    let check = allWins.some(indices => {
       return GameBoard.getBoard()[indices[0]] == player && GameBoard.getBoard()[indices[1]] == player && GameBoard.getBoard()[indices[2]] == player;
    });

    const divTurn = document.querySelector('.display-win');
    const btns = document.querySelectorAll('.box');
    let replaybtn = document.querySelector('.replay');
    replaybtn.addEventListener('click', () => {
      GameBoard.resetBoard()
      ScreenController();
      divTurn.textContent = '';
      replaybtn.style.display = 'none';
    })

    if (check == true) {
      for(const btn of btns) {
        btn.disabled = true;
      }
      divTurn.textContent = `${activePlayer.player} has won`;
      replaybtn.style.display = 'inline-block';
    } else if (
      (bord.every((i => i == 'x' || i == 'o')) == true ) 
      && (check == false)
      ) {
        for(const btn of btns) {
          btn.disabled = true;
        }
        divTurn.textContent = `ITS A TIE`;
        replaybtn.style.display = 'inline-block';
      } 
  }

  console.log(`it's ${activePlayer.player} turn`);

  return {playRound, getActivePlayer, activePlayer, checkWin} 
}

const ScreenController = () => {
  let container = document.querySelector('.container');

  const displayTurn = () => {
    const divTurn = document.querySelector('display-turn');
    divTurn.textContent = `${game.getActivePlayer().player} has won`;
  }

  const updateScreen = () => {
    container.textContent = '';

    GameBoard.getBoard().forEach((box, index) => { 
      let btn = document.createElement('button');
      btn.dataset.box = index;
      btn.classList.add('box');
      container.appendChild(btn);
      btn.addEventListener('click', (e) => {
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
      })
    });
  }

  updateScreen();

  return {displayTurn};
}

function changeTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;
}

const getPlayerNames = () => {
  let playerOne = document.getElementById('player-1').value;
  let playerTwo = document.getElementById('player-2').value;

  return {playerOne, playerTwo}
}

let game = '';

const form = document.getElementById('submit-btn');
form.addEventListener('click',(e) => {
  e.preventDefault();
  getPlayerNames();
  game = GameController();
  const form = document.getElementById('names');
  form.style.display = 'none';
});

ScreenController();

document.getElementById('switch').addEventListener('click',changeTheme);

console.log(GameBoard.getBoard());



