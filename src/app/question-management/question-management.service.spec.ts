import { TestBed } from '@angular/core/testing';
import { ManageQuestionService } from './question-management.service';


describe('CreateQuestionService', () => {
  let service: ManageQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
