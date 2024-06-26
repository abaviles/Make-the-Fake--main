class GoodEnding extends Phaser.Scene {
    constructor() {
        super("goodEnding")
    }

//THIS CUTSCENE WILL BE THE ANGRY ENDING
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
        this.NEXT_Y = 680			    // next text prompt y-position

        this.LETTER_TIMER = 10		    // # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0			// current "conversation"
        this.dialogLine = 0			    // current line of conversation
        this.dialogSpeaker = null		// current speaker
        this.dialogLastSpeaker = null	// last speaker
        this.dialogTyping = false		// flag to lock player input while text is "typing"
        this.dialogText = null			// the actual dialog text
        this.nextText = null			// player prompt text to continue typing

        // character variables
        this.tweenDuration = 500        // character in/out tween duration

        this.OFFSCREEN_X = -500         // x,y coordinates used to place characters offscreen
        this.OFFSCREEN_Y = 1000
    }

    create() {
        //endCount += 1
        
        this.cameras.main.fadeIn(4000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(5000, () => {
                    this.scene.start('goodEnding')
                }) 
            })
            
        this.startSound = this.sound.add(('beep'), {volume: 0.25})
        
        // parse dialog from JSON file
        this.dialog = this.cache.json.get('dialog5')
        
       

        //music
        this.goodMusic = this.sound.add(('good'), {volume: 0.5})
        this.goodMusic.loop = true
        this.goodMusic.play() 
        
        //tween music
        this.tweens.add({
            targets:  this.goodMusic,
            volume:   {from: 0, to: 0.5},
            duration: 2000,
            
            })

        // background
        this.GoodEnding = (this.add.video(0, 0, 'goodEnding').setOrigin(0,0))
        this.GoodEnding.play('loop', 0, 5)
        
        //giffany
        this.giffany = (this.add.sprite(this.OFFSCREEN_X, 360, 'giffany6').setScale(0.5, 0.5)).setOrigin(0.5, 0.5)
        //this.giffany.visible = false
        

        //Pillar
        this.pillar = this.add.tileSprite(0, 0, 1280, 720, 'pillar').setOrigin(0,0)

        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X + 8, this.OFFSCREEN_Y, 'dialogbox').setOrigin(0, 0)

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE)
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE)

        

        //d-box tween
        this.tweens.add({
            targets: this.dialogbox,
            x: this.DBOX_X - 8,
            y: this.DBOX_Y,
            duration: this.tweenDuration,
            ease: 'power1'
        })

        //pillar tween chain
        let pillarTweenChain = this.tweens.chain ({
            targets: this.pillar,
            ease: 'Sine.easeOut',
            loop: 0,
            tweens: [
            {
                y: -30,
                duration: 300,
                ease: 'Sine.easeIn',
            },
            {
                y: 800,
                duration: 1000,
                ease: 'Sine.easeOut'
            }
            ]

        })
        

        // input
        cursors = this.input.keyboard.createCursorKeys()

        // start first dialog conversation
       
        this.typeText()        
    }

    update() {

        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping) {
            this.sound.play('beep', {volume: 0.3})
            this.typeText() // trigger dialog
        }
    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true

        // clear text
        this.dialogText.text = ''
        this.nextText.text = ''

        /* JSON dialog structure: 
            - each array within the main JSON array is a "conversation"
            - each object within a "conversation" is a "line"
            - each "line" can have 3 properties: 
                1. a speaker (required)
                2. the dialog text (required)
                3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0
            // I increment the conversation count here...
            // ..but you could create logic to exit if each conversation was self-contained
            this.dialogConvo++
        }
        
        // make sure we haven't run out of conversations...
        if(this.dialogConvo>= this.dialog.length) {
            // here I'm exiting the final conversation to return to the title...

            // ...but you could add alternate logic if needed
            
            console.log('End of Conversations')
            
            
            // tween out prior speaker's image
            if(this.dialogLastSpeaker) { 
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'power1',
                    onComplete: () => { 
                        
                        this.tweens.add({
                        targets:  this.goodMusic,
                        volume:   {from: 0.5, to: 0},
                        duration: 2000,
                        })
                       this.goodMusic.stop()
                       this.scene.start('menuScene')
                              
                }})}
            

        } else {
            // if not, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker']
            // check if there's a new speaker (for exit/enter animations)
            if(this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                // tween out prior speaker's image
                if(this.dialogLastSpeaker) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'power1'
                    })
                }
                // tween in new speaker's image
                this.tweens.add({
                    targets: this[this.dialogSpeaker],
                    x: 640,
                    y: 360, 
                    duration: this.tweenDuration,
                    ease: 'power1'
                })
            } 

            // build dialog (concatenate speaker + colon + line of text)
            this.combinedDialog = 
               'GIFFANY'
                + ': ' 
                + this.dialog[this.dialogConvo][this.dialogLine]['dialog']

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.combinedDialog.length - 1,
                callback: () => { 
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.combinedDialog[currentChar]
                    // advance character position
                    currentChar++
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1)
                        this.dialogTyping = false   // un-lock input
                        this.textTimer.destroy()    // destroy timer
                    }
                },
                callbackScope: this // keep Scene context
            })
            
            // final cleanup before next iteration
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH  // set bounds on dialog
            this.dialogLine++                               // increment dialog line
            this.dialogLastSpeaker = this.dialogSpeaker     // set past speaker
        }
    }

}
