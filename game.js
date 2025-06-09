function createUser(name,marker) {
    let points = 0;
        const getPoints = () => points;
        const givePoints = () => points++;
    return {
        name: name,
        marker: marker,
        greet() {
            console.log(`Hello, my name is ${this.name} and I have ${getPoints()} points. My marker is ${this.marker}.
                `);
        },
        getPoints: getPoints,
        givePoints: givePoints  
}};

// Example usage:
const user1 = createUser('Roma', 'X');
user1.givePoints(); 
user1.givePoints(); 
user1.givePoints();
const user2 = createUser('Juan', 'O');
user2.givePoints(); 
user2.givePoints();

user1.greet(); 
user2.greet();
winGame(user1,user2);

function winGame(player1,player2){
    if (player1.getPoints() === 3){
        console.log(`${player1.name} has won ! `);
    } else if (player2.getPoints() === 3){
        console.log(`${player2.name} has won ! `);
    } else {
        console.log ("Its a tie !!");
    }

}