// Adam Aviles
// Created: 3/6/24

// Visual novel "teletext-style" dialog example that reads from a JSON file
"use strict"

// game config
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Menu, Cutscene1],
}

const game = new Phaser.Game(config)

// globals
const centerX = game.config.width / 2
const centerY = game.config.height / 2
let cursors = null