import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesPictureComponent } from './employees-picture.component';

describe('EmployeesPictureComponent', () => {
  let component: EmployeesPictureComponent;
  let fixture: ComponentFixture<EmployeesPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
