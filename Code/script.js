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



// setting the position of the pieces on start
function start(){
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
    firstmoves = moves.slice();
    // cycling through all the sets of moves
    for(i=0; i < firstmoves.length; i = i + 4){  
        possiblecheck(firstmoves[i], firstmoves[i+1], firstmoves[i+2], firstmoves[i+3])
    }

    // detemines whether currently in check
    if(determinecheck() == true){
        check = true
        // removes moves from in check
        incheck()
        // check
        if(moves.length > 1){
            document.getElementById("test").innerHTML = "Check"
        }
        // checkmate
        else{
            document.getElementById("test").innerHTML = "Checkmate"
        }
        
    }
    // hide the message whilst not in check
    else{
        check = false
        document.getElementById("test").innerHTML = " "
    }

    
    
}

// remove moves once in chekc
function incheck(){
    for(l = 0; l < moves.length; l=l+4){

        // creates a copy of the board
        checkboard = board;
        // moves the pieces
        checktemp = checkboard[moves[l+2]][moves[l+3]]
        checkboard[moves[l+2]][moves[l+3]] = checkboard[moves[l]][moves[l+1]]
        checkboard[moves[l]][moves[l+1]] = "---"
        // switch players turn
        if(WhiteMove == true){
            opcolour = false
        }
        else{
            opcolour = true
        }

        // retrieve oposing players moves
        getAllMoves(checkboard, false, opcolour)
       
        //undoing the move
        checkboard[moves[l]][moves[l+1]] = checkboard[moves[l+2]][moves[l+3]]
        checkboard[moves[l+2]][moves[l+3]] = checktemp

        for(m=0; m<opmoves.length; m = m + 4){
            checksquare = board[opmoves[m+2]][opmoves[m+3]]

            // removes the moves that put the king in
            if(checksquare[1] == "K"){   
                moves.splice(l, 4)
                l = l - 4;
                    
            }            
            
        }
       
        // king movements
        for(p=0; p < moves.length; p = p + 4){
            if(board[moves[p]][moves[p+1]][1] == "K"){
                kingboard = board
                kingtemp = kingboard[moves[p+2]][moves[p+3]]
                // moving the king
                if(WhiteMove == true){
                    kingboard[moves[p+2]][moves[p+3]] = "WK1"
                }
                else{
                    kingboard[moves[p+2]][moves[p+3]] = "BK1"
                }
                getAllMoves(kingboard, false, opcolour)
                // removing any king moves into check
                for(q=0; q < opmoves.length; q = q + 4){
                    if(kingboard[opmoves[q+2]][opmoves[q+3]][1] == "K"){ 
                        moves.splice(l, 4)
                        l = l - 4;
                    }
                }
                // undoing the future moves
                kingboard[moves[p]][moves[p+1]] = kingboard[moves[p+2]][moves[p+3]]
                kingboard[moves[p+2]][moves[p+3]] = kingtemp
            }
        }

   }
   document.getElementById("coordinate").innerHTML = moves
   
}

// prevents pieces from being moved that open up the king to being taken
function possiblecheck(sy, sx, ey, ex){
    // creating a copy of the board
    futureboard = board;
    // moving each move
    temp = futureboard[ey][ex]
    futureboard[ey][ex] = futureboard[sy][sx]
    futureboard[sy][sx] = "---"
    // changing the players turn
    if(WhiteMove == true){
        opcolour = false
    }
    else{
        opcolour = true
    }
    // retrieving all moves from future state
    getAllMoves(futureboard, false, opcolour)
    // document.getElementById("test").innerHTML = opmoves
    futureboard[sy][sx] = futureboard[ey][ex]
    futureboard[ey][ex] = temp
    moves = firstmoves

    for(j=0; j < opmoves.length; j = j + 4){
        endSquare = futureboard[opmoves[j+2]][opmoves[j+3]]
        
        // is the endsquare a king
        if(endSquare[1] == "K"){
            if(WhiteMove == true && endSquare[0] == "W" || WhiteMove == false && endSquare[0] == "B"){
                // remove the movement
                moves.splice(i, 4);

                // checking whether that piece can move to another location
                samestart = moves[i]
                sameend = moves[i+1]
                for(k=0; k<moves.length; k = k + 4){
                    if(moves[k] == samestart && moves[k+1] == sameend){
                        moves.splice(k, 4);
                    }
                }
            }
        }
    }

    // reseting the board

}

// determine wether current player is in check
function determinecheck(){
    if(WhiteMove == true){
        return underattack(whitekinglocation[0], whitekinglocation[1])
    }
    else{
        return underattack(blackkinglocation[0], blackkinglocation[1])
    }
}

// determines if the enemy can attack the square containing the king
function underattack(kingrow, kingcol){
    // switches to opponents turn
    if(WhiteMove == true){
        opcolour = false
    }
    else{
        opcolour = true
    }
    // generates all moves on the board
    getAllMoves(board, false, opcolour)

    for(k=0; k < opmoves.length; k=k+4){
        endSquare = futureboard[opmoves[k+2]][opmoves[k+3]]
        
        // square is under attack
        if(endSquare[1] == "K"){
            if(WhiteMove == true && endSquare[0] == "W" || WhiteMove == false && endSquare[0] == "B"){
                return true
            }
            
        }

        
    }

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

    // checking for incufficent material
    for(x=0; x<8; x=x+1){
        for(y=0; y<8; y=y+1){
            if(board[y][x] != "---"){
                currentpieces.push(board[y][x])
            }
        }
    }

    if(currentpieces.length == 2){
        if(check == true){
            document.getElementById("coordinate").innerHTML = "checkmate"
        }
        else{
             document.getElementById("coordinate").innerHTML = "stalemate: insufficient materiel"
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