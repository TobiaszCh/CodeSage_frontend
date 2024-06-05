import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSessionComponent } from './answer-session.component';

describe('AnswerSessionComponent', () => {
  let component: AnswerSessionComponent;
  let fixture: ComponentFixture<AnswerSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerSessionComponent]
    });
    fixture = TestBed.createComponent(AnswerSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
