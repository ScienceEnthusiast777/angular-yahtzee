import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YahtzeeGameComponent } from './yahtzee-game/yahtzee-game.component';
import { TableComponent } from './table/table.component';
import { DiceDisplayComponent } from './dice-display/dice-display.component';
import { DiceComponent } from './dice/dice.component';

@NgModule({
  declarations: [
    YahtzeeGameComponent,
    TableComponent,
    DiceDisplayComponent,
    DiceComponent,
  ],
  imports: [CommonModule],
  exports: [
    YahtzeeGameComponent,
    TableComponent,
    DiceDisplayComponent,
    DiceComponent,
  ],
})
export class ComponentsModule {}
