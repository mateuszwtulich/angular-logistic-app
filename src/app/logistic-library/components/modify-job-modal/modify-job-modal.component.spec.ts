import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyJobModalComponent } from './modify-job-modal.component';

describe('ModifyJobModalComponent', () => {
  let component: ModifyJobModalComponent;
  let fixture: ComponentFixture<ModifyJobModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyJobModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
