//Rocket
class Heartcart extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        //add object to existing scene 
        scene.add.existing(this)
        
        this.moveSpeed = 4
        
    }
    update(){
        //left right movement also limits how far the basket can move
        if(keyLEFT.isDown && this.x - 40> borderUISize + this.width){
                this.x -= this.moveSpeed
        }else if(keyRIGHT.isDown && this.x + 40 < game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed
        }      
    }

}


