import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMachineComponent } from './machine.component';

describe('ChartMachineComponent', () => {
  let component: ChartMachineComponent;
  let fixture: ComponentFixture<ChartMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
