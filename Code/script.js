// size of the squares
squaresize = 500 / 8;
xstart = 309;
ystart = 10;
let square = document.getElementById("square");

// starting values
WhiteMove = true
clicks = 1;
Movemade = false
legalmove = false
colour1 = "#769656"
colour2 = "#eeeed2"
testlist = []
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

            moves = validmoves();
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

// setting the position of the pieces on start
function start(){
    moves = validmoves();
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
    getAllMoves(true)
    // going through each of the next moves and seeing if it puts the king in check
    for(i=0; i < moves.length; i = i + 4){
        futureboard(moves[i], moves[i+1], moves[i+2], moves[i+3])
    }  
    return moves
}


function futureboard(y1, x1, y2, x2){
    future = board
    // making the next move
    storedvalue = future[y2][x2]
    future[y2][x2] = future[y1][x1]
    future[y1][x1] = "---" 

    // checking the move after that
    getAllMoves(false)
    document.getElementById("coordinate").innerHTML = futuremoves
    
    //undoing the move
    future[y1][x1] = future[y2][x2]
    future[y2][x2] = storedvalue
    return moves
       
}



function incheck(){

}

// gets all the possible legal moves excluding check
function getAllMoves(movetype){
    if(movetype == false){
        tempboard = board
        board = future
    }
    moves = []
    futuremoves = []
    for(r = 0; r<8; r++){
        for(c = 0; c<8; c++){

            // colour and piece type
            turn = board[r][c][0];
            piece = board[r][c][1];
            if(WhiteMove == true){
                allypiece = "W"
                enemymove = "B"
            }
            else if(WhiteMove != true){
                enemymove = "W"
                allypiece = "B"
            }
            // pawn movement
            if (piece == "P"){
                PawnMovement(r, c, turn, moves);
            }
            // knight
            else if(piece == "N"){
                // KnightMovement(r, c, turn, moves);
            }
            // rook
            else if(piece == "R"){
                // RookMovement(r, c, turn, moves);
            }
            // bishop
            else if(piece == "B"){
                // BishopMovement(r, c, turn, moves);
            }
            // king
            else if(piece == "K"){
                //  KingMovement(r, c, turn, moves);
            }
            // queen
            else{
                // BishopMovement(r, c, turn, moves);
                // RookMovement(r, c, turn, moves);
            }
        }
    }

    // pawn movement
    function PawnMovement(r, c, turn, moves){
        // whites pawn movement
        if(turn == "W" && WhiteMove == true){
            if(r-1 >= 0){
                // checks square above
                if(board[r-1][c] == "---"){
                    pushvalues(r, c, r-1, c, moves, movetype, futuremoves)
                    
                    // two square move
                    if(r == 6 && board[r - 2][c] == "---"){
                        pushvalues(r, c, r-2, c, moves, movetype, futuremoves)
                    }
                }
                // captures to the left
                if(c - 1 >= 0){
                    if(board[r-1][c-1][0] == "B"){
                        pushvalues(r, c, r-1, c-1, moves, movetype, futuremoves)
                    }
                }
                // captures to the right
                if(c + 1 <= 7){
                    if(board[r-1][c+1][0] == "B"){
                        pushvalues(r, c, r-1, c+1, moves, movetype, futuremoves)
                    }
                }
            }
           
        } 

        // blacks pawn movement
        if(turn == "B" && WhiteMove != true){
            if(r+1 <= 7){
                // checks 1 square above
                if(board[r+1][c] == "---"){
                    pushvalues(r, c, r+1, c, moves, movetype, futuremoves)
                    
                    // checks 2 squares above
                    if(r == 1 && board[r + 2][c] == "---"){
                        pushvalues(r, c, r+2, c, moves, movetype, futuremoves)
                    }
                }

            }
            // captures to the left
            if(c - 1 >= 0){
                if(board[r+1][c-1][0] == "W"){
                    pushvalues(r, c, r+1, c-1, moves, movetype, futuremoves)
                }
            }
            // captures to the right
            if(c + 1 <= 7){
                if(board[r+1][c+1][0] == "W"){
                    pushvalues(r, c, r+1, c+1, moves, movetype, futuremoves)
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
                    pushvalues(r, c, endRow, endCol, moves, movetype, futuremoves);
                } else if (endPiece[0] === enemymove) {
                    pushvalues(r, c, endRow, endCol, moves, movetype, futuremoves);
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
            // testlist.push(value1)
            // document.getElementById("coordinate").innerHTML = testlist
            
            if(endRow < 8 && endRow >= 0){
                if(endCol < 8 && endCol >= 0){
                    endPiece = board[endRow][endCol]
                    if(endPiece[0] != allypiece){
                        pushvalues(r, c, endRow, endCol, moves, movetype, futuremoves)
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
                    pushvalues(r, c, endRow, endCol, moves, movetype, futuremoves);
                } else if (endPiece[0] === enemymove) {
                    pushvalues(r, c, endRow, endCol, moves, movetype, futuremoves);
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
                        pushvalues(r, c, endRow, endCol, moves, movetype, futuremoves)
                    }
                }
            }
        }
    }
}
function pushvalues(startY, startX, newY, newX, moves, movetype, futuremoves) {
    if (movetype === true) {
        moves.push(startY);
        moves.push(startX);
        moves.push(newY);
        moves.push(newX);
    }
    
    if (movetype === false) {
        futuremoves.push(startY);
        futuremoves.push(startX);
        futuremoves.push(newY);
        futuremoves.push(newX);
        board = tempboard; 
    }

   
}

// updating the position of the piece
function updateposition(startY, startX, EndY, EndX){
    // removing any pieces on square moved to
    if(board[EndY][EndX] != "---"){
        var Removal = document.getElementById(board[EndY][EndX])
        Removal.remove();     
    }

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
                    // document.getElementById("coordinate").innerHTML = whitekinglocation
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