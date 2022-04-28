import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YahtzeeGameComponent } from './yahtzee-game.component';

describe('YahtzeeGameComponent', () => {
  let component: YahtzeeGameComponent;
  let fixture: ComponentFixture<YahtzeeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YahtzeeGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YahtzeeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
