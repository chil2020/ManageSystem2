import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesExperienceComponent } from './employees-experience.component';

describe('EmployeesExperienceComponent', () => {
  let component: EmployeesExperienceComponent;
  let fixture: ComponentFixture<EmployeesExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
