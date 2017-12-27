const _ = require('lodash');

const NO_MISS_POINTS = 50000;

class Bonus {

    static noMiss() {
        return { type: 'NO_MISS', score: NO_MISS_POINTS };
    }

}

module.exports = {Bonus, NO_MISS_POINTS};