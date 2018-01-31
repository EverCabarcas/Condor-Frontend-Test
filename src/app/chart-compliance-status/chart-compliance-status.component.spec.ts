import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComplianceStatusComponent } from './chart-compliance-status.component';

describe('ChartComplianceStatusComponent', () => {
  let component: ChartComplianceStatusComponent;
  let fixture: ComponentFixture<ChartComplianceStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComplianceStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComplianceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
