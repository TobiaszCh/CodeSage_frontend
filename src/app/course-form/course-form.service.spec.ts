import { TestBed } from '@angular/core/testing';

import { CourseFormService } from '../course-form.service';

describe('CourseFormService', () => {
  let service: CourseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
