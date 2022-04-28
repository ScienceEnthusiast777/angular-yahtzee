import { Component, OnInit } from '@angular/core';

type LookUp = { [key: string]: any };

export type Table = {
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

  public held = new Array(5).fill(false);

  public rolls: number[] = new Array(5).fill(1);

  public tableData: Table = {};

  public turns: number = 13;

  public reRolls: number = 3;

  constructor() {}

  ngOnInit(): void {
    this.initialiseTable();
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
    this.tableData = temp;
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
    let temp = [...rolls];
    return (
      temp
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
      this.tableData[criteria].potentialScore = this.yahtzeeScoring[criteria](
        this.rolls
      );
    });
  }

  rollDice() {
    let newRolls: number[] = [];
    for (let i = 0; i < this.rolls.length; i++) {
      if (!this.held[i]) {
        newRolls.push(Math.floor(Math.random() * 6) + 1);
      } else {
        newRolls.push(this.rolls[i]);
      }
    }
    this.rolls = [...newRolls];
  }

  onClickRoll() {
    this.rollDice();
    this.calcPotential();
    this.reRolls--;
  }

  hold(die: number) {
    this.held[die] = !this.held[die];
  }

  commitScore(criteria: string) {
    this.tableData[criteria].hasBeenScored = true;
    this.tableData[criteria].score = this.tableData[criteria].potentialScore;
    this.reRolls = 3;
    this.held = new Array(5).fill(false);
    if (this.turns != 0) {
      this.turns--;
    }
  }
}
