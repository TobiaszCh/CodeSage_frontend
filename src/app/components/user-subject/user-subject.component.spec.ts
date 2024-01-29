import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubjectComponent } from './user-subject.component';

describe('UserSubjectComponent', () => {
  let component: UserSubjectComponent;
  let fixture: ComponentFixture<UserSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSubjectComponent]
    });
    fixture = TestBed.createComponent(UserSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
