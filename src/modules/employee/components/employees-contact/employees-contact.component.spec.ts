import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesContactComponent } from './employees-contact.component';

describe('EmployeesContactComponent', () => {
  let component: EmployeesContactComponent;
  let fixture: ComponentFixture<EmployeesContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
