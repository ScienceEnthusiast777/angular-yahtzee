import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-display',
  templateUrl: './dice-display.component.html',
  styleUrls: ['./dice-display.component.css']
})
export class DiceDisplayComponent implements OnInit {
  @Input() rolls : number[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
