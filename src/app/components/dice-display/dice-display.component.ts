import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-display',
  templateUrl: './dice-display.component.html',
  styleUrls: ['./dice-display.component.css'],
})
export class DiceDisplayComponent implements OnInit {
  @Input() rolls: number[] = [];
  @Input() held: boolean[] = [];
  @Input() reRolls: number = 0;
  @Output() hold = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  onClickHold(index: number) {
    this.hold.emit(index);
  }
}
