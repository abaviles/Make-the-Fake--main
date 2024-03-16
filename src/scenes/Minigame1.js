class Minigame1 extends Phaser.Scene {
    constructor() {
        super("miniGame1")
    }
   
    create(){
        //music/placeholder for now 
        this.menuMusic = this.sound.add(('menu music'), {volume: 0.5})
        this.menuMusic.play()

         this.add.rectangle(0,0, game.config.width, 1280, 0xffecce).setOrigin(0,0)
        //sets pillar sprite/background
        this.pillar = this.add.tileSprite(0, 0, 1280, 720, 'pillar').setOrigin(0,0)

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        //add hearts(x3)create class for 
    this.heart01 = new Heart(this,300, -100, 'heart', 0,30).setOrigin(0,0)
       this.heart02 = new Heart(this, 500, -400,'heart',0,20).setOrigin(0,0)
       this.heart03 = new Heart(this, 800, -700, 'heart', 0,10).setOrigin(0,0)
       this.UIBox01 = this.add.sprite(0, 50, 'UIBox').setOrigin(0, 0)
       // add basket
       this.basket = new Heartcart(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 75, 'Heartcart').setOrigin(0.5, 0)

        
     //initialize score 
        this.p1Score = 0 

         // display score 
       let scoreConfig = {
        fontFamily: 'depixel_font',
        fontSize: '28px',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 100 
    
       }
       this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'Score:' + this.p1Score, scoreConfig)
       //Game Over Flag 
       this.gameOver = false 
    }
    update() {   
        //moves pillars 
        this.pillar.tilePositionY += 0.5  
        //updates the positions of the hearts
        this.heart01.update() 
        this.heart02.update()
        this.heart03.update()
        //updates basket 
        this.basket.update()  
        
        //collision 
        if(this.Collision(this.basket, this.heart03)){
            this.heartPop(this.heart03)
        }
        if(this.Collision(this.basket,this.heart02)){
            this.heartPop(this.heart02)
        }
        if(this.Collision(this.basket,this.heart01)){
            this.heartPop(this.heart01)
        }

        
        
    }
Collision(basket,heart){
    //If a collision happens sends back true or false
    if(basket.x < heart.x + heart.width && basket.x + basket.width - 200 > heart.x && 
        basket.y< heart.y + 50 && basket.height + basket.y > heart.y){
            return true 
           
        }else{
            return false
        }
       
         
}
// gets rid of heart on screen when it collides into basket
heartPop(heart){
    //hide heart
    heart.alpha = 0
    //reset position
    heart.reset()
    //shows heart after reset 
    heart.alpha = 1
    //plays sound for heart collection 
    this.sound.play('heartcollected')
    //update score
    this.p1Score += 1
    this.scoreLeft.text = 'Score:' + this.p1Score
}

}