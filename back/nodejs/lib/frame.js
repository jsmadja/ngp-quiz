const HIT_POINTS = 100;
const CRITICAL_POINTS = 100;
const CRITICAL_HITS = [3, 8, 13, 21, 34, 55, 89, 144, 233];

class Frame {
    constructor(options, previousFrame) {
        Object.assign(this, { score: 0 }, options);
        this.previousFrame = previousFrame;
    }

    toJSON() {
        return {
            answered_at: this.answered_at,
            player_answer: this.player_answer,
            score: this.score,
            valid_answer: this.valid_answer,
            critical: this.critical_value > 0
        };
    }

    get elapsedTimeInMillis() {
        return new Date(this.answered_at).getTime() - new Date(this.previousFrame.answered_at).getTime();
    }

    isValidAnswer() {
        return this.player_answer === this.valid_answer;
    }

    get critical_value() {
        let value = 1;
        let valid = false;
        let previousFrame = this.previousFrame;
        do {
            if (previousFrame && previousFrame.isValidAnswer) {
                valid = previousFrame.isValidAnswer();
                if (valid) {
                    value++;
                    previousFrame = previousFrame.previousFrame;
                }
            } else {
                valid = false;
            }
        } while (valid);

        if (CRITICAL_HITS.indexOf(value) >= 0) {
            return value;
        }
        return 0;
    }

    computeScore() {
        this.score = HIT_POINTS;
        if (this.critical_value > 0) {
            this.score += this.critical_value * CRITICAL_POINTS;
        }
    }

    compute() {
        if (this.isValidAnswer()) {
            this.computeScore();
        }
    }
}

module.exports = Frame;