import { Component, OnInit } from '@angular/core';

type LookUp = { [key: string]: any };

type Table = {
  [key: string]: {
    potentialScore: number;
    score: number;
    hasBeenScored: boolean;
  };
};

@Component({
  selector: 'app-yahtzee-game',
  templateUrl: './yahtzee-game.component.html',
  styleUrls: ['./yahtzee-game.component.css'],
})
export class YahtzeeGameComponent implements OnInit {

  private criterias = [
    'aces',
    'twos',
    'threes',
    'fours',
    'fives',
    'sixes',
    'threekind',
    'fourkind',
    'fullhouse',
    'smallstraight',
    'largestraight',
    'yahtzee',
    'chance',
  ];

  private yahtzeeScoring: LookUp = {
    aces: (rolls: number[]) => {
      return this.upperSection(1, rolls);
    },
    twos: (rolls: number[]) => {
      return this.upperSection(2, rolls);
    },
    threes: (rolls: number[]) => {
      return this.upperSection(3, rolls);
    },
    fours: (rolls: number[]) => {
      return this.upperSection(4, rolls);
    },
    fives: (rolls: number[]) => {
      return this.upperSection(5, rolls);
    },
    sixes: (rolls: number[]) => {
      return this.upperSection(6, rolls);
    },
    threekind: (rolls: number[]) => {
      return this.repeating(rolls, 3)
        ? rolls.reduce((prev, curr) => {
            return prev + curr;
          }, 0)
        : 0;
    },
    fourkind: (rolls: number[]) => {
      return this.repeating(rolls, 4)
        ? rolls.reduce((prev, curr) => {
            return prev + curr;
          }, 0)
        : 0;
    },
    fullhouse: (rolls: number[]) => {
      return this.repeating(rolls, 3) && this.repeating(rolls, 2) ? 25 : 0;
    },
    smallstraight: (rolls: number[]) => {
      return this.sequence(4, rolls) ? 30 : 0;
    },
    largestraight: (rolls: number[]) => {
      return this.sequence(5, rolls) ? 40 : 0;
    },
    yahtzee: (rolls: number[]) => {
      return [...new Set(rolls)].length === 1 ? 50 : 0;
    },
    chance: (rolls: number[]) => {
      return rolls.reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    },
  };

  private rolls: number[] = new Array(5).fill(0);

  private held = new Array(5).fill(false);

  private myTable: Table = {};

  private objectkeys = Object.keys; 

  constructor() {}

  ngOnInit(): void {
    this.initialiseTable();
    console.log(this.myTable)
  }

  initialiseTable() {
    let temp: Table = {};
    this.criterias.forEach((criteria) => {
      temp[criteria] = {
        potentialScore: 0,
        score: 0,
        hasBeenScored: false,
      };
    });
    this.myTable = temp;
  }

  upperSection(die: number, rolls: number[]) {
    return rolls.reduce((prev, curr) => {
      return curr === die ? prev + curr : prev;
    }, 0);
  }

  repeating(rolls: number[], count: number) {
    return (
      [...new Set(rolls)].filter((uniqueDie) => {
        return (
          rolls.filter((die) => {
            return uniqueDie === die;
          }).length === count
        );
      }).length > 0
    );
  }

  sequence(seq: number, rolls: number[]) {
    return (
      rolls
        .sort((a, b) => {
          return a - b;
        })
        .map((e, i) => {
          if (i > 0) {
            return e === rolls[i - 1] + 1;
          } else {
            return true;
          }
        })
        .filter((e) => {
          return e === true;
        }).length >= seq
    );
  }

  calcPotential() {
    this.criterias.forEach((criteria) => {
      this.myTable[criteria].potentialScore = this.yahtzeeScoring[criteria](
        this.rolls
      );
    });
  }

  rollDice() {
    for (let i = 0; i < this.rolls.length; i++) {
      console.log(this.held[i]);
      if (!this.held[i]) {
        this.rolls.splice(i, 1, Math.floor(Math.random() * 6) + 1);
      }
    }
  }

  hold(die: number) {
    this.held[die - 1] = true;
  }

  score(criteria: string) {
    //commit to scoring for this criteria
  }
}
