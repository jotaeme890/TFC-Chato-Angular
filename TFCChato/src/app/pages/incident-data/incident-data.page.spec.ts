import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentDataPage } from './incident-data.page';

describe('IncidentDataPage', () => {
  let component: IncidentDataPage;
  let fixture: ComponentFixture<IncidentDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
