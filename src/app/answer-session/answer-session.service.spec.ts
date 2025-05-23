import { TestBed } from '@angular/core/testing';
import { AnswerSessionService } from './answer-session.service';

describe('QuestionService', () => {
  let service: AnswerSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
