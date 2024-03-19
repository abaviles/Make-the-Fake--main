class Minigame1 extends Phaser.Scene {
    constructor() {
        super("miniGame1")
    }
   
    create(){
        //music 
        this.menuMusic = this.sound.add(('menu music'), {volume: 0.5})
        this.menuMusic.play()
        
        this.add.rectangle(0,0, game.config.width, 1280, 0xffecce).setOrigin(0,0)
        //sets pillar sprite/background
        this.pillar = this.add.tileSprite(0, 0, 1280, 720, 'pillar').setOrigin(0,0)

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
       // varying max and mins for random placement of hearts 
       this.max = 800 
       this.min = 200

       this.max1 = 700 
       this.min1 = 300

        //add hearts(x3)create class for 
    this.heart01 = new Heart(this,Math.floor(Math.random() * (this.max1 - this.min + 1)) + this.min, -200, 'heart', 0,30).setOrigin(0,0)
       this.heart02 = new Heart(this, Math.floor(Math.random() * (this.max - this.min1 + 1)) + this.min1, -700,'heart',0,20).setOrigin(0,0)
       this.heart03 = new Heart(this, Math.floor(Math.random() * (this.max1 - this.min1 + 1)) + this.min1, -1200, 'heart', 0,10).setOrigin(0,0)

       //UI boxes holding score and time 
       this.UIBox01 = this.add.sprite(0, 50, 'UIBox').setOrigin(0, 0)
       this.UIBox02 = this.add.sprite(0, 200, 'UIBox').setOrigin(0, 0)
       
        //adds heartbreak 
       this.heartminus01 = new Heartbreak(this, Math.floor(Math.random() * (this.max - this.min + 1)) + this.min1, -600,'heartbreak', 0, - 10).setOrigin(0,0)
       this.heartminus02 = new Heartbreak(this, Math.floor(Math.random() * (this.max1 - this.min1 + 1)) + this.min1, -200,'heartbreak', 0, - 10).setOrigin(0,0)
       // add basket
       this.basket = new Heartcart(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 100, 'Heartcart').setOrigin(0.5, 0)

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

       let timerConfig = {
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
       //sets the score
       this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'Score:' + this.p1Score, scoreConfig)
      
       //Game Over Flag 
       this.gameover = false

       setTimeout(() => { this.ending(this.p1Score);}, 60000)
       //sets the timer and adds text to screen for timer
    this.time1 = 60
    this.timerLeft = this.add.text(borderUISize + borderPadding, 235, 'Time:' + this.time1, timerConfig)
       this.timer = this.time.addEvent({
        delay: 1000,
        repeat: 60,
        callback: () => { 
            this.time1 -= 1
            this.timerLeft.text = 'Time:' + this.time1
            
            
    this.scoreLeft.text = 'Score:' + this.p1Score
            // (necessary since Phaser 3 no longer seems to have an onComplete event)
            if(this.timer.getRepeatCount() == 0) {
               
                this.timer.destroy()    // destroy timer
            }
        },
        callbackScope: this // keep Scene context
    })
   
    }

   

    update() {   
        //moves pillars 
        this.pillar.tilePositionY += 0.5  
        //updates the positions of the hearts
        this.heart01.update() 
        this.heart02.update()
        this.heart03.update()
        // update heartbreak 
        this.heartminus01.update()
        this.heartminus02.update()
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
        if(this.Collision(this.basket,this.heartminus01)){
            this.heartPop(this.heartminus01)
        }
        if(this.Collision(this.basket,this.heartminus02)){
            this.heartPop(this.heartminus02)
        }
        
        
    }


Collision(basket,heart){
    //If a collision happens sends back true or false
    if(basket.x < heart.x + heart.width && basket.x + basket.width - 200 > heart.x && 
        basket.y< heart.y + 50 && basket.height + basket.y - 200 > heart.y){
            return true 
           
        }else{
            return false
        }
       
         
}
// gets rid of heart on screen when it collides into basket
heartPop(heart){
    //checks if the heart is a normal heart or a heartbreak
    if(heart == this.heart01 || heart == this.heart02 || heart == this.heart03 ){
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
        
        else{
    //hide heart
    heart.alpha = 0
    //reset position
    heart.reset()
    //shows heart after reset 
    heart.alpha = 1
    //plays sound for heart collection 
    this.sound.play('heartcollected')
    //update score
    this.p1Score += -1
    this.scoreLeft.text = 'Score:' + this.p1Score
        }
       
    
}
// determines ending the player will see based on score
ending(score){
    if(score >= 30){
            this.gameover = true
            this.menuMusic.stop(), this.scene.start('goodEnding')
    }
    else{

        this.gameover = true
        this.menuMusic.stop(), this.scene.start('cutScene2')
    }
}

}
