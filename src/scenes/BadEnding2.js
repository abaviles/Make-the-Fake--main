class BadEnding2 extends Phaser.Scene {
    constructor() {
        super("badEnding2")
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
       
        //BG MUSIC
        
        this.startSound = this.sound.add(('beep'), {volume: 0.25})
        
        // parse dialog from JSON file
        this.dialog = this.cache.json.get('dialog4')
        
        //music
        this.song = this.sound.add(('daisy'), {volume: 0.25})
        this.song.loop = true
        this.song.play()
        
        // background
        this.BadEnding2 = (this.add.video(0, 0, 'badEnding2').setOrigin(0,0))
        this.BadEnding2.play('loop', 0, 5)

        //invisible giffany
        this.giffany = this.add.sprite(640, this.DBOX_Y - 210, 'giffany5').setOrigin(0.5, 0.5)
        this.giffany.visible = false

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

        // input
        cursors = this.input.keyboard.createCursorKeys()

        // start first dialog conversation
        this.typeText()        
    }

    update() {

        //this.dots.tilePositionX += 2
       this.pillar.tilePositionX -= 30

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
            this.song.stop()
            
            // tween out prior speaker's image
            if(this.dialogLastSpeaker) { 
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'power1',
                    onComplete: () => {
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
                    x: this.DBOX_X + 135,
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
