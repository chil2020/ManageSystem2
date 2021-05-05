import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBasicComponent } from './edit-basic.component';

describe('EditBasicComponent', () => {
  let component: EditBasicComponent;
  let fixture: ComponentFixture<EditBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
