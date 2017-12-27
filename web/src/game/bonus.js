const NO_MISS_POINTS = 50000;

class Bonus {

  static noMiss() {
    return { type: 'NO_MISS', score: NO_MISS_POINTS };
  }

}

export { Bonus, NO_MISS_POINTS };
