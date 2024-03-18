class Extras extends Phaser.Scene {
    constructor() {
        super("extraScene")
    }
    init() {
        // dialog constants
        this.DBOX_X = 245		        // dialog box x-position
        this.DBOX_Y = 500			    // dialog box y-position
        this.DBOX_FONT = 'depixel_font'	    // dialog box font key
        
        this.TEXT_X = 285			    // text w/in dialog box x-position
        this.TEXT_Y = 560			    // text w/in dialog box y-position
        this.TEXT_SIZE = 16		        // text font size (in pixels)
        this.TEXT_MAX_WIDTH = 715	    // max width of text within box

        this.NEXT_TEXT = '[SPACE]'	    // text to display for next prompt
        this.NEXT_X = 1000			    // next text prompt x-position
        this.NEXT_Y = 680
    }		
    create() {
        //SOUND FX
        this.startSound = this.sound.add(('beep'), {volume: 0.25})
        this.sparkleSound = this.sound.add(('sparkle'))

        //INTRO
        
        this.extras = (this.add.video(0, -20, 'extras', {volume: 0.5} ).setOrigin(0,0)).setScale(1.03, 1.03)
        this.extras.play()

        this.extrasAudio = this.sound.add(('extrasAudio'), {volume: 0.5})
        this.extrasAudio.play()
            
        this.playButton = (this.add.bitmapText(1300, 650, this.DBOX_FONT, "[BACK]", this.TEXT_SIZE * 2).setOrigin(0, 0))
        this.playButton.setInteractive()
        
        
        this.tweens.add({
            targets:this.playButton,
            x: 1100,
            duration: 500,
            ease: 'power2'})

    

        //Play Scene Transition
        this.playButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,() => {((this.playButton).setScale(1,1)).setOrigin(0,0)})
        this.playButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,() => {((this.playButton).setScale(1.05, 1.05)).setOrigin(0,0), this.startSound.play()})
        this.playButton.once(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,() => {this.cameras.main.fadeOut(2000, 0, 0, 0)})

        this.cameras.main.fadeIn(2500, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(3000, () => {
                    this.scene.start('menuScene')
                }) 
            })
        
    }
}