// size of the squares
squaresize = 500 / 8;
xstart = window.innerWidth * 0.16
ystart = 10;
let square = document.getElementById("square");

// starting values
totalturns = 0
WhiteMove = true
clicks = 1;
Movemade = false
legalmove = false
colour1 = "#B88B4A"
colour2 = "#E3C16F"


// test lists - remove
testlist = []
newlist = []

// king starting positions
whitekinglocation = []
blackkinglocation = []
whitekinglocation.push(7)
whitekinglocation.push(4)
blackkinglocation.push(0)
blackkinglocation.push(4)


// initial board
board = [
        ["BR1", "BN1", "BB1", "BQ1", "BK1", "BB2", "BN2", "BR2"],
        ["BP1", "BP2", "BP3", "BP4", "BP5", "BP6", "BP7", "BP8"],
        ["---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---"],
        ["WP1", "WP2", "WP3", "WP4", "WP5", "WP6", "WP7", "WP8"],
        ["WR1", "WN1", "WB1", "WQ1", "WK1", "WB2", "WN2", "WR2"]
];

// row 1
for(i=1; i< 9; i++){
    let Row1 = document.createElement("div")
    if(i % 2 == 0){
        Row1.style.backgroundColor = colour1
    }
    else{
        Row1.style.background = colour2
    }
    square.appendChild(Row1)
}

// row 2 
for(i=1; i< 9; i++){
    let Row2 = document.createElement("div")
    if(i % 2 == 0){
        Row2.style.backgroundColor = colour2
    }
    else{
        Row2.style.background = colour1
    }
    square.appendChild(Row2)
}

// row 3 
for(i=1; i< 9; i++){
    let Row3 = document.createElement("div")
    if(i % 2 == 0){
        Row3.style.backgroundColor = colour1
    }
    else{
        Row3.style.background = colour2
    }
    square.appendChild(Row3)
}

// row 4 
for(i=1; i< 9; i++){
    let Row4 = document.createElement("div")
    if(i % 2 == 0){
        Row4.style.backgroundColor = colour2
    }
    else{
        Row4.style.background = colour1
    }
    square.appendChild(Row4)
}
// row 5 
for(i=1; i< 9; i++){
    let Row5 = document.createElement("div")
    if(i % 2 == 0){
        Row5.style.backgroundColor = colour1
    }
    else{
        Row5.style.background = colour2
    }
    square.appendChild(Row5)
}

// row 6
for(i=1; i< 9; i++){
    let Row6 = document.createElement("div")
    if(i % 2 == 0){
        Row6.style.backgroundColor = colour2
    }
    else{
        Row6.style.background = colour1
    }
    square.appendChild(Row6)
}

// row 7
for(i=1; i< 9; i++){
    let Row7 = document.createElement("div")
    if(i % 2 == 0){
        Row7.style.backgroundColor = colour1
    }
    else{
        Row7.style.background = colour2
    }
    square.appendChild(Row7)
}

//row 8
for(i=1; i< 9; i++){
    let Row8 = document.createElement("div")
    if(i % 2 == 0){
        Row8.style.backgroundColor = colour2
    }
    else{
        Row8.style.background = colour1
    }
    square.appendChild(Row8)
}


function movePiece(event) {
    let x = event.clientX;
    let y = event.clientY;

    //calculating x coordinate
    x = x - xstart;
    if(x >= 0){
        x = Math.floor(x / squaresize);
    }

    // calculating y coordinate
    y = y - ystart;
    if(y >= 0){
        y = Math.floor(y / squaresize);
    }

    // first click
    if(clicks == 1){
        let firstclick = board[y][x];
        // check if white clicked and whites move
        if(firstclick[0] == "W" && WhiteMove == true){
            if(firstclick != "---"){
                firsty = y
                firstx = x
                clicks = 2
                WhiteMove = false
            }
        }
        // check if black clicked and black move
        else if(firstclick[0] == "B" && WhiteMove != true){
            if(firstclick != "---"){
                firsty = y
                firstx = x
                clicks = 2
                WhiteMove = true
            }
        } 
        // reset click
        else{
            clicks = 1;
        }     

    } 
    // second click
    else{
        checkmove(firsty, firstx, y, x, moves)
        // checks that the same square is not clicked twice
        if(board[y][x] != board[firsty][firstx] && legalmove == true){
            updateposition(firsty, firstx, y, x)
            clicks = 1;
            totalturns = totalturns + 1
            validmoves()
        }
        // reset click
        else{
            clicks = 1;

            // reset players move
            if(WhiteMove == true){
                WhiteMove = false
            }
            else{
                WhiteMove = true
            }
        }
    
    }  

    
}

async function getusernames() {
    try {
        const response = await fetch('userData.json'); // Fetch JSON file
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json(); // Parse JSON response
        // Now you can use the 'userData' variable containing the JSON data
        document.getElementById("coordinate").innerHTML = userData;
        // Call any function or perform any operation with the userData
    } catch (error) {
        console.error('Error:', error.message);
        document.getElementById("test").innerHTML = error;
    }
}

// setting the position of the pieces on start
function start(){
    getusernames()
    validmoves()
    // rows
    for(r = 0; r<8; r++){
        // collums
        for(c = 0; c<8; c++){
            //specific square
            piece = String(board[r][c]);
            // checks if the square is blank
            if(piece == "---"){
                continue;
            }
            // if the square contains a piece
            else{
                // the coordinates of the piece
                y = (r* squaresize);
                x = (c* squaresize);
                var PieceY = document.getElementById(piece).offsetTop;
                var PieceX = document.getElementById(piece).offsetLeft;
                PieceY = PieceY + y;
                document.getElementById(piece).style.top = PieceY + "px";
                PieceX = PieceX + x;
                document.getElementById(piece).style.left = PieceX + "px";
            }
            
        }
    }
    

}

// gets all moves including check
function validmoves(){
    getAllMoves(board, true, WhiteMove)
    tempboardstate = board
    // checking if in check
    for(x=0; x < moves.length; x=x+4){
        lookingforcheck(moves[x], moves[x+1], moves[x+2], moves[x+3])
    }
    if(moves.length == 0){
        if(WhiteMove == true){
            document.getElementById("coordinate").innerHTML = "Black wins by checkmate"
        }
        else{
            document.getElementById("coordinate").innerHTML = "White wins by checkmate"
        }
        
    }
    document.getElementById("test2").innerHTML = "Running on http://127.0.0.1:5000/"
}


// looking for check 
function lookingforcheck(startingY, startingX, endingY, endingX){

    // making a copy of the board and moving each piece
    checkboard = board;
    temp = checkboard[endingY][endingX]
    checkboard[endingY][endingX] = checkboard[startingY][startingX]
    checkboard[startingY][startingX] = "---"
    
    // calculating oposing players moves
    if(WhiteMove == true){
            getAllMoves(checkboard, false, false)
    }
    else{
        getAllMoves(checkboard, false, true)
    }

    // going through all the oposing players moves
    for(a=0; a < opmoves.length; a=a+4){
        if(checkboard[opmoves[a+2]][opmoves[a+3]][1] == "K"){
            moves.splice(x, 4)
            x = x - 4
        }
    }
    // undoing the boardstate
    checkboard[startingY][startingX] = checkboard[endingY][endingX]
    checkboard[endingY][endingX] = temp
   
}


// gets all the possible legal moves excluding check
function getAllMoves(board, movetype, Movecolour){
    if (movetype == true){
        moves = []
    }
    else{
        opmoves = []
    }
    
    for(r = 0; r<8; r++){
        for(c = 0; c<8; c++){

            // colour and piece type
            turn = board[r][c][0];
            piece = board[r][c][1];
            if(Movecolour == true){
                allypiece = "W"
                enemymove = "B"
            }
            else if(Movecolour != true){
                enemymove = "W"
                allypiece = "B"
            }
            // pawn movement
            if (piece == "P"){
                PawnMovement(r, c, turn, moves);
            }
            // knight
            else if(piece == "N"){
                KnightMovement(r, c, turn, moves);
            }
            // rook
            else if(piece == "R"){
                RookMovement(r, c, turn, moves);
            }
            // bishop
            else if(piece == "B"){
                BishopMovement(r, c, turn, moves);
            }
            // king
            else if(piece == "K"){
                KingMovement(r, c, turn, moves);
            }
            // queen
            else{
                BishopMovement(r, c, turn, moves);
                RookMovement(r, c, turn, moves);
            }
        }
    }

    // pawn movement
    function PawnMovement(r, c, turn, moves){
        // whites pawn movement
        if(turn == "W" && Movecolour == true){
            if(r-1 >= 0){
                // checks square above
                if(board[r-1][c] == "---"){
                    pushvalues(r, c, r-1, c, moves, movetype)
                    
                    // two square move
                    if(r == 6 && board[r - 2][c] == "---"){
                        pushvalues(r, c, r-2, c, moves, movetype)
                    }
                }
                // captures to the left
                if(c - 1 >= 0){
                    if(board[r-1][c-1][0] == "B"){
                        pushvalues(r, c, r-1, c-1, moves, movetype)
                    }
                }
                // captures to the right
                if(c + 1 <= 7){
                    if(board[r-1][c+1][0] == "B"){
                        pushvalues(r, c, r-1, c+1, moves, movetype)
                    }
                }
            }
           
        } 

        // blacks pawn movement
        if(turn == "B" && Movecolour != true){
            if(r+1 <= 7){
                // checks 1 square above
                if(board[r+1][c] == "---"){
                    pushvalues(r, c, r+1, c, moves, movetype)
                    
                    // checks 2 squares above
                    if(r == 1 && board[r + 2][c] == "---"){
                        pushvalues(r, c, r+2, c, moves, movetype)
                    }
                }

            }
            // captures to the left
            if(c - 1 >= 0){
                if(board[r+1][c-1][0] == "W"){
                    pushvalues(r, c, r+1, c-1, moves, movetype)
                }
            }
            // captures to the right
            if(c + 1 <= 7){
                if(board[r+1][c+1][0] == "W"){
                    pushvalues(r, c, r+1, c+1, moves, movetype)
                }
            }
        }
    }

    // rook movement
    function RookMovement(r, c, turn, moves) {
        const directions = [ [-1, 0], [0, -1], [1, 0], [0, 1] ];
    
        for (const d of directions) {
            for (let i = 1; i < 8; i++) {
                const endRow = r + d[0] * i;
                const endCol = c + d[1] * i;
    
                if (!(0 <= endRow && endRow < 8 && 0 <= endCol && endCol < 8)) {
                    break;
                }
    
                const endPiece = board[endRow][endCol];
    
                if (endPiece === "---") {
                    pushvalues(r, c, endRow, endCol, moves, movetype);
                } else if (endPiece[0] === enemymove) {
                    pushvalues(r, c, endRow, endCol, moves, movetype);
                    break;
                } else {
                    break;
                }
            }
        }
    }

    // knight movement
    function KnightMovement(r, c, turn, moves){
        knightdirections = []

        knightdirections.push(-2)
        knightdirections.push(-1)

        knightdirections.push(-2)
        knightdirections.push(1)

        knightdirections.push(-1)
        knightdirections.push(-2)

        knightdirections.push(-1)
        knightdirections.push(2)

        knightdirections.push(1)
        knightdirections.push(-2)

        knightdirections.push(1)
        knightdirections.push(2)

        knightdirections.push(2)
        knightdirections.push(-1)

        knightdirections.push(2)
        knightdirections.push(1)      

        for(d = 0; d <16; d = d + 2){
            value1 = knightdirections[d]
            value2 = knightdirections[d+1] 
            endRow = r + value1
            endCol = c + value2
            
            
            if(endRow < 8 && endRow >= 0){
                if(endCol < 8 && endCol >= 0){
                    endPiece = board[endRow][endCol]
                    if(endPiece[0] != allypiece){
                        pushvalues(r, c, endRow, endCol, moves, movetype)
                    }
                }
                
            }
           
           
        }
    }

    // bishop movement
    function BishopMovement(r, c, turn, moves) {
        const directions = [ [-1, -1], [-1, 1], [1, -1], [1, 1] ];
    
        for (const d of directions) {
            const [dr, dc] = d;
    
            for (let i = 1; i < 8; i++) {
                const endRow = r + dr * i;
                const endCol = c + dc * i;
    
                if (!(0 <= endRow && endRow < 8 && 0 <= endCol && endCol < 8)) {
                    break;
                }
    
                const endPiece = board[endRow][endCol];
    
                if (endPiece === "---") {
                    pushvalues(r, c, endRow, endCol, moves, movetype);
                } else if (endPiece[0] === enemymove) {
                    pushvalues(r, c, endRow, endCol, moves, movetype);
                    break;
                } else {
                    break;
                }
            }
        }
    }
    

    // king movement
    function KingMovement(r, c, turn, moves){
        kingdirections = []

        kingdirections.push(-1)
        kingdirections.push(-1)

        kingdirections.push(-1)
        kingdirections.push(0)

        kingdirections.push(-1)
        kingdirections.push(1)

        kingdirections.push(0)
        kingdirections.push(-1)

        kingdirections.push(0)
        kingdirections.push(1)

        kingdirections.push(1)
        kingdirections.push(-1)

        kingdirections.push(1)
        kingdirections.push(0)

        kingdirections.push(1)
        kingdirections.push(1)

        for(d = 0; d < 16; d = d + 2){
            value1 = kingdirections[d]
            value2 = kingdirections[d+1] 
            endRow = r + value1
            endCol = c + value2
            if(0 <= endRow && endRow < 8){
                if(0 <= endCol && endCol < 8){
                    endPiece = board[endRow][endCol]
                    if(endPiece[0] != allypiece){
                        pushvalues(r, c, endRow, endCol, moves, movetype)
                    }
                }
            }
        }
    }
}
function pushvalues(startY, startX, newY, newX, moves, movetype) {
    // updating the regular move set
    if(movetype == true){
        // removing unwanted moves from the move set
        if(board[startY][startX][0] != board[newY][newX][0]){
            if(WhiteMove == true && board[startY][startX][0] == "W" || WhiteMove != true && board[startY][startX][0] == "B"){ 
                moves.push(startY);
                moves.push(startX);
                moves.push(newY);
                moves.push(newX);   
            }
        
        }
    }
    else{
        // updating the future move set
        // removing the unwanted moves
        if(board[startY][startX][0] != board[newY][newX][0]){
            if(WhiteMove == true && board[startY][startX][0] == "B" || WhiteMove != true && board[startY][startX][0] == "W"){ 
                opmoves.push(startY);
                opmoves.push(startX);
                opmoves.push(newY);
                opmoves.push(newX);  

            }   
        }
       
    }
}

// updating the position of the piece
function updateposition(startY, startX, EndY, EndX){
    // removing any pieces on square moved to
    if(board[EndY][EndX] != "---"){
        var Removal = document.getElementById(board[EndY][EndX])
        Removal.remove();     
    }
    currentpieces = []
    // updating the piece position
    board[EndY][EndX] = board[startY][startX];
    piece = String(board[EndY][EndX]);
  
    // getting the current piece location
    var pieceX = document.getElementById(piece).offsetLeft;
    var pieceY = document.getElementById(piece).offsetTop;

    // calculating the Y change
    differenceY = EndY - startY
    y = (differenceY * squaresize)
    pieceY = pieceY + y;

    // calculating the X change
    differenceX = EndX - startX
    x = (differenceX * squaresize)
    pieceX = pieceX + x;
    
    // updating the position
    document.getElementById(piece).style.top = pieceY + "px";
    document.getElementById(piece).style.left = pieceX + "px";
    
    
    // clearing the current square
    board[startY][startX] = "---"
    moves = []

    // checking for incufficent material
    for(x=0; x<8; x=x+1){
        for(y=0; y<8; y=y+1){
            if(board[y][x] != "---"){
                currentpieces.push(board[y][x])
            }
        }
    }

   
}

// check that the move is within the list
function checkmove(firstY, firstX, y, x, moves){
    // looping through all the coordinates
    function loop(firstY, firstX, y, x, moves, i){
        // do the starting coordinates match
        if(moves[i] == firstY && moves[i+1] == firstX){
            // do the end coordinates match
            if(moves[i+2] == y && moves[i+3] == x){ 
                
                // updating the white king location
                if(board[firstY][firstX] == "WK1"){
                    whitekinglocation = []
                    whitekinglocation.push(y)
                    whitekinglocation.push(x)
                    legalmove = true
                }

                // updating the black king location
                else if(board[firstY][firstX] == "BK1"){
                    blackkinglocation = []
                    blackkinglocation.push(y)
                    blackkinglocation.push(x)
                    legalmove = true
                }
                else{
                    legalmove = true
                }
                
                
            }
            // non match
            else{
                // loop through again
                if(i + 4 < moves.length){
                    i = i + 4
                    loop(firstY, firstX, y, x, moves, i)
                }
                else{
                    // not a legal move
                    legalmove = false
                }
               
            }
        }
        else{
            // loop through again
            if(i + 4 < moves.length){
                i = i + 4
                loop(firstY, firstX, y, x, moves, i)
            }
            // not a legal move
            else{
                legalmove = false
            }
        }
    }
    i = 0
    loop(firstY, firstX, y, x, moves, i)
}
