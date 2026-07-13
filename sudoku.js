/* ==================================
   SUDOKU PREMIUM JAVASCRIPT
   DIO 1/3
================================== */



const LEVELS = {

    "4":{
        size:4,
        remove:7
    },


    "9easy":{
        size:9,
        remove:42
    },


    "9hard":{
        size:9,
        remove:55
    }

};




let gameFinished = false;

let selectedLevel = null;

let leaderboardLevel = "4";


let playerName = "";



let SIZE = 4;

let REMOVE = 7;



let solution = [];

let board = [];

let fixed = [];



let selectedCell = null;



let mistakes = 0;



let timer = null;

let startTime = null;



let records =
JSON.parse(
localStorage.getItem("sudokuRezultati")
)
||
[];







const setupScreen =
document.getElementById(
"setup-screen"
);



const gameScreen =
document.getElementById(
"game-screen"
);



const boardDiv =
document.getElementById(
"board"
);



const numpad =
document.getElementById(
"numpad"
);



const nameInput =
document.getElementById(
"player-name"
);



const timerDisplay =
document.getElementById(
"timer-display"
);



const mistakesDisplay =
document.getElementById(
"mistakes"
);



const message =
document.getElementById(
"message"
);





const setupFeedback =
document.getElementById(
"setup-feedback"
);









/* ==================================
 PORUKE
================================== */


function showMessage(text,type=""){


    message.textContent = text;


    message.className="";


    if(type){

        message.classList.add(type);

    }


}









function setupMessage(text){


    setupFeedback.textContent=text;


}










/* ==================================
 ODABIR NIVOA
================================== */


document
.querySelectorAll(".level-tile")
.forEach(tile=>{


    tile.onclick=()=>{


        document
        .querySelectorAll(".level-tile")
        .forEach(t=>{

            t.classList.remove(
            "active"
            );

        });



        tile.classList.add(
        "active"
        );



        selectedLevel =
        tile.dataset.level;



    };


});











/* ==================================
 START IGRE
================================== */



document
.getElementById("start-btn")
.onclick=()=>{


    playerName =
    nameInput.value.trim();



    if(playerName===""){


        setupMessage(
        "Unesi ime igrača."
        );


        return;

    }



    if(!selectedLevel){


        setupMessage(
        "Izaberi težinu."
        );


        return;


    }




    SIZE =
    LEVELS[selectedLevel].size;



    REMOVE =
    LEVELS[selectedLevel].remove;



    leaderboardLevel =
    selectedLevel;




    setupScreen
    .classList
    .add("hidden");



    gameScreen
    .classList
    .remove("hidden");



    newGame();



};













/* ==================================
 TIMER
================================== */



function startTimer(){


    clearInterval(timer);



    startTime =
    Date.now();



    timerDisplay.textContent="0s";



    timer =
    setInterval(()=>{


        let sec =
        Math.floor(
        (Date.now()-startTime)
        /
        1000
        );



        timerDisplay.textContent =
        sec+"s";



    },1000);


}







function getTime(){


    return Math.floor(

        (Date.now()-startTime)

        /

        1000

    );


}









/* ==================================
 SHUFFLE
================================== */


function shuffle(array){


    for(
    let i=array.length-1;
    i>0;
    i--
    ){


        let j =
        Math.floor(
        Math.random()*(i+1)
        );


        [
        array[i],
        array[j]
        ]
        =
        [
        array[j],
        array[i]
        ];


    }


    return array;


}









/* ==================================
 PRAZNA TABELA
================================== */


function createEmpty(size){


    return Array.from(

        {
            length:size
        },

        ()=>Array(size).fill(0)

    );


}









/* ==================================
 PROVJERA BROJA
================================== */


function isSafe(grid,row,col,num,size){



    for(let x=0;x<size;x++){


        if(grid[row][x]===num)

        return false;


    }



    for(let x=0;x<size;x++){


        if(grid[x][col]===num)

        return false;


    }




    let box =
    Math.sqrt(size);



    let startRow =
    row-row%box;



    let startCol =
    col-col%box;





    for(
    let r=0;
    r<box;
    r++
    ){


        for(
        let c=0;
        c<box;
        c++
        ){


            if(
            grid[startRow+r]
            [startCol+c]
            ===num
            )

            return false;


        }


    }




    return true;


}









/* ==================================
 POPUNJAVANJE TABELE
================================== */


function fillGrid(grid){



    let empty =
    findEmpty(grid);



    if(!empty)

    return true;




    let nums =
    [];


    for(
    let i=1;
    i<=SIZE;
    i++
    ){

        nums.push(i);

    }



    shuffle(nums);




    for(let num of nums){



        if(
        isSafe(
        grid,
        empty.row,
        empty.col,
        num,
        SIZE
        )
        ){


            grid
            [empty.row]
            [empty.col]
            =
            num;



            if(
            fillGrid(grid)
            )

            return true;



            grid
            [empty.row]
            [empty.col]
            =
            0;


        }


    }



    return false;


}






function findEmpty(grid){



    for(
    let r=0;
    r<SIZE;
    r++
    ){


        for(
        let c=0;
        c<SIZE;
        c++
        ){


            if(
            grid[r][c]===0
            ){


                return{

                    row:r,

                    col:c

                };


            }


        }


    }



    return null;


}

/* ==================================
   SUDOKU GENERACIJA
   DIO 2/3
================================== */





function generateSudoku(){


    let grid =
    createEmpty(SIZE);



    fillGrid(grid);



    return grid;


}







function createPuzzle(){



    solution =
    generateSudoku();



    board =
    solution.map(row=>[...row]);



    let positions=[];



    for(
    let i=0;
    i<SIZE*SIZE;
    i++
    ){

        positions.push(i);

    }



    shuffle(positions);




    for(
    let i=0;
    i<REMOVE;
    i++
    ){


        let pos =
        positions[i];



        let row =
        Math.floor(
        pos/SIZE
        );



        let col =
        pos%SIZE;



        board[row][col]=0;



    }





    fixed =
    board.map(row=>


        row.map(

            value=>value!==0

        )


    );


}










/* ==================================
   CRTANJE TABELE
================================== */


function render(){



    boardDiv.innerHTML="";



    for(
    let r=0;
    r<SIZE;
    r++
    ){



        for(
        let c=0;
        c<SIZE;
        c++
        ){



            let cell =
            document.createElement("div");



            cell.className="cell";
let boxSize = Math.sqrt(SIZE);



if((c+1)%boxSize===0 && c!==SIZE-1){

    cell.classList.add(
        "block-right"
    );

}



if((r+1)%boxSize===0 && r!==SIZE-1){

    cell.classList.add(
        "block-bottom"
    );

}


            if(
            fixed[r][c]
            ){

                cell.classList.add(
                "fixed"
                );

            }



            cell.textContent =
            board[r][c] || "";



            cell.dataset.row=r;

            cell.dataset.col=c;




            cell.onclick=()=>{


                selectedCell={

                    row:r,

                    col:c

                };


                highlight();


            };



            boardDiv.appendChild(cell);



        }


    }



    updateBoardSize();



}









/* ==================================
   VELIČINA TABELE
================================== */


function updateBoardSize(){


    if(SIZE===4){


        boardDiv.style.gridTemplateColumns =
        "repeat(4,1fr)";


    }


    else{


        boardDiv.style.gridTemplateColumns =
        "repeat(9,1fr)";


    }



}









/* ==================================
   OZNAČAVANJE POLJA
================================== */


function highlight(){



    document
    .querySelectorAll(".cell")
    .forEach(cell=>{


        cell.classList.remove(
        "selected"
        );


    });




    if(!selectedCell)

    return;





    let index =

    selectedCell.row * SIZE

    +

    selectedCell.col;





    document
    .querySelectorAll(".cell")
    [index]
    .classList
    .add("selected");



}










/* ==================================
   NUMPAD
================================== */


function createNumpad(){



    numpad.innerHTML="";



    for(
    let i=1;
    i<=SIZE;
    i++
    ){



        let btn =
        document.createElement("button");



        btn.textContent=i;



        btn.onclick=()=>{


            placeNumber(i);


        };



        numpad.appendChild(btn);



    }







    let erase =
    document.createElement("button");



    erase.textContent="⌫";



    erase.onclick=()=>{


        clearBoard();


    };



    numpad.appendChild(erase);



}









/* ==================================
   UNOS BROJA
================================== */


function placeNumber(number){



    if(!selectedCell)

    return;





    let r =
    selectedCell.row;



    let c =
    selectedCell.col;





    if(
    fixed[r][c]
    )

    return;






    board[r][c]=number;




    render();



    highlight();




    let index =

    r*SIZE+c;



    let cell =

    document
    .querySelectorAll(".cell")
    [index];




    cell.classList.remove(
    "correct",
    "error"
    );






    if(
    number === solution[r][c]
    ){



        cell.classList.add(
        "correct"
        );



    }

    else{



        cell.classList.add(
        "error"
        );



        mistakes++;



        mistakesDisplay.textContent =
        mistakes;



    }





    checkAutoWin();



}









/* ==================================
   BRISANJE
================================== */


function clearBoard(){



    if(!selectedCell)

    return;




    let r =
    selectedCell.row;



    let c =
    selectedCell.col;





    if(
    fixed[r][c]
    )

    return;





    board[r][c]=0;



    render();



    highlight();



}









/* ==================================
   TASTATURA
================================== */


document.addEventListener(
"keydown",
(e)=>{



    if(
    e.key>="1"
    &&
    e.key<=SIZE
    ){



        placeNumber(
        Number(e.key)
        );


    }






    if(
    e.key==="Backspace"
    ||
    e.key==="Delete"
    ){



        clearBoard();


    }



});
/* ==================================
   SUDOKU ZAVRŠETAK
   DIO 3/3
================================== */






/* ==================================
   PROVJERA TABELE
================================== */


function checkBoard(){



    for(
    let r=0;
    r<SIZE;
    r++
    ){


        for(
        let c=0;
        c<SIZE;
        c++
        ){



            if(
            board[r][c] !== solution[r][c]
            ){



                showMessage(
                "❌ Sudoku još nije riješen.",
                "error-message"
                );



                return;


            }


        }


    }



    finishGame();


}










/* ==================================
   AUTOMATSKA POBJEDA
================================== */


function checkAutoWin(){



    for(
    let r=0;
    r<SIZE;
    r++
    ){


        for(
        let c=0;
        c<SIZE;
        c++
        ){


            if(
            board[r][c] !== solution[r][c]
            ){


                return;


            }


        }


    }



    finishGame();



}









/* ==================================
   KRAJ IGRE
================================== */


function finishGame(){


    if(gameFinished)
        return;



    gameFinished = true;



    clearInterval(timer);



    showMessage(
    "🎉 Bravo! Sudoku je riješen!",
    "success-message"
    );



    saveResult();


}








/* ==================================
   SPREMANJE REZULTATA
================================== */


function saveResult(){



    let seconds = getTime();




    records.push({


        name:playerName,


        level:leaderboardLevel,


        mistakes:mistakes,


        seconds:seconds,


        date:new Date().toISOString()



    });







    records.sort((a,b)=>{


        if(
        a.mistakes !== b.mistakes
        ){


            return a.mistakes-b.mistakes;


        }



        return a.seconds-b.seconds;



    });







    localStorage.setItem(

        "sudokuRezultati",

        JSON.stringify(records)

    );



    renderLeaderboard();



}






/* ==================================
   RANG LISTA
================================== */


function renderLeaderboard(){


    const list =
    document.getElementById("lb-list");


    const empty =
    document.getElementById("lb-empty");



    if(!list)
        return;



    list.innerHTML="";



    let filtered =
    records.filter(
        r=>r.level===leaderboardLevel
    );



    if(filtered.length===0){


        empty.style.display="block";


        return;

    }



    empty.style.display="none";




    filtered
    .slice(0,10)
    .forEach((r,i)=>{


        let li =
        document.createElement("li");



        // medalje

        let medal =

        i===0 ? "🥇" :

        i===1 ? "🥈" :

        i===2 ? "🥉" :

        (i+1)+".";




        // klase za prva 3 mjesta

        if(i===0){

            li.classList.add("rank-gold");

        }

        else if(i===1){

            li.classList.add("rank-silver");

        }

        else if(i===2){

            li.classList.add("rank-bronze");

        }




        li.innerHTML = `


        <strong>
        ${medal}
        </strong>


        <span style="flex:1">
        ${r.name}
        </span>


        <span>
        ❌ ${r.mistakes}
        </span>


        <span>
        ⏱ ${r.seconds}s
        </span>


        `;



        list.appendChild(li);



    });


}




/* ==================================
   TABOVI RANG LISTE
================================== */


document
.querySelectorAll(".tab")
.forEach(tab=>{



    tab.onclick=()=>{



        document
        .querySelectorAll(".tab")
        .forEach(t=>{


            t.classList.remove(
            "active"
            );


        });




        tab.classList.add(
        "active"
        );




        leaderboardLevel =
        tab.dataset.level;




        renderLeaderboard();



    };



});









/* ==================================
   NOVA IGRA
================================== */


 
function newGame(){

clearInterval(timer);
gameFinished = false;

    mistakes=0;



    mistakesDisplay.textContent="0";



    selectedCell=null;



    showMessage("");



    createPuzzle();



    render();



    createNumpad();



    startTimer();



}









/* ==================================
   POVRATAK
================================== */


function goBack(){


    window.location.href =
    "minigames.html";


}










/* ==================================
   START
================================== */


renderLeaderboard();
