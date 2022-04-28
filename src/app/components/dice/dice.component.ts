import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css'],
})
export class DiceComponent implements OnInit {
  @Input() die: number = 1;
  public imagePaths = [
    'assets/images/dice-six-faces-one.svg',
    'assets/images/dice-six-faces-two.svg',
    'assets/images/dice-six-faces-three.svg',
    'assets/images/dice-six-faces-four.svg',
    'assets/images/dice-six-faces-five.svg',
    'assets/images/dice-six-faces-six.svg',
  ];

  constructor() {}

  ngOnInit(): void {}
}
