var inquirer = require("inquirer");

function Player(name, position, offense, defense) {
    this.name = name;
    this.position = position;
    this.offense = offense;
    this.defense = defense;

    this.goodGame = function () {
        if (Math.floor(Math.random() * 2) === 0) {
            this.offense++;
            console.log(this.name + "'s offense has gone up!\n----------");
        }
        else {
            this.defense++;
            console.log(this.name + "'s defense has gone up!\n----------");
        }
    }


    this.badGame = function () {
        if (Math.floor(Math.random() * 2) === 0) {
            this.offense--;
            console.log(this.name + "'s offense has gone down...\n----------");
        }
        else {
            this.defense--;
            console.log(this.name + "'s defense has gone down...\n----------");
        }
    }

    this.printStats = function () {
        console.log(
            "Players name: " + this.name +
            "\nPosition: " + this.position +
            "\nOffense: " + this.offense +
            "\nDefense: " + this.defense
        )
    }



}


var team = [];
var starters = [];
var subs = [];
var rounds = 0;
var score = 0;



var playGame = function () {


    if (rounds <= 5) {
        var random1 = Math.floor(Math.random() * 20) + 1
        var random2 = Math.floor(Math.random() * 20) + 1

        var offenseSum = starters[0].offense + starters[1].offense

        var defenseSum = starters[0].defense + starters[1].defense

        if (random1 < offenseSum) {
            score++
            console.log("\nScore: " + score);
        }

        if (random2 > defenseSum) {
            score--
            console.log("\nScore: " + score);


        }


        rounds++
        playGame();
    }
    else {

        console.log("Final Score: " + score);
        if (score >= 0) {
            console.log("Good game, everyone!\nYour current starters' stats have improved!");
            for (var i = 0; i < starters.length; i++) {
                starters[i].goodGame();
            }
        }

        if (score < 0) {
            console.log("That was a poor performance!\nYour current starters' stats have decreased!");
            for (var i = 0; i < starters.length; i++) {
                starters[i].badGame();
            }
        }
    }

}

var createPlayer = function () {

    if (starters.length + subs.length < 3) {
        console.log("\nNew Player!\n");

        inquirer.prompt([

            {
                type: "input",
                name: "name",
                message: "What is the players name?"
            },
            {
                type: "input",
                name: "position",
                message: "What position do they play?"
            },
            {
                name: "offense",
                message: "On a scale of 1-10 how good is their offense?",
                // validate: function(value){
                //     if(isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10){
                //         return true;
                //     }
                //     return false;
                // }
            },
            {
                name: "defense",
                message: "On a scale of 1-10 how good is their defense?",
                // validate: function(value){
                //     if(isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10){
                //         return true;
                //     }
                //     return false;
                // }
            }


        ]).then(function (answers) {

            var player = new Player(answers.name, answers.position, parseInt(answers.offense), parseInt(answers.defense));


            if (starters.length < 2) {
                starters.push(player);
                team.push(player);
                console.log(player.name + " added to the starters");
            }

            else {
                subs.push(player);
                team.push(player);
                console.log(player.name + " added to the subs");
            }
            createPlayer();
        })

    }
    else {
        for (var i = 0; i < team.length; i++) {
            team[i].printStats();
        }
        playGame();
    }
};

createPlayer();