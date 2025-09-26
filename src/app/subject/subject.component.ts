import { Component, OnInit } from '@angular/core';
import { Subject, CheckCompletedSessions, SubjectService, SubjectCompletedAge, AnswerSession, Course } from './subject.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
//CourseDetailsComponent
export class SubjectComponent implements OnInit {

  subjects: Subject[] = [];
  titleFromCourse?: Course;
  checkCompletedSessions: CheckCompletedSessions[] = [];
  answerSessionId!: AnswerSession;


  constructor(private subjectService: SubjectService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const courseId = param["courseId"];
      this.subjectService.getSubject(courseId).subscribe(value =>
        this.subjects = value);
      this.getAllNumbersOfCorrectAnswersAtLeast80Percent(courseId);
      this.subjectService.getCourseById(courseId).subscribe(value => this.titleFromCourse = value);

    })
  }

  public startSession(subjectId: number) {
    if (confirm('Czy chcesz rozpocząć sesję?')) {
      this.sendSubjectIdToAnswerSession(subjectId);
    }
  }

  public sendSubjectIdToAnswerSession(subjectId: number): void {
    this.subjectService.sendSubjectIdToAnswerSession(subjectId).subscribe(responseAnswerSessionId => {
      this.router.navigate(['/answer-session', responseAnswerSessionId])
    });
  }

  public getAllNumbersOfCorrectAnswersAtLeast80Percent(courseId: number) {
    this.subjectService.getAllNumbersOfCorrectAnswersAtLeast80Percent(courseId).subscribe(
      value => {
        this.checkCompletedSessions = value;
        console.log(value);

      });
  }

  public color(idSubject: number): string {
    for (const checkCompletedSession of this.checkCompletedSessions) {
      if (checkCompletedSession.id == idSubject) {
        switch (checkCompletedSession.subjectCompletedAge) {
          case SubjectCompletedAge.FRESH:
            return 'green';
          case SubjectCompletedAge.OLD:
            return 'yellow';
          default:
            return '';
        }
      }
    }
    return ''
  }

  public backToCourses(): void {
    this.router.navigate(["/courses"]);
  }

}
