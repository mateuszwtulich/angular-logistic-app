import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDriverModalComponent } from './assign-driver-modal.component';

describe('AssignDriverModalComponent', () => {
  let component: AssignDriverModalComponent;
  let fixture: ComponentFixture<AssignDriverModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDriverModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDriverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
