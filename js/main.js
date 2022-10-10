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
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        const image = new Image()
        image.src = './images/d2.png'
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
// food array is used to store fruit that will later cross screen
const foodArray = []
let piecesOfFruit = 2
// foods function adds fruit to the food array
function foods() {
    for (let i = 0; i < piecesOfFruit; i++){
         foodArray.push(food = new Food(Math.floor(Math.random() * (canvas.width )+ 1000), Math.floor(Math.random() * canvas.height)))
         foodArray.push(food = new Food(Math.floor(Math.random() * (canvas.width )+ 2000), Math.floor(Math.random() * canvas.height)))
        }
}

// add all the food the foods array
foods()
// finish line comes after all the dragons
const finishLine = new FinishLine((canvas.width + 11000), 0, 'white', 30, canvas.height )
// dragon array is used to store dragons which will later cross the screen
const dragonArray = []
// the dragons function add a fleet of dragons the dragon array
let numberOfDragons = 11
function dragons() {
        for (let i = 0; i < numberOfDragons; i++){
             dragonArray.push(badDragon = new Baddragon(Math.floor(Math.random() * (canvas.width )+ 1000), Math.floor(Math.random() * canvas.height)))
             dragonArray.push(badDragon = new Baddragon(Math.floor(Math.random() * (canvas.width )+ 2000), Math.floor(Math.random() * canvas.height)))
            }
    }
// add all the dragons to the dragon array
dragons()

// stars array is used to store stars which will later move across the screen
let stars = []
let numberOfStars = 110
function bgnstars() {

    for (let i = 0; i < numberOfStars; i++){
        stars.push(badDragon = new Star(Math.floor(Math.random() * (canvas.width )), Math.floor(Math.random() * canvas.height)))
        stars.push(badDragon = new Star(Math.floor(Math.random() * (canvas.width )+ 1000), Math.floor(Math.random() * canvas.height)))
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
function detectcol(){

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
    let wordsArray = ['more fruit', 'my favorite', 'yum yum']
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
                dragonArray[i].x = canvas.width + 1000
                dragonArray[i].alive = true

            }
        }

    }
    for (let i = 0; i < foodArray.length; i++){
        if(dragon.x + dragon.width >= foodArray[i].x &&
            dragon.x <= foodArray[i].x + foodArray[i].width&&
            dragon.y + dragon.height >= foodArray[i].y &&
            dragon.y <= foodArray[i].y + foodArray[i].height&&
            foodArray[i].alive == true
        ){
            foodArray[i].alive = false
            score += 100
            movementDisplay.innerText = wordsArray[Math.floor(Math.random() * 3)]
            foodArray[i].x = canvas.width + 1000
            foodArray[i].alive = true
        }

    }

}

// score will update when player eats dragon fruit
let score = 0

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
    for (let i = 0 ; i < foodArray.length; i++){
        if (dragon.alive && foodArray[i].alive ){

            foodArray[i].x -=5
            foodArray[i].render()

        }
        if(foodArray[i].x < -30){
            foodArray[i].x = canvas.width + 1000
        }

    }

    // render dragons and move them across the screen
    for (let i = 0 ; i < dragonArray.length; i++){
        if(dragon.alive == true && dragonArray[i].alive == true ){
            dragonArray[i].x -= 10
            dragonArray[i].render()

        }
        if(dragonArray[i].x < -30){
            dragonArray[i].x = canvas.width + 1000
        }
    }

    //render player dragon
    if (dragon.alive == true){
        dragon.render()
    }

    // display score
    scoreDisplay.innerText = score

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

        score = 0
        for (let i = 0 ; i < dragonArray.length; i++){
            dragonArray[i].alive = false
            }
        dragons()
        for (let i = 0 ; i < foodArray.length; i++){
            foodArray[i].alive = false
            }
        foods()

        dragon.x = 100
        dragon.y = 100


        finishLine.x = canvas.width + 11000
        finishLine.alive = true
        finishLine.render()
    })

// allow keys for movement to work
document.addEventListener('keydown', movementHandler)



////////////////////////////////////////////////////////////////
