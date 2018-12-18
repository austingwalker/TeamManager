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



var starters = [];
var subs = [];
var team = starters.concat(subs);
var rounds = 0;

var score = 0;



var playRound = function () {
    rounds++;
    if (rounds < 5) {


        console.log("----------\nROUND " + rounds + "\n----------");

        var opponentOffense = Math.floor(Math.random() * 20) + 1
        var opponentDefense = Math.floor(Math.random() * 20) + 1

        var offenseSum = 0;

        var defenseSum = 0;

        for (var i = 0; i < starters.length; i++) {
            offenseSum += starters[i].offense
            defenseSum += starters[i].defense
        }

        console.log("Team Offense: " + offenseSum);
        console.log("Team defense: " + defenseSum);
        console.log("Random O: " + opponentOffense);
        console.log("Random D: " + opponentDefense);

        if (offenseSum > opponentDefense) {
            score++;
            console.log("\nYou scored a point!");
        }

        if (defenseSum < opponentOffense) {
            score--;
            console.log("\nYou were scored on!");


        }

        inquirer.prompt([{
            name: "confirm",
            type: "confirm",
            message: "Would you like to make a substitution?"
        }]).then(function (answer) {
            if (answer.confirm === true) {
                inquirer.prompt([{
                    name: "sub",
                    type: "rawlist",
                    message: "Who would you like to sub in?",
                    choices: subs
                }]).then(function (subIn) {
                    var sideline = {};
                    var number = 0;
                    for (var i = 0; i < subs.length; i++) {
                        if (subs[i].name === subIn.sub) {
                            number = i;
                            sideline = subs[i]
                            console.log("-----")
                            console.log("sideline " + sideline)
                            console.log("-----")
                        }
                    }
                    inquirer.prompt([{
                        name: "sub",
                        type: "rawlist",
                        message: "Who would you like to sub out?",
                        choices: starters
                    }]).then(function (subOut) {

                        for (var i = 0; i < starters.length; i++) {
                            if (starters[i].name === subOut.sub) {
                                subs[number] = starters[i];
                                starters[i] = sideline;
                                console.log("-----")
                            console.log("starters " + starters)
                            console.log("-----")
                                console.log("Substitution Made!");
                                
                            }

                        }

                        playRound();
                        
                    });

                });
            
            } else {

                playRound();
            
            }
        
        });

        // function playGame(){
        //     if(rounds < ROUND_MAX){
        //         playRound();
    } else {
        console.log("Game over!")

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
                validate: function(value){
                    if(isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10){
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "defense",
                message: "On a scale of 1-10 how good is their defense?",
                validate: function(value){
                    if(isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10){
                        return true;
                    }
                    return false;
                }
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
        playRound();
    }
};

createPlayer();