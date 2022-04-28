import { Component, Input, OnInit } from '@angular/core';
import { Table } from '../yahtzee-game/yahtzee-game.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public objectkeys = Object.keys;

  @Input() tableData: Table = {};
  constructor() {}

  ngOnInit(): void {
    console.log(this.tableData)
  }
}
