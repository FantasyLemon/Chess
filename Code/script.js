squaresize = 500 / 8;
xstart = 390;
// xstart = 709;
ystart = 10;
let square = document.getElementById("square");
var WP1Movement = document.getElementById("WP1");
var WR1 = document.getElementById("WR1");
clicks = 1
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


function showCoords(event) {
   
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

    let text = String(board[y][x]);
    document.getElementById("coordinate").innerHTML = text; 

    if(clicks == 1){
        FirstValue = [y, x]
        PieceType = text
        clicks = 2

    } else{
        var PieceY = document.getElementById(PieceType).offsetTop;
        var PieceX = document.getElementById(PieceType).offsetLeft;
        x = (x * squaresize)
        y = (y * squaresize)
        var xMovement = x
        var yMovement = y
        PieceY = PieceY + yMovement;
        document.getElementById(piece).style.top = PieceY + "px";
        PieceX = PieceX + xMovement;
        document.getElementById(piece).style.left = PieceX + "px";
        clicks = 1
    }  

}

function Start(){
    for(r = 0; r<8; r++){
        for(c = 0; c<8; c++){
            piece = String(board[r][c]);
            if(piece == "---"){
                continue;
            }
            else{
                y = 0 + (r* squaresize)
                x = 0 + (c* squaresize)
                var xMovement = x
                var yMovement = y
                var PieceY = document.getElementById(piece).offsetTop;
                var PieceX = document.getElementById(piece).offsetLeft;
                PieceY = PieceY + yMovement;
                document.getElementById(piece).style.top = PieceY + "px";
                PieceX = PieceX + xMovement;
                document.getElementById(piece).style.left = PieceX + "px";
            }
            
        }
    }
    

}

    
