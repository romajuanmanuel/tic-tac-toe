function createUser(name,marker,points) {
    return {
        name: name,
        points: points,
        marker: marker,
        greet() {
            console.log(`Hello, my name is ${this.name} and I have ${this.points} points. My marker is ${this.marker}.`);
        }
    };
}

// Example usage:
const user1 = createUser('Roma', 'X', 25);
user1.greet(); 
const user2 = createUser('Vova', 'O', 30);
user2.greet();