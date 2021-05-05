import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesEducationComponent } from './employees-education.component';

describe('EmployeesEducationComponent', () => {
  let component: EmployeesEducationComponent;
  let fixture: ComponentFixture<EmployeesEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
