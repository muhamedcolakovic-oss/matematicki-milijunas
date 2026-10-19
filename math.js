/* =========================================
   MATEMATIČKI MILIJUNAŠ
   MATH EVOLUTION JS
   NOVA VERZIJA
========================================= */


// ================= STATE =================

let answering = false;

let state = {

    level:1,

    xp:0,

    coins:0,


    solved:0,

    correct:0,


    bestCombo:0,


    dailyStreak:0,

    dailyDone:"",

    dailyExpire:0,


items:{

    skins:{
        green:true,
        blue:false,
        purple:false,
        gold:false,
        diamond:false
    },

    activeSkin:"green",

    life:false,

    boost:false,

    themes:{
        default:true,
        galaxy:false,
        fire:false
    }

}

};



const shopItems={


blue:{
    name:"Blue Genius Skin",
    price:300,
    icon:"🔵",
    type:"skin"
},


purple:{
    name:"Math Master Skin",
    price:700,
    icon:"🟣",
    type:"skin"
},


gold:{
    name:"Golden Legend Skin",
    price:1500,
    icon:"🟡",
    type:"skin"
},


diamond:{
    name:"Diamond King Skin",
    price:3000,
    icon:"💎",
    type:"skin"
},


boost:{
    name:"XP Boost x2",
    price:500,
    icon:"⚡",
    type:"boost"
},


life:{
    name:"Extra Life",
    price:200,
    icon:"❤️",
    type:"life"
}


};


let game = {

    mode:"",

    timer:0,

    interval:null,


    answer:0,


    solved:0,

    correct:0,


    xp:0,

    coins:0,


    combo:0,

    best:0,


    dailyIndex:0,

    dailyQuestions:[]

};







// ================= SAVE LOAD =================



function save(){


    localStorage.setItem(

        "mathMillionaire",

        JSON.stringify(state)

    );


}








function load(){


    let data =
    localStorage.getItem(
        "mathMillionaire"
    );



    if(data){

        state=JSON.parse(data);

    }


    updateHome();


    startDailyTimer();


}










// ================= SCREEN SYSTEM =================



function showScreen(id){


    document
    .querySelectorAll(".screen")
    .forEach(s=>{

        s.classList.remove("active");

    });



    let target=
    document.getElementById(id);



    if(target){

        target.classList.add("active");

    }


}








function goHome(){


    clearInterval(game.interval);


    showScreen(
        "home-screen"
    );


    updateHome();


}




function goBack(){

    window.location.href="minigames.html";

}




// ================= HOME =================



function updateHome(){

let evo = getEvolution();

let skinIcons={

green:"🟢",

blue:"🔵",

purple:"🟣",

gold:"🟡",

diamond:"💎"

};


document.getElementById(
"home-avatar"
).innerHTML =
skinIcons[state.items.activeSkin] || "🟢";


    document.getElementById(
        "home-evolution"
    ).innerHTML=evo.name;




    document.getElementById(
        "home-level"
    ).innerHTML=
    "Level "+state.level;





    document.getElementById(
        "coins"
    ).innerHTML=
    state.coins;





    document.getElementById(
        "streak"
    ).innerHTML=
    state.dailyStreak;





    let need=
    state.level*100;



    document.getElementById(
        "xp-text"
    ).innerHTML=

    state.xp+
    " / "+
    need;





    document.getElementById(
        "xp-fill"
    ).style.width=

    Math.min(
        state.xp/need*100,
        100
    )
    +"%";




    drawDaily();


}









// ================= DAILY UI =================

function drawDaily(){

let box =
document.getElementById(
"daily-days"
);


if(!box)return;


box.innerHTML="";


for(let i=1;i<=6;i++){


let d=document.createElement("div");

d.className="day";


if(state.dailyExpire>Date.now()){

    if(i<=state.dailyStreak)
    {
        d.innerHTML="✓";
        d.classList.add("active");
    }
    else
    {
        d.innerHTML="🔒";
    }

}
else{

    d.innerHTML=i;

}


box.appendChild(d);


}

}

function updateDailyLock(){


    let card =
    document.getElementById(
        "daily-card"
    );


    let countdown =
    document.getElementById(
        "daily-countdown"
    );


    if(!card || !countdown) return;



    if(state.dailyExpire > Date.now()){


        let diff =
        state.dailyExpire - Date.now();



        let h =
        Math.floor(diff / 1000 / 60 / 60);



        let m =
        Math.floor(diff / 1000 / 60) % 60;



        let s =
        Math.floor(diff / 1000) % 60;



        countdown.innerHTML =

        "⏳ Sljedeći Daily: "
        +
        String(h).padStart(2,"0")
        +":"
        +
        String(m).padStart(2,"0")
        +":"
        +
        String(s).padStart(2,"0");



        card.classList.add(
            "locked"
        );


    }
    else{


        countdown.innerHTML=
        "🎯 Daily spreman!";


        card.classList.remove(
            "locked"
        );


    }


}





function startDailyTimer(){


    // ODMAH provjeri
    updateDailyLock();



    setInterval(()=>{


        updateDailyLock();


    },1000);



}







// ================= DAILY START =================


function startDaily(){


    if(
        state.dailyExpire >
        Date.now()
    ){

        showToast(
            "⏳ Daily još nije spreman!"
        );

        return;

    }



    game.dailyQuestions=[

        {
            text:"25 + 37 = ?",
            answer:62
        },


        {
            text:"8 × 9 = ?",
            answer:72
        },


        {
            text:"144 ÷ 12 = ?",
            answer:12
        },


        {
            text:"5, 10, 20, 40, ?",
            answer:80
        },


        {
            text:"15² = ?",
            answer:225
        },


        {
            text:"300 - 147 = ?",
            answer:153
        }


    ];



    game.dailyIndex=0;



    startGame("daily");


}








function finishDaily(){


    state.dailyStreak++;


    state.dailyDone=
    new Date()
    .toISOString()
    .split("T")[0];



    state.dailyExpire=
    Date.now()
    +
    24*60*60*1000;




    let bonus =
    100+
    state.dailyStreak*20;




    state.xp+=bonus;


    state.coins+=50;



    showToast(
        "🏆 Daily završen +"+
        bonus+
        " XP +50 🪙"
    );



    save();



}









// ================= MODES =================



function showModes(){


    showScreen(
        "mode-screen"
    );


}








// ================= PROFILE =================



function showProfile(){



    let evo=
    getEvolution();




    document.getElementById(
        "profile-avatar"
    ).innerHTML=
    evo.icon;



    document.getElementById(
        "profile-name"
    ).innerHTML=
    evo.name;




    document.getElementById(
        "profile-level"
    ).innerHTML=
    "Level "+
    state.level;





    document.getElementById(
        "total"
    ).innerHTML=
    state.solved;




    let acc=0;



    if(state.solved>0){


        acc=
        Math.round(
        state.correct/
        state.solved*
        100
        );


    }




    document.getElementById(
        "accuracy"
    ).innerHTML=
    acc+"%";




    document.getElementById(
        "best"
    ).innerHTML=
    state.bestCombo;




    document.getElementById(
        "profile-coins"
    ).innerHTML=
    state.coins;





    showScreen(
        "profile-screen"
    );



}







// ================= EVOLUTION =================

function getEvolution(){


    let avatars = [

        {
            level:1,
            name:"Number Kid",
            icon:"🟢"
        },

        {
            level:2,
            name:"Math Beginner",
            icon:"🧮"
        },

        {
            level:3,
            name:"Quick Calculator",
            icon:"🔢"
        },

        {
            level:4,
            name:"Math Explorer",
            icon:"🧭"
        },

        {
            level:5,
            name:"Number Pro",
            icon:"⭐"
        },

        {
            level:6,
            name:"Formula Master",
            icon:"📘"
        },

        {
            level:7,
            name:"Math Warrior",
            icon:"⚔️"
        },

        {
            level:8,
            name:"Equation Hero",
            icon:"🦸"
        },

        {
            level:9,
            name:"Algebra Knight",
            icon:"🛡️"
        },

        {
            level:10,
            name:"Math Master",
            icon:"🔥"
        },

        {
            level:11,
            name:"Geometry Genius",
            icon:"📐"
        },

        {
            level:12,
            name:"Logic King",
            icon:"👑"
        },

        {
            level:13,
            name:"Number Titan",
            icon:"🔥"
        },

        {
            level:14,
            name:"Infinity Mind",
            icon:"♾️"
        },

        {
            level:15,
            name:"Math Legend",
            icon:"🌟"
        },

        {
            level:16,
            name:"Quantum Solver",
            icon:"⚛️"
        },

        {
            level:17,
            name:"Master Thinker",
            icon:"🧠"
        },

        {
            level:18,
            name:"Ultimate Calculator",
            icon:"💎"
        },

        {
            level:19,
            name:"Math Emperor",
            icon:"🏆"
        },

        {
            level:20,
            name:"Math God",
            icon:"👑"
        }

    ];



    let current =
    avatars[0];


    avatars.forEach(a=>{

        if(state.level>=a.level){

            current=a;

        }

    });



    return current;


}











// ================= LEVEL UP =================



function checkLevel(){



    let need =
    state.level*100;




    if(
        state.xp>=need
    ){


        state.xp-=need;


        state.level++;



        showEvolution();



        checkLevel();


    }



}









function showEvolution(){



    let box =
    document.getElementById(
        "evolution-overlay"
    );



    box.style.display="flex";



    document.body.classList.add(
        "level-animation"
    );




    document.getElementById(
        "evolution-name"
    )
    .innerHTML=
    getEvolution().name;




    document.getElementById(
        "evolution-avatar"
    )
    .innerHTML=
    getEvolution().icon;





    setTimeout(()=>{


        box.style.display="none";


        document.body.classList.remove(
            "level-animation"
        );


    },3500);



}








// ================= TOAST =================



function showToast(msg){


    let t=
    document.getElementById(
        "toast"
    );



    t.innerHTML=msg;


    t.classList.add(
        "show"
    );



    setTimeout(()=>{


        t.classList.remove(
            "show"
        );


    },2200);



}


// ================= START GAME =================


function startGame(mode){


    clearInterval(
        game.interval
    );



    game={

        mode:mode,

        timer:
        mode==="speed"
        ?60
        :0,


        interval:null,


        answer:0,


        solved:0,

        correct:0,


        xp:0,

        coins:0,


        combo:0,

        best:0,


        dailyIndex:0,


        dailyQuestions:
        game.dailyQuestions || []

    };





    showScreen(
        "game-screen"
    );





    let title=
    document.getElementById(
        "game-mode"
    );



    if(mode==="speed")
        title.innerHTML="⚡ Speed";


    else if(mode==="logic")
        title.innerHTML="🧠 Logic";


    else if(mode==="challenge")
        title.innerHTML="🔥 Challenge";


    else
        title.innerHTML="🏆 Daily Challenge";







    if(mode==="speed"){



        document.getElementById(
            "timer"
        )
        .innerHTML="60s";




        game.interval=
        setInterval(()=>{



            game.timer--;



            document.getElementById(
                "timer"
            )
            .innerHTML=
            game.timer+"s";



            if(game.timer<=0){


                endGame();


            }



        },1000);



    }
    else{


        document.getElementById(
            "timer"
        )
        .innerHTML="";


    }






    nextQuestion();



}









// ================= NEXT QUESTION =================



function nextQuestion(){



    let q;



    if(game.mode==="daily"){



        q=
        game.dailyQuestions[
            game.dailyIndex
        ];



        if(!q){


            endGame();

            return;


        }



    }




    else if(game.mode==="logic"){


        q=
        logicQuestion();


    }




    else if(game.mode==="challenge"){


        q=
        challengeQuestion();


    }




    else{


        q=
        speedQuestion();


    }






    game.answer=
    q.answer;




    document.getElementById(
        "question"
    )
    .innerHTML=
    q.text;




    document.getElementById(
        "answer"
    )
    .value="";




    document.getElementById(
        "feedback"
    )
    .innerHTML="";




    updateGameXP();



}











// ================= QUESTION GENERATORS =================



function speedQuestion(){


    let a=random(1,50);

    let b=random(1,50);



    let op=
    Math.random()>0.5
    ?"+"
    :"-";



    let answer;



    if(op==="+"){


        answer=a+b;


    }
    else{


        if(a<b){

            let t=a;

            a=b;

            b=t;

        }


        answer=a-b;


    }





    return{


        text:
        `${a} ${op} ${b} = ?`,


        answer:answer


    };



}







function logicQuestion(){

    let type=random(1,10);



    // ================= 1. ARITMETIČKI NIZ =================

    if(type===1){

        let start=random(2,20);
        let step=random(2,10);


        return {

            text:
            `${start}, ${start+step}, ${start+step*2}, ${start+step*3}, ?`,

            answer:
            start+step*4

        };

    }





    // ================= 2. MNOŽENJE =================

    if(type===2){

        let start=random(2,5);
        let multi=random(2,4);


        let a=start;
        let b=a*multi;
        let c=b*multi;
        let d=c*multi;


        return{

            text:
            `${a}, ${b}, ${c}, ${d}, ?`,

            answer:
            d*multi

        };

    }







    // ================= 3. IZMJENIČNI NIZ =================

    if(type===3){

        let a=random(5,20);
        let plus=random(3,8);
        let minus=random(1,5);


        return{


            text:
            `${a}, ${a+plus}, ${a+plus-minus}, ${a+plus-minus+plus}, ?`,


            answer:
            a+plus-minus+plus-minus


        };


    }







    // ================= 4. KVADRATI =================

    if(type===4){


        let n=random(2,8);


        return{


            text:
            `${n*n}, ${(n+1)*(n+1)}, ${(n+2)*(n+2)}, ${(n+3)*(n+3)}, ?`,


            answer:
            (n+4)*(n+4)


        };


    }







    // ================= 5. FIBONACCI =================

    if(type===5){


        let a=random(1,5);
        let b=random(2,8);


        return{


            text:
            `${a}, ${b}, ${a+b}, ${a+b+b}, ?`,


            answer:
            (a+b)+(a+b+b)


        };


    }







    // ================= 6. DVIJE OPERACIJE =================

    if(type===6){


        let a=random(2,10);

        let niz=[a];


        for(let i=1;i<5;i++){

            niz.push(
                niz[i-1]*2+3
            );

        }



        return{


            text:
            `${niz[0]}, ${niz[1]}, ${niz[2]}, ${niz[3]}, ?`,


            answer:
            niz[4]


        };


    }







    // ================= 7. TROKUTASTI BROJEVI =================

    if(type===7){


        let n=random(2,6);


        let arr=[];


        for(let i=0;i<4;i++){

            let x=n+i;

            arr.push(
                x*(x+1)/2
            );

        }



        return{


            text:
            `${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ?`,


            answer:
            (n+4)*(n+5)/2


        };


    }







    // ================= 8. OPADAJUĆI NIZ =================

    if(type===8){


        let start=random(50,100);

        let step=random(3,10);


        return{


            text:
            `${start}, ${start-step}, ${start-step*2}, ${start-step*3}, ?`,


            answer:
            start-step*4


        };


    }







    // ================= 9. NEPARAN / PARAN =================

    if(type===9){


        let start=random(1,10);


        return{


            text:
            `${start}, ${start+2}, ${start+4}, ${start+6}, ?`,


            answer:
            start+8


        };


    }







    // ================= 10. SAKRIVENO PRAVILO =================

    if(type===10){


        let a=random(2,8);


        let arr=[a];


        arr.push(a*3);
        arr.push(a*3-2);
        arr.push((a*3-2)*3);



        return{


            text:
            `${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ?`,


            answer:
            arr[3]*3-2


        };


    }



}

function challengeQuestion(){


    let type=random(1,10);



    // ================= 1. VELIKO MNOŽENJE =================

    if(type===1){

        let a=random(15,60);
        let b=random(12,40);


        return{

            text:
            `${a} × ${b} = ?`,

            answer:
            a*b

        };

    }



    // ================= 2. KVADRATI =================


    if(type===2){


        let a=random(10,30);


        return{

            text:
            `${a}² = ?`,

            answer:
            a*a

        };


    }



    // ================= 3. KORIJEN =================


    if(type===3){


        let a=random(5,20);

        let broj=a*a;


        return{

            text:
            `√${broj} = ?`,

            answer:
            a

        };


    }




    // ================= 5. DVIJE OPERACIJE =================


    if(type===4){


        let a=random(10,50);
        let b=random(5,20);
        let c=random(2,10);


        return{


            text:
            `${a} + ${b} × ${c} = ?`,


            answer:
            a+b*c


        };


    }





    // ================= 6. JEDNAČINA =================


    if(type===5){


        let x=random(5,30);

        let plus=random(10,50);


        return{


            text:
            `x + ${plus} = ${x+plus}`,


            answer:
            x


        };


    }







    // ================= 8. STEPENI =================


    if(type===6){


        let a=random(2,8);

        let stepen=random(3,4);


        return{


            text:
            `${a}^${stepen} = ?`,


            answer:
            Math.pow(a,stepen)


        };


    }





    // ================= 9. KOMBINOVANI IZAZOV =================


    if(type===7){


        let a=random(20,80);
        let b=random(5,20);
        let c=random(2,8);



        return{


            text:
            `(${a} - ${b}) × ${c} = ?`,


            answer:
            (a-b)*c


        };


    }





    // ================= 10. NIZ PREMIUM =================


    if(type===8){


        let a=random(3,10);


        let n=[a];


        for(let i=1;i<5;i++){


            n.push(
                n[i-1]*3-2
            );


        }



        return{


            text:
            `${n[0]}, ${n[1]}, ${n[2]}, ${n[3]}, ?`,


            answer:
            n[4]


        };


    }





    // ================= 11. LOGIČKI TRIK =================


    if(type===9){


        let a=random(2,8);


        return{


            text:
            `${a} × 2 + ${a} × 3 = ?`,


            answer:
            a*2+a*3


        };


    }





    // ================= 12. MASTER =================


    if(type===10){


        let a=random(10,30);
        let b=random(5,15);


        return{


            text:
            `${a}² - ${b}² = ?`,


            answer:
            a*a-b*b


        };


    }



}





// ================= ANSWER CHECK =================



document
.getElementById(
    "answer-form"
)
.addEventListener(
"submit",
function(e){



e.preventDefault();

if(answering) return;

answering=true;

document.getElementById("answer").disabled=true;

document.querySelector("#answer-form button").disabled=true;


let value=
Number(
    document.getElementById(
        "answer"
    ).value
);





    game.solved++;


    state.solved++;





    if(value===game.answer){



        game.correct++;


        state.correct++;




        game.combo++;



        if(game.combo>game.best)

            game.best=
            game.combo;




        if(game.combo>state.bestCombo)

            state.bestCombo=
            game.combo;







        let reward=15;




        if(game.mode==="logic")

            reward=30;



        if(game.mode==="challenge")

            reward=50;



        if(game.mode==="daily")

            reward=40;




        reward+=
        game.combo*2;





        game.xp+=reward;


        game.coins+=
        Math.floor(reward/5);




        state.xp+=reward;


        state.coins+=
        Math.floor(reward/5);





        screenFlash(
            "correct"
        );




        document.getElementById(
            "feedback"
        )
        .innerHTML=
        "✓ +"+reward+" XP";




        checkLevel();




    }
    else{



        game.combo=0;



        screenFlash(
            "wrong"
        );



        document.getElementById(
            "feedback"
        )
        .innerHTML=
        "❌ Tačan odgovor: "
        +
        game.answer;


    }




    if(game.mode==="daily"){


        game.dailyIndex++;


    }




    document.getElementById(
        "combo"
    )
    .innerHTML=
    game.combo;





    updateGameXP();




setTimeout(()=>{

    answering=false;

    document.getElementById("answer").disabled=false;

    document.querySelector("#answer-form button").disabled=false;

    nextQuestion();

},700);



});

// ================= XP BAR =================


function updateGameXP(){


    let fill =
    document.getElementById(
        "game-xp-fill"
    );



    if(!fill)return;



    let need =
    state.level*100;



    fill.style.width =

    Math.min(
        state.xp/need*100,
        100
    )
    +"%";


}









// ================= END GAME =================



function endGame(){



    clearInterval(
        game.interval
    );




    if(game.mode==="daily"){


        if(game.solved>=6){


            finishDaily();


        }


    }





    document.getElementById(
        "result-solved"
    )
    .innerHTML=
    game.solved;



    document.getElementById(
        "result-correct"
    )
    .innerHTML=
    game.correct;



    document.getElementById(
        "result-xp"
    )
    .innerHTML=
    "+"+
    game.xp;



    document.getElementById(
        "result-coins"
    )
    .innerHTML=
    "+"+
    game.coins;



    document.getElementById(
        "result-combo"
    )
    .innerHTML=
    game.best;





    save();



    showScreen(
        "result-screen"
    );



}









// ================= SCREEN FLASH =================



function screenFlash(type){



    let flash =
    document.getElementById(
        "screen-flash"
    );



    if(!flash)return;




    flash.className="";



    if(type==="correct"){


        flash.classList.add(
            "green-flash"
        );


    }
    else{


        flash.classList.add(
            "red-flash"
        );


    }




    setTimeout(()=>{


        flash.className="";


    },450);



}









// ================= SHOP =================



function openShop(){


    showScreen(
        "shop-screen"
    );


}

function buyItem(id){

let item=shopItems[id];


if(!item) return;



if(state.coins < item.price){

showToast(
"❌ Nemaš dovoljno coinsa"
);

return;

}



// SKIN

if(item.type==="skin"){


if(state.items.skins[id]){

showToast(
"✅ Skin već posjeduješ!"
);

state.items.activeSkin=id;

save();

updateHome();

return;

}



state.items.skins[id]=true;

state.items.activeSkin=id;


}




// BOOST

if(item.type==="boost"){

if(state.items.boost){

showToast(
"⚡ Boost već imaš!"
);

return;

}


state.items.boost=true;

}



// LIFE

if(item.type==="life"){


if(state.items.life){

showToast(
"❤️ Život već imaš!"
);

return;

}


state.items.life=true;


}




state.coins-=item.price;



save();

updateHome();



showToast(
"🔥 Kupljeno: "+item.name
);


}






// ================= RANDOM =================



function random(a,b){


    return Math.floor(

        Math.random()*(b-a+1)

    )+a;


}









// ================= START =================



load();