//////////////////////////////////

// set up canvas
const canvas = document.querySelector('#canvas')
// screen display
const movementDisplay = document.querySelector('#movement')
const scoreDisplay = document.querySelector('#score')
// set canvas to 2d
const ctx = canvas.getContext('2d')
canvas.setAttribute('height', getComputedStyle(canvas)["height"])
canvas.setAttribute('width', getComputedStyle(canvas)["width"])
// runs game loop every 60 milliseconds
const gameLoopInterval = setInterval(gameLoop, 60)
// this is the button to reset game
message = document.querySelector('#btm-right')



// FinishLine class is used for building finish line
class FinishLine {
    constructor(x, y, color, width, height){
        this.x =x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
// pic class is used for the player dragon and template for other classes
class Pic {
    constructor(x, y, width, height, im) {
        this.x = x
        this.y = y
        const image = new Image()
        im = './images/d2.png'
        image.src = im
        this.image = image
        this.height = 30
        this.width = 30
        this.alive = true
    }
    render() {
        ctx.drawImage(this.image, this.x, this.y)

    }
}
// bad dragon class is used for oncoming enemy dragons
class Baddragon extends Pic{
    constructor(x, y, width, height) {
        super(x, y, width, height)
        const image = new Image()
        image.src = './images/bd2.png'
        this.image = image
    }
    render() {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
// star class used for moving stars
class Star extends Pic{
    constructor(x, y, width, height) {
        super(x, y, width, height)
        const image = new Image()
        image.src = './images/s.png'
        this.image = image
    }
    render() {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
// fire class is used for fire balls that player dragon breathes
class Fire extends Pic{
    constructor(x, y, width, height) {
        super(x, y, width, height)
        const image = new Image()
        image.src = './images/fi2.png'
        this.image = image
    }
    render() {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
// food class is used for pieces of dragon fruit
class Food extends Pic{
        constructor(x, y, width, height) {
            super(x, y, width, height)
            const image = new Image()
            image.src = './images/f2.png'
            this.image = image
        }
        render() {
            ctx.drawImage(this.image, this.x, this.y)
        }
}
// main player
const dragon = new Pic(300, 150)
//fire balls
const flames = new Fire(dragon.x, dragon.y)
// flames.alive condition allows player to use fire ball if there is not already fire on screen
flames.alive = false
// pieces of fruit starting at different coordinates
const food = new Food(500, Math.floor(Math.random() * canvas.height))
const food2 = new Food(1000 ,Math.floor(Math.random() * canvas.height))
const food3 = new Food(1250, Math.floor(Math.random() * canvas.height))

// finish line comes after all the dragons
const finishLine = new FinishLine((canvas.width + 11000), 0, 'white', 30, canvas.height )
// dragon array is used to store dragons which will later cross the screen
const dragonArray = []

// the dragons functions add fleets of dragons the dragon array at different coordinates
let numberOfDragons = 11
function dragons() {
        for (let i = 0; i < numberOfDragons; i++){
             dragonArray.push(badDragon = new Baddragon(Math.floor(Math.random() * (canvas.width )+ 1000), Math.floor(Math.random() * canvas.height), 'green', 30, 30))
             dragonArray.push(badDragon = new Baddragon(Math.floor(Math.random() * (canvas.width )+ 2000), Math.floor(Math.random() * canvas.height), 'green', 30, 30))
            }
    }
// add all the dragons the dragon array
dragons()

// stars array is used to store stars which will later move across the screen
let stars = []
let numberOfStars = 110
function bgnstars() {

    for (let i = 0; i < numberOfStars; i++){
        stars.push(badDragon = new Star(Math.floor(Math.random() * (canvas.width )), Math.floor(Math.random() * canvas.height), 'green', 30, 30))
        stars.push(badDragon = new Star(Math.floor(Math.random() * (canvas.width )+ 1000), Math.floor(Math.random() * canvas.height), 'green', 30, 30))
    }
}
bgnstars()

// controls for player dragon
function movementHandler(e) {
    const speed = 10

    switch(e.key) {
        case('w'):
        dragon.y = dragon.y -speed
        break
        case('s'):
        dragon.y = dragon.y + speed
        break
        case('a'):
        dragon.x = dragon.x - speed
        break
        case('d'):
        dragon.x = dragon.x + speed
        break
        case('t'):
        // flames.alive condition allows player to use fire ball if fire not already on screen
        if (flames.alive == false){
            flames.alive = true
        flames.x = dragon.x
        flames.y = dragon.y
        }
        break
    }
}
// collision detection
function detectcol() {
    // detect food collision
    if(dragon.x + dragon.width >= food.x &&
        dragon.x <= food.x + food.width&&
        dragon.y + dragon.height >= food.y &&
        dragon.y <= food.y + food.height
    ){
        food.alive = false
        movementDisplay.innerText = 'more fruit'
    }
    if(dragon.x + dragon.width >= food2.x &&
        dragon.x <= food2.x + food2.width&&
        dragon.y + dragon.height >= food2.y &&
        dragon.y <= food2.y + food2.height
    )
    {
        food2.alive = false
        movementDisplay.innerText = 'yum yum'
    }
    if(dragon.x + dragon.width >= food3.x &&
        dragon.x <= food3.x + food3.width&&
        dragon.y + dragon.height >= food3.y &&
        dragon.y <= food3.y + food3.height
    )
    {
        food3.alive = false
        movementDisplay.innerText = 'my favorite'
    }
    // detect finish line collision
    if (dragon.x >finishLine.x && dragon.alive == true){
        movementDisplay.innerText = 'you win'
        dragon.alive = false
    }
    // detect wall collision
    if (dragon.y > canvas.height - 30 || dragon.y < 0 || dragon.x < 0 || dragon.x > canvas.width){
        dragon.alive = false
        movementDisplay.innerText = 'try again'
        score = 0
    }
    // detect bad dragon collision
    for (let i = 0; i < dragonArray.length; i++){
        if(dragonArray[i].alive == true){
            if(dragon.x + dragon.width >= dragonArray[i].x &&
                dragon.x <= dragonArray[i].x + dragonArray[i].width&&
                dragon.y + dragon.height >= dragonArray[i].y &&
                dragon.y <= dragonArray[i].y + dragonArray[i].height
            ){
                movementDisplay.innerText = 'try again'
                dragon.alive = false
                score = 0

            }
        }

    }
    // detect fire collision
    for (let i = 0; i < dragonArray.length; i++){
        if (flames.alive == true && dragonArray[i].alive == true){
            if(flames.x + flames.width -10 >= dragonArray[i].x &&
                flames.x <= dragonArray[i].x + dragonArray[i].width&&
                flames.y + flames.height >= dragonArray[i].y &&
                flames.y <= dragonArray[i].y + dragonArray[i].height
            ){
                dragonArray[i].alive = false
                flames.alive = false
                dragonArray.pop(dragonArray[i])
                dragonArray.push(dragonArray[i])
                dragonArray[i].x = canvas.width + 1000
                dragonArray[i].alive = true

            }
        }

    }
}

score = 0
// logic for running the game
function gameLoop(){

    scoreDisplay.innerText = score

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // render finish line if game not over
    if(dragon.alive == true) {
        finishLine.render()
    }
    // move finish line towards player
    finishLine.x -= 10

    // render foode if game not over
    if( food.alive == true && dragon.alive == true) {
        food.render()
    }

    // render stars and move them across the screen

    for (let i = 0 ; i < stars.length; i++){

        if(dragon.alive){


            stars[i].x -= 2
            stars[i].render()
        }
        if(stars[i].x < -30){
            stars.pop(stars[i])
            stars.push(stars[i])
            stars[i].x = canvas.width + 1000
        }
    }

    // move food across the screen
    food.x -= 1

    if( food2.alive == true && dragon.alive == true) {
        food2.render()
    }

    food2.x -= 1
    if( food3.alive == true && dragon.alive == true) {
        food3.render()
    }

    food3.x -= 1

    // render dragons and move them across the screen
    for (let i = 0 ; i < dragonArray.length; i++){
        if(dragon.alive == true && dragonArray[i].alive == true ){
            dragonArray[i].render()
            dragonArray[i].x -= 10
        }
        if(dragonArray[i].x < -30){
            dragonArray.pop(dragonArray[i])
            dragonArray.push(dragonArray[i])
            dragonArray[i].x = canvas.width + 1000
        }
    }

    //render player dragon
    if (dragon.alive == true){
        dragon.render()
    }

    // display score
    scoreDisplay.innerText = score

    // keep track of player score
    if( food.alive === false) {
        score = 100
    }
    if( food2.alive === false){
        score = 100
    }
    if (food3.alive === false){
        score = 100
    }
    if(food.alive === false && food2.alive ===false){
        score = 200
    }
    if(food.alive === false && food3.alive ===false){
        score = 200
    }
    if(food2.alive === false && food3.alive ===false){
        score = 200
    }
    if( food.alive === false && food2.alive === false && food3.alive === false){
        score = 300
    }

    // collision detection for walls food fire and dragons
    detectcol()

    // allow player to use fire ball if fire not on screen
    if (flames.alive == true){

        flames.render()
        flames.x += 10
    }
    if (flames.x > canvas.width){
        flames.alive = false
    }

}
    // reset the game when player clickes on reset button
    message.addEventListener('click', e => {
        movementDisplay.innerText = "I'm hungry"
        dragon.alive = true
        dragon.render()
        food.alive = false
        food2.alive = false
        food3.alive = false
        score = 0
        for (let i = 0 ; i < dragonArray.length; i++){
            dragonArray[i].alive = false
            }
        dragons()

        dragon.x = 100
        dragon.y = 100

        food.alive = true
        food.x = 300
        food.y = 300
        food.render()
        food2.alive = true
        food2.x = 1000
        food.y = Math.floor(Math.random() * canvas.height)
        food2.y = Math.floor(Math.random() * canvas.height)
        food2.render()
        food3.alive = true
        food3.x = 1250
        food3.y = Math.floor(Math.random() * canvas.height)
        food3.render()
        finishLine.x = canvas.width + 11000
        finishLine.alive = true
        finishLine.render()
    })

// allow keys for movement to work
document.addEventListener('keydown', movementHandler)


//////////////////////////////////////
