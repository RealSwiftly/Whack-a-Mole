"use strict";

/*
 Filename:    whackamole.js
 Student:     Kyle Grant (cst114)
 Course:      CWEB 190 (Internet Programming/Web Applications 1)
 Instructor:  Michael Grzesina
 Date:        April 14 2022
 Purpose:     JavaScript for Whack-A-Mole game, Assignment #4, CWEB 190 Winter 2022
*/

// Number of mole holes
const NUM_HOLES = 16;

let score = 0;
let numMoles = 0;
let numSpecMoles = 0;
let gameOn = false;
let holesTaken = 0;

// Global code
// Create the div's for the mole holes with their corresponding IDs
let holesString = "";
for (let i = 1; i <= NUM_HOLES; i++) {
    holesString += `<div id="hole${i}"></div>`
}
document.getElementById("holes").innerHTML = holesString;

//generates a single mole
function genNormMole(){
    let imgMole = new Image();
    imgMole.src = "images/newmole.png";
    return imgMole;
}
function genSpecMole(){
    let imgSpecMole = new Image();
    imgSpecMole.src = "images/newmole2.png";
    return imgSpecMole;
}


//starts game upon clicking start button
$("#btnStart").on("click",function(){
    $("#btnStart").prop("disabled",true);
    score = 0;
    numMoles = 0;
    numSpecMoles = 0;
    gameOn = false;
    gameOn = true;
    $("#results").hide();
    $("#holes").show();
    $("#holes").css("opacity", "1");
    playGame();
})




//handles moment to moment gameplay
function playGame() {

    const moleInterval = setInterval(genMoles, 500);

    //generates moles in unoccupied holes
    function genMoles() {
        if (gameOverCheck() === true) {
            clearInterval(moleInterval);
        }

        let spawned = false;
        while (spawned === false) {
            const randomSpawn = Math.floor(Math.random() * NUM_HOLES + 1);
            const moleType = Math.random() * 100;
            const holeCheck = "#hole" + randomSpawn;
            if (!$(holeCheck).hasClass("target")) {
                $(holeCheck).addClass("target");
                //decides to spawn special mole or not
                if(moleType > 25) {
                    $(holeCheck).append(genNormMole());
                }
                if(moleType <= 25){
                    $(holeCheck).append(genSpecMole());
                    $(holeCheck).addClass("special");
                }
                spawned = true;
            }
        }

        //supposed to whack the moles
        $(".target").on("click",function(){
            if($(this).hasClass("special") && gameOn === true){
                numSpecMoles++;
                score += 10000;
                $(this).removeClass("target special");
                $(this).html("");
            }
            else{
                numMoles++;
                score += 111;
                $(this).removeClass("target");
                $(this).html("");
            }
            $("#points").text("points: "+ score);
        })


    }
}

//displays result screen when game is lost
function gameOver(){
    $("#btnStart").prop("disabled",false);
    $("#results").fadeIn("slow");
    $("#holes").css("opacity", "0.5");
    $("#holes").fadeOut("slow");
    $("#numSpecial").text(numSpecMoles);
    $("#numRegular").text(numMoles);
    $("#numPoints").text(score);


}






//checks if 6 holes are filled, plays gameover function if more than 6 will be filled
function gameOverCheck() {
    holesTaken = 0;
    for (let i = 1; i <= NUM_HOLES; i++) {
        let holeCheck = "#hole" + i;
        if ($(holeCheck).hasClass("target")) {
            holesTaken++;
            if (holesTaken === 6) {
                gameOver();
                return true;
            }
        }
    }
    return false;
}
