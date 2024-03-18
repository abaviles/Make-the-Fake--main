// "Romance Academy 7" by Adam Aviles & Arcell Crawford
// Started: 2/20/24
// Style: Visual Novel/Minigame
// Time Taken: >= 40 hours?

/*About: In this version of Romance Academy 7 from Gravity Falls, you attempt to romance the AI Giffany! Depending on your performance in her minigame, you will either 
be granted one of two endings. (If you know of Doki Doki Literature Club, expect something like that just with...less violence.)*/

/*Sources:
- Text Dialog: Nathan Altice's Dialog Master
- Tweens: Nathan Altice's Tween Chain Master
- Interactive Buttons: ourcade on YouTube
- Importing Videos: StackOverflow
- Music & Sound: Pixabay's Free Sound Library
- Text: DaFont's "Depixel" font

Work Split:
- Giffany/Cutscene Sprites & Cutscene Programming: Adam Aviles
- UI Elements (text boxes, Minigame elements) & Gameplay Programming: Arcell Crawford*/

/*Techincal Execution: Cameras, Text Objects, Tween Manager, Timer, Tilemaps*/



"use strict"

// game config
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Menu, Cutscene1, Minigame1, Cutscene2, BadEnding, BadEnding2, GoodEnding, Extras],
    
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

const game = new Phaser.Game(config)

//set UI
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
// globals
const centerX = game.config.width / 2
const centerY = game.config.height / 2
let cursors = null
let keyRIGHT, keyLEFT 

