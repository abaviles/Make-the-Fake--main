// let increment 
// increment = 0
//Spaceship
class Heart extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        //add object to existing scene 
        scene.add.existing(this)// add to existing scene
        this.points = pointValue // store point value
        this.moveSpeed = 1.8 //heart speed in piexels/frame
        this.initialY = this.y // initial y cord used for reset 
    }
    update(){
        //move heart down 
        this.y += this.moveSpeed
        
       // increment += 25

        //wrap from top to bottom and randomize location 
        if(this.y >= 720 + this.height ){
            this.y = -150 
            this.x =  Math.floor(Math.random() * (800 - 200 + 1)) + 200
        }
    }
    //reset position and ra
    reset(){
        this.y = this.initialY
        this.x =  Math.floor(Math.random() * (800 - 200 + 1)) + 200
    }
}