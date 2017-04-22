/* globals __DEV__ */
import Planet from '../sprites/Planet';
import Phaser from 'phaser';
import Threshold from '../sprites/Threshold';
import { createSatelliteGroup } from '../managers/SattelitesManager';
import orbitalSong from '../songs/orbital';

export default class extends Phaser.State {
    init () {
        this.beats = orbitalSong.ticks;
        this.thresholdDistance = this.world.width - 300;
        this.satelliteSpeed = 100;
    }

    preload () {
        this.load.audio(orbitalSong.id, [`assets/music/${orbitalSong.asset}`]);
    }

    create () {
        this.debugText = this.game.add.text(this.world.centerX, this.world.centerY, "test");
        this.planet = new Planet({
            game: this,
            x: this.world.width - 150,
            y: this.world.centerY
        });
        this.threshold = new Threshold({
            game: this,
            x: this.thresholdDistance,  // TODO: Calculate actual placement
            y: this.world.centerY,
            asset: 'threshold'
        });

        this.music = this.add.audio(orbitalSong.id);
        this.musicStartTime = this.game.time.totalElapsedSeconds();
        this.music.play();
        this.game.add.existing(this.planet);
        this.game.add.existing(this.threshold);

        const secondsPerBeat = (60 / orbitalSong.bpm) * 1000;
        this.beatCount = 0;
        /*this.time.events.loop(secondsPerBeat, () => {
            console.log(`Beat: ${this.beatCount}`);
            // Give 4 beats buffer
            if(this.beatCount === 4) {
                this.musicStartTime = this.game.time.totalElapsedSeconds();
                this.music.play();
            }
            this.beatCount++;
        }, this); */

        this.satelliteGroup = createSatelliteGroup(this, this.beats, this.thresholdDistance, this.satelliteSpeed);
        //this.satelliteGroup.position.x = -40;
        this.game.add.existing(this.satelliteGroup);
        this.lastFrameTime = this.game.time.totalElapsedSeconds();
    }

    update () {
        this.debugText.setText(this.getTick());
        const delta = this.game.time.totalElapsedSeconds() - this.lastFrameTime;
        this.satelliteGroup.position.x += this.satelliteSpeed * delta;
        this.lastFrameTime = this.game.time.totalElapsedSeconds();
    }


    getTick() {
        return this.game.time.totalElapsedSeconds() - this.musicStartTime;
    }
}
