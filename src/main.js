import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import GameState from './states/Game';

import config from './config';
import { scaleFactor } from './utils';

class Game extends Phaser.Game {
    constructor () {
        const docElement = document.documentElement;
        const width = docElement.clientWidth / scaleFactor();
        const height = docElement.clientHeight / scaleFactor();

        super(width, height, Phaser.AUTO, 'content', null, false, false);

        this.state.add('Boot', BootState, false);
        this.state.add('Splash', SplashState, false);
        this.state.add('Game', GameState, false);

        this.state.start('Boot');
    }
}

window.game = new Game();
