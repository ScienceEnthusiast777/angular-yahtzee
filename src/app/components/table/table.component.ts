import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Table } from '../yahtzee-game/yahtzee-game.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public objectkeys = Object.keys;

  @Input() tableData: Table = {};
  @Input() reRolls: number = 0;
  @Output() commitScore = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {
    console.log(this.tableData);
  }

  onClickCommitScore(criteria: string) {
    this.commitScore.emit(criteria);
  }
}
