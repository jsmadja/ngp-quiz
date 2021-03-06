const _ = require('lodash');
const Frame = require('./frame');

class Frames {

    constructor(frames, started_at) {
        let previousFrame = { answered_at: started_at };
        this.frames = _(frames)
        .map(f => {
            const frame = new Frame(f, previousFrame);
            frame.compute();
            previousFrame = frame;
            return frame;
        })
        .value();
    }

    get score() {
        return _.reduce(this.frames, (sum, frame) => sum + frame.score, 0);
    }

    getValidAnswerFrames() {
        return _.filter(this.frames, f => f.isValidAnswer());
    }

    getLastFrame() {
        return _.last(this.frames);
    }

    computeAccuracy() {
        if (this.length > 0) {
            return (this.getValidAnswerFrames().length / this.length) * 100;
        }
        return 0;
    }

    isNoMiss() {
        return !_.find(this.frames, f => !f.isValidAnswer());
    }

    toJSON() {
        return this.frames.map(f => f.toJSON());
    }

    isEmpty() {
        return this.length === 0;
    }

    get length() {
        return this.frames.length;
    }

}

module.exports = Frames;