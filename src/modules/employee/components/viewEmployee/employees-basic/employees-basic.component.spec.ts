import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesBasicComponent } from './employees-basic.component';

describe('EmployeesBasicComponent', () => {
  let component: EmployeesBasicComponent;
  let fixture: ComponentFixture<EmployeesBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
