window.onload = () => {
    document.getElementById('play').onclick = initGame;
}

let gameData = {};

function initGame() {
    document.getElementById('play').setAttribute('value', 'Новая игра');
    document.getElementById('game').style.pointerEvents = 'auto';
    gameData.turns = 0;
    gameData.gameBoard = 
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    gameData.tiles = 9;

    for(let i = 0; i < gameData.tiles; i++){
        document.getElementById('game').innerHTML = `
        <div class="ticTacToe-tile" data-id="0,0"></div>
        <div class="ticTacToe-tile" data-id="0,1"></div>
        <div class="ticTacToe-tile" data-id="0,2"></div>
        <div class="ticTacToe-tile" data-id="1,0"></div>
        <div class="ticTacToe-tile" data-id="1,1"></div>
        <div class="ticTacToe-tile" data-id="1,2"></div>
        <div class="ticTacToe-tile" data-id="2,0"></div>
        <div class="ticTacToe-tile" data-id="2,1"></div>
        <div class="ticTacToe-tile" data-id="2,2"></div>
        `
    }
    document.getElementById('game').onclick = makeTurn;
}

function findWinner(gameBoard) {
    let rowSum, columnSum, diagLeftSum, diagRightSum;
    let winInfo = {};
    if(gameData.turns >= gameData.gameBoard.length * gameData.gameBoard[0].length - 1){
        winInfo.isWinner = true;
        winInfo.winner = "draw";
        return winInfo;
    }
    for(let i = 0; i < gameBoard.length; i++){
        rowSum = 0,
        columnSum = 0,
        diagLeftSum = 0,
        diagRightSum = 0;
        for(let j = 0; j < gameBoard[i].length; j++){
            rowSum += gameBoard[i][j];
            columnSum += gameBoard[j][i];
            diagLeftSum += gameBoard[j][j];
            diagRightSum += gameBoard[j][gameBoard.length - j];
        }
        if(rowSum === 3 ||columnSum === 3 || diagLeftSum === 3 || diagRightSum === 3){
            winInfo.isWinner = true;
            winInfo.winner = "X";
            
            return winInfo;
        }
        else if(rowSum === 12 || columnSum === 12 || diagLeftSum === 12 || diagRightSum === 12){
            winInfo.isWinner = true;
            winInfo.winner = "O";

            return winInfo;
        }
    }
    winInfo.isWinner = false;

    return winInfo;
}

function makeTurn(e){
    let positions = e.target.getAttribute('data-id').split(',');
    positions = positions.map(el => Number(el));
    if(gameData.gameBoard[positions[0]][positions[1]] === 0){
        if(gameData.turns % 2 == 0){
            e.target.innerHTML = "x";
            gameData.gameBoard[positions[0]][positions[1]] = 1;
        }
        else{
            e.target.innerHTML = "o";
            gameData.gameBoard[positions[0]][positions[1]] = 4;
        }
        if(findWinner(gameData.gameBoard).isWinner){
            alert(`Congrats ${findWinner(gameData.gameBoard).winner}!`);
            document.getElementById('game').style.pointerEvents = 'none';
        }
        gameData.turns++;
    }
}

