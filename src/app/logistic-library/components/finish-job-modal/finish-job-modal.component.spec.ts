import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishJobModalComponent } from './finish-job-modal.component';

describe('FinishJobModalComponent', () => {
  let component: FinishJobModalComponent;
  let fixture: ComponentFixture<FinishJobModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishJobModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
