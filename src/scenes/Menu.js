class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load assets
        this.load.path = "./assets/"

        // load JSON (ie dialog text)
        this.load.json('dialog', 'json/dialog.json')

        // load images
        this.load.image('dialogbox', 'img/dialogbox.png')
        this.load.image('giffany', 'img/giffanytalk1.png')
        this.load.image('giffany2', 'img/giffanytalk2.png')
        this.load.image('play', 'img/play_button.png')
        this.load.video('intro', 'img/game_intro.mp4', true)

        // load bitmap font
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
    }

    create() {
        // add title text
        this.intro = (this.add.video(0, -20, 'intro').setOrigin(0,0)).setScale(0.5, 0.5)
        this.intro.play()
        this.playButton = (this.add.image(1300, 550, 'play').setScale(0.2, 0.2)).setOrigin(0,0)
        
        this.intro.on('complete', () => {
            this.tweens.add({
                targets:this.playButton,
                x: 920,
                duration: 500,
                ease: 'power2'})
        }) 
       

        // create input
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // wait for player input
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("cutScene1")
        }
    }
}