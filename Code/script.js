squaresize = 500 / 8;
xstart = 309;
ystart = 10;
let square = document.getElementById("square");
WhiteMove = true
clicks = 1;
Movemade = false
legalmove = false
testlist = []
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
        Row1.style.backgroundColor = "brown"
    }
    else{
        Row1.style.background = "white"
    }
    square.appendChild(Row1)
}

// row 2 
for(i=1; i< 9; i++){
    let Row2 = document.createElement("div")
    if(i % 2 == 0){
        Row2.style.backgroundColor = "white"
    }
    else{
        Row2.style.background = "brown"
    }
    square.appendChild(Row2)
}

// row 3 
for(i=1; i< 9; i++){
    let Row3 = document.createElement("div")
    if(i % 2 == 0){
        Row3.style.backgroundColor = "brown"
    }
    else{
        Row3.style.background = "white"
    }
    square.appendChild(Row3)
}

// row 4 
for(i=1; i< 9; i++){
    let Row4 = document.createElement("div")
    if(i % 2 == 0){
        Row4.style.backgroundColor = "white"
    }
    else{
        Row4.style.background = "brown"
    }
    square.appendChild(Row4)
}
// row 5 
for(i=1; i< 9; i++){
    let Row5 = document.createElement("div")
    if(i % 2 == 0){
        Row5.style.backgroundColor = "brown"
    }
    else{
        Row5.style.background = "white"
    }
    square.appendChild(Row5)
}

// row 6
for(i=1; i< 9; i++){
    let Row6 = document.createElement("div")
    if(i % 2 == 0){
        Row6.style.backgroundColor = "white"
    }
    else{
        Row6.style.background = "brown"
    }
    square.appendChild(Row6)
}

// row 7
for(i=1; i< 9; i++){
    let Row7 = document.createElement("div")
    if(i % 2 == 0){
        Row7.style.backgroundColor = "brown"
    }
    else{
        Row7.style.background = "white"
    }
    square.appendChild(Row7)
}

//row 8
for(i=1; i< 9; i++){
    let Row8 = document.createElement("div")
    if(i % 2 == 0){
        Row8.style.backgroundColor = "white"
    }
    else{
        Row8.style.background = "brown"
    }
    square.appendChild(Row8)
}


function movePiece(event) {
   
    // let text = "X: " + x + " Y: " + y;
    // list finds index searching y then x so the x and y need to be swapped
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
            validmoves();
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
    validmoves();
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
    getAllMoves();
}

// gets all the possible legal moves excluding check
function getAllMoves(){
    moves = []
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
        if(turn == "W" && WhiteMove == true){
            if(r-1 >= 0){
                // checks square above
                if(board[r-1][c] == "---"){
                    pushvalues(r, c, r-1, c, moves)
                    
                    // two square move
                    if(r == 6 && board[r - 2][c] == "---"){
                        pushvalues(r, c, r-2, c, moves)
                    }
                }
                // captures to the left
                if(c - 1 >= 0){
                    if(board[r-1][c-1][0] == "B"){
                        pushvalues(r, c, r-1, c-1, moves)
                    }
                }
                // captures to the right
                if(c + 1 <= 7){
                    if(board[r-1][c+1][0] == "B"){
                        pushvalues(r, c, r-1, c+1, moves)
                    }
                }
            }
           
        } 

        // blacks pawn movement
        if(turn == "B" && WhiteMove != true){
            if(r+1 <= 7){
                // checks 1 square above
                if(board[r+1][c] == "---"){
                    pushvalues(r, c, r+1, c, moves)
                    
                    // checks 2 squares above
                    if(r == 1 && board[r + 2][c] == "---"){
                        pushvalues(r, c, r+2, c, moves)
                    }
                }

            }
            // captures to the left
            if(c - 1 >= 0){
                if(board[r+1][c-1][0] == "W"){
                    pushvalues(r, c, r+1, c-1, moves)
                }
            }
            // captures to the right
            if(c + 1 <= 7){
                if(board[r+1][c+1][0] == "W"){
                    pushvalues(r, c, r+1, c+1, moves)
                }
            }
        }
    }

    // rook movement
    function RookMovement(r, c, turn, moves){
        // all possible directions for a rook
        rookdirections = []
        // up
        rookdirections.push(-1)
        rookdirections.push(0)
        // left
        rookdirections.push(0)
        rookdirections.push(-1)
        // down
        rookdirections.push(1)
        rookdirections.push(0)
        // right
        rookdirections.push(0)
        rookdirections.push(1)
        // cycling through all directions
        for (d = 0; d<8; d = d + 2){
            // extending until the end of the board
            for (i = 0; i<8; i++){
                // getting new coordinates
                value1 = rookdirections[d] * i
                value2 = rookdirections[d+1] * i
                endRow = r + value1
                endCol = c + value2
                // checking the coordinates are on the grid
                if(endRow < 8 && endRow >= 0){
                    if(endCol < 8 && endCol >= 0){
                        // getting new piece
                        endPiece = board[endRow][endCol]
                        // adds empty squares to the list
                        if(endPiece[0] == "-"){
                            pushvalues(r, c, endRow, endCol, moves)
                        }
                        // adding enemy pieces to the list of moves
                        else if(endPiece[0] == enemymove){
                            pushvalues(r, c, endRow, endCol, moves)
                            // stops the piece being able to move past enemy pieces
                            break
                        }
                        // testlist.push(enemymove)
                        // document.getElementById("coordinate").innerHTML = testlist
                    }
                    else{
                        break
                    }
                }
                else{
                    break
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
                        pushvalues(r, c, endRow, endCol, moves)
                    }
                }
                
            }
           
           
        }
    }

    // bishop movement
    function BishopMovement(r, c, turn, moves){
        bishopdirections = []

        bishopdirections.push(-1)
        bishopdirections.push(-1)

        bishopdirections.push(-1)
        bishopdirections.push(1)

        bishopdirections.push(1)
        bishopdirections.push(-1)

        bishopdirections.push(1)
        bishopdirections.push(1)

        for (d = 0; d<8; d = d + 2){
            // extending until the end of the board
            for (i = 0; i<8; i++){
                // getting new coordinates
                value1 = bishopdirections[d] * i
                value2 = bishopdirections[d+1] * i
                endRow = r + value1
                endCol = c + value2
                // checking the coordinates are on the grid
                if(endRow < 8 && endRow >= 0){
                    if(endCol < 8 && endCol >= 0){
                        // getting new piece
                        endPiece = board[endRow][endCol]
                        // adds empty squares to the list
                        if(endPiece[0] == "-"){
                            pushvalues(r, c, endRow, endCol, moves)
                        }
                        // adding enemy pieces to the list of moves
                        else if(endPiece[0] == enemymove){
                            pushvalues(r, c, endRow, endCol, moves)
                            // stops the piece being able to move past enemy pieces
                            break
                        }
                    }
                    else{
                        break
                    }
                }
                else{
                    break
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
                        pushvalues(r, c, endRow, endCol, moves)
                    }
                }
            }
        }
    }
}
function pushvalues(startY, startX, newY, newX, moves){
    moves.push(startY)
    moves.push(startX)
    moves.push(newY)
    moves.push(newX)
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
                legalmove = true
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