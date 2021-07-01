import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesPositionComponent } from './employees-position.component';

describe('EmployeesPositionComponent', () => {
  let component: EmployeesPositionComponent;
  let fixture: ComponentFixture<EmployeesPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
