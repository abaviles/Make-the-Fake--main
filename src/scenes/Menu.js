class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
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
    preload() {
        // load assets
        this.load.path = "./assets/"

        // load JSON (ie dialog text)
        this.load.json('dialog', 'json/dialog.json')
        this.load.json('dialog2', 'json/dialog2.json')
        this.load.json('dialog3', 'json/dialog3.json')
        this.load.json('dialog4', 'json/dialog4.json')
        this.load.json('dialog5', 'json/dialog5.json')

        // load images
        this.load.image('dialogbox', 'img/dialogbox.png')
        
        //giffanys
        this.load.image('giffany', 'img/giffanytalk1.png')
        this.load.image('giffany2', 'img/giffanytalk2.png')
        this.load.image('giffany3', 'img/giffanytalk3.png')
        this.load.image('giffany4', 'img/giffanytalk4.png')
        this.load.image('giffany5', 'img/giffanyglitch1.png')
        this.load.image('giffany6', 'img/giffany_good2.png')

        //extras
        this.load.image('play', 'img/play_button.png')
        this.load.image('class', 'img/classroom.png')
        this.load.image('dots', 'img/polkadot.png')
        this.load.image('pillar', 'img/pillar.png')
        this.load.image('heart','img/heart_sprite.png')
        this.load.image('UIBox','img/UIBox_1.png')
        this.load.image('Heartcart','img/heart_cart.png') 
        this.load.image('heartbreak','img/heartbreak.png') 
        
        //videos
        this.load.video('intro', 'img/game_intro.mp4', true)
        this.load.video('badEnding2', 'img/Bad Ending 2.mp4', true)
        this.load.video('goodEndIntro', 'img/GoodEndingIntro.mp4', true)
        this.load.video('goodEnding', 'img/GoodEnding_1.mp4', true)
        this.load.video('extras', 'img/Extras.mp4', true)

        //audio
        this.load.audio('start', 'sfx/start.wav')
        this.load.audio('sparkle', 'sfx/sparkle.mp3')
        this.load.audio('beep', 'sfx/beep.wav')
        this.load.audio('bg music', 'sfx/bg_cutscene.mp3')
        this.load.audio('menu music', 'sfx/menu_music.mp3')
        this.load.audio('heartcollected', 'sfx/heartcollect.mp3')
        this.load.audio('daisy', 'sfx/daisyBell.mp3')
        this.load.audio('good', 'sfx/goodEnd.mp3')
        this.load.audio('extrasAudio', 'sfx/Extras.wav')



        // load bitmap font
        this.load.bitmapFont('depixel_font', 'font/depixel.png', 'font/depixel.xml')
        
        //decoration
        this.load.image('flowers', 'img/flowers.png')
        this.load.image('stars', 'img/stars.png')

   

    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(500, () => {
                    this.scene.start('menuScene')
                    this.scene.stop('extraScene')
                })
            })
        this.scene.stop('extraScene')
        // add title text
        this.menuMusic = this.sound.add(('menu music'), {volume: 0.5})
        this.menuMusic.play()

        this.startSound = this.sound.add(('beep'), {volume: 0.25})
        this.sparkleSound = this.sound.add(('sparkle'))

        
        this.intro = (this.add.video(0, -20, 'intro').setOrigin(0,0)).setScale(0.5, 0.5)
        this.intro.play()

        
        this.playButton = (this.add.bitmapText(1300, 500, this.DBOX_FONT, "Play", this.TEXT_SIZE * 2).setOrigin(0, 0))
        this.playButton.setInteractive()

        this.extrasButton = (this.add.bitmapText(1300, 600, this.DBOX_FONT, "Extras", this.TEXT_SIZE * 2).setOrigin(0, 0))
        this.extrasButton.setInteractive()
        
        //Extras Scene Transition
        this.extrasButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,() => {((this.extrasButton).setScale(1, 1)).setOrigin(0, 0)})
        this.extrasButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,() => {((this.extrasButton).setScale(1.05,1.05)).setOrigin(0, 0), this.startSound.play()})
        this.extrasButton.once(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,() => {this.cameras.main.fadeOut(2000, 0, 0, 0)
                
            //SOUND FX, THEN FADE OUT
                this.playButton.removeInteractive()
                this.sparkleSound.play()
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.menuMusic.stop(), this.scene.start('extraScene')},
                
                this.tweens.add({
                    targets:  this.menuMusic,
                    volume:   {from: 0.5, to: 0},
                    duration: 2000,
                    }))          
                
                      
})    
        //Play Scene Transition
        this.playButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,() => {((this.playButton).setScale(1,1)).setOrigin(0,0)})
        this.playButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,() => {((this.playButton).setScale(1.05, 1.05)).setOrigin(0,0), this.startSound.play()})
        this.playButton.once(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,() => {this.cameras.main.fadeOut(2000, 0, 0, 0)
                
            //SOUND FX, THEN FADE OUT
                this.extrasButton.removeInteractive()
                this.scene.stop('extraScene')
                this.sparkleSound.play()
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.menuMusic.stop(), this.scene.start('cutScene2')},
                
                this.tweens.add({
                    targets:  this.menuMusic,
                    volume:   {from: 0.5, to: 0},
                    duration: 2000,
                    }))          
                
                
        })
                

        this.flowers = this.add.tileSprite(0, 0, 1280, 720, 'flowers').setOrigin(0,0)
        this.stars = this.add.tileSprite(0, 0, 1280, 720, 'stars').setOrigin(0,0)

        this.intro.on('complete', () => {
            this.tweens.add({
                targets:this.playButton,
                x: 915,
                duration: 500,
                ease: 'power2'}),

                this.tweens.add({
                    targets:this.extrasButton,
                    x: 900,
                    duration: 500,
                    ease: 'power2'})

        }) 
       
    }

    update() {
        //decoration
        this.flowers.tilePositionX -= 1
        this.stars.tilePositionX -= 2
        
        }
    }
