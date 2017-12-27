import Frames from './frames';
import { Bonus, NO_MISS_POINTS } from './bonus';

class Game {

  constructor(options) {
    Object.assign(this, {
      player: 'anonymous',
      questions: 0,
    }, options);
    this.frames = new Frames(options.frames, this.started_at);
  }

  _computeScore() {
    let score = this.frames.score;
    if (this._hasCleared()) {
      if (this.frames.isNoMiss()) {
        score += NO_MISS_POINTS;
      }
    }
    return score;
  }

  _computeBonuses() {
    const bonuses = [];
    if (this._hasCleared()) {
      if (this.frames.isNoMiss()) {
        bonuses.push(Bonus.noMiss());
      }
    }
    return bonuses;
  }

  _hasCleared() {
    return !this.frames.isEmpty() && this.frames.length === this.questions;
  }

  _computeElapsedTime() {
    const lastValidFrame = this.frames.getLastFrame();
    if (lastValidFrame) {
      const time = new Date(lastValidFrame.answered_at).getTime();
      const startTime = new Date(this.started_at).getTime();
      return (time - startTime) / 1000;
    }
    return 0;
  }

  get detail() {
    return {
      player: this.player,
      started_at: this.started_at,
      questions: this.questions,
      score: this._computeScore(),
      frames: this.frames.toJSON(),
      bonuses: this._computeBonuses(),
      elapsed_time: this._computeElapsedTime(),
      completion: this.frames.computeCompletion(this.questions),
      accuracy: this.frames.computeAccuracy(),
    };
  }
}

export default Game;
