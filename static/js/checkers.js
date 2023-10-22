let account = document.getElementById("account")
let username;

if(localStorage.getItem("auth") != null){

    fetch("https://ets-pemrograman-web-f.cyclic.app/users/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("auth")}`
        },
    })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                alert("Get data User Failed, Need Authentication");
                window.location.href = "login.html";
            }
            return response.json();
        })
        .then((resp) => {
            console.log("resp from server ", resp);
            username = resp.data.nama;
            account.textContent = `${username} (As BLACK)`

        })
        .catch((error) => {
            alert(error)
            console.log("error ", error);
        });
}else{
    alert("Get data User Failed, Need Authentication");
    window.location.href = "login.html";
}




const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

const cells = document.querySelectorAll("td");
let blacksPieces = document.getElementsByClassName("black-piece");
let whitesPieces = document.getElementsByClassName("white-piece");
let whiteTurnIndicator = document.getElementById("white-turn-indicator");
let blackTurnIndicator = document.getElementById("black-turn-indicator");

let turn = false;
let whiteScore = 12;
let blackScore = 12;
let score = 0;
let playerPieces;


let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    plusSeventhSpace: false,
    plusNinthSpace: false,
    plusFourteenthSpace: false,
    plusEighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < whitesPieces.length; i++) {
            whitesPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}


function getPlayerPieces() {
    if (turn) {
        playerPieces = whitesPieces;
    } else {
        playerPieces = blacksPieces;
    }
    removeCellonclick();
    resetBorders();
}

function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}


function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid red";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.plusSeventhSpace = false;
    selectedPiece.plusNinthSpace = false;
    selectedPiece.plusFourteenthSpace = false;
    selectedPiece.plusEighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}

function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}


function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}


function getAvailableSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null && 
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("no-piece") !== true) {
        selectedPiece.plusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null && 
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("no-piece") !== true) {
        selectedPiece.plusNinthSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null && 
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("no-piece") !== true) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 9] === null && 
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("no-piece") !== true) {
        selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
}

function checkAvailableJumpSpaces() {
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("no-piece") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.plusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("no-piece") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
            selectedPiece.plusEighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null 
        && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("no-piece") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null 
        && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("no-piece") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
            selectedPiece.minusEighteenthSpace = true;
        }
    } else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("no-piece") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
            selectedPiece.plusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("no-piece") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
            selectedPiece.plusEighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("no-piece") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] < 12 
        && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("no-piece") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] < 12
        && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
            selectedPiece.minusEighteenthSpace = true;
        }
    }
    checkPieceConditions();
}

function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else {
            selectedPiece.plusSeventhSpace = false;
            selectedPiece.plusNinthSpace = false;
            selectedPiece.plusFourteenthSpace = false;
            selectedPiece.plusEighteenthSpace = false;
        }
        givePieceBorder();
    }
}

function givePieceBorder() {
    if (selectedPiece.plusSeventhSpace || selectedPiece.plusNinthSpace || selectedPiece.plusFourteenthSpace || selectedPiece.plusEighteenthSpace
    || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
        giveCellsClick();
    } else {
        return;
    }
}

function giveCellsClick() {
    if (selectedPiece.plusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.plusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.plusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.plusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
    }
}

function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="white-piece king" id="${selectedPiece.pieceId}"></p>`;
            whitesPieces = document.getElementsByClassName("white-piece king");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="white-piece" id="${selectedPiece.pieceId}"></p>`;
            whitesPieces = document.getElementsByClassName("white-piece");
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="black-piece king" id="${selectedPiece.pieceId}"></p>`;
            blacksPieces = document.getElementsByClassName("black-piece king");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="black-piece" id="${selectedPiece.pieceId}"></p>`;
            blacksPieces = document.getElementsByClassName("black-piece");
        }
    }

    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}


function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blackScore--;
            score-=100;
            blackTurnIndicator.textContent = `Black Turn`;
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            whiteScore--;
            score+=100;
            whiteTurnIndicator.textContent = `White Turn`;
        }
    }
    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
}

function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < whitesPieces.length; i++) {
            whitesPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWin();
}

function checkForWin() {

    if(blackScore == 0 || whiteScore == 0){
        var payload = {
        "nama" : username,
        "score" : score.toString(),

        }
        console.log(payload);
        fetch("https://ets-pemrograman-web-f.cyclic.app/scores/score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    // throw new Error("Add score failed");
                }
                return response.json();
            })
            .then((resp) => {
                alert("Add Score berhasil");
                console.log("resp from server ", resp);
                window.location.href = "leaderboard.html";
            })
            .catch((error) => {
                alert(error)
                console.log("error ", error);
            });
    }

    if (blackScore === 0) {
        whiteTurnIndicator.textContent = "White Wins!";
        whiteTurnIndicator.style.backgroundColor = "green";
        blackTurnIndicator.textContent = "Black Loses!";
        blackTurnIndicator.style.backgroundColor = "red";
    } else if (whiteScore === 0) {
        whiteTurnIndicator.textContent = "Black Wins!";
        whiteTurnIndicator.style.backgroundColor = "red";
        blackTurnIndicator.textContent = "White Loses!";
        blackTurnIndicator.style.backgroundColor = "green";
    }
    changePlayer();
}

function changePlayer() {
    if (turn) {
        turn = false;
        whiteTurnIndicator.style.backgroundColor = "red";
        blackTurnIndicator.style.backgroundColor = "green";
        
    } else {
        turn = true;
        whiteTurnIndicator.style.backgroundColor = "green";
        blackTurnIndicator.style.backgroundColor = "red";
        
    }
    givePiecesEventListeners();
}

givePiecesEventListeners();