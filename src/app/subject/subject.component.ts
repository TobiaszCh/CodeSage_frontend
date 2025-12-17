import { Component, OnInit } from '@angular/core';
import { Subject, CheckCompletedSessions, SubjectService, SubjectCompletedAge, AnswerSession, Course, CreateSucject } from './subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDeleteDialogComponent } from './dialogs/delete/subject-delete-dialog.component';
import { SubjectAddDialogComponent } from './dialogs/add/subject-add-dialog.component';
import { SubjectEditDialogComponent } from './dialogs/edit/subject-edit-dialog.component';


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
  courseId!: number;
  addSubject: boolean = false;
  newSubject: CreateSucject = {
    displayName: "",
  }



  constructor(private subjectService: SubjectService, private activatedRoute: ActivatedRoute, private router: Router, 
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.courseId = param["courseId"];
      this.getSubjects(this.courseId);
      this.getAllNumbersOfCorrectAnswersAtLeast80Percent(this.courseId);
      this.subjectService.getCourseById(this.courseId).subscribe(value => this.titleFromCourse = value);

    })
  }

  public getSubjects(courseId: number) {
    this.subjectService.getSubjects(courseId).subscribe(value =>
        this.subjects = value);
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

  public createSubject(displayName: string, courseId: number): void {
    this.subjectService.createSucject(displayName, courseId).subscribe(() => {
        this.getSubjects(courseId);
        this.escapeFromInput();
      }
    );
  }

  public escapeFromInput(): void {
    this.addSubject = false;
  }

  public goToCreateQuestion(subjectId: number): void {
    if (confirm("Temat nie zawiera w sobie żadnych pytań lub nie jest skończony. Chcesz wejść?")) {
      this.router.navigate(["/create-question", subjectId]);
    }
  }

  public startAnswerSessionOrCreateQuestions(subjectId: number): void {
    this.subjectService.hasQuestionsInSubject(subjectId).subscribe(result => {
      if(result) {
        this.startSession(subjectId)
      }
      else {
        this.goToCreateQuestion(subjectId);
      }

    })
  }

  public deleteSubjectById(subjectId: number) {
    this.subjectService.deleteSubjectById(subjectId).subscribe(() => {
      this.subjects = this.subjects.filter(subject => subject.id != subjectId);
    });
  }

  public updateSubject(subjectId: number, displayName: string) {
    this.subjectService.updateSubject(subjectId, displayName).subscribe(() => {
      this.getSubjects(this.courseId);
    });
  }

  public openDeleteDialog(subjectId: number): void {
    this.dialog.open(SubjectDeleteDialogComponent, {
      width: '550px',
    }).afterClosed().subscribe(result => {
      if(result) {
        this.deleteSubjectById(subjectId);
      }
    });
  }

  public openAddDialog(): void {
    this.dialog.open(SubjectAddDialogComponent, {
      width: '550px',
    }).afterClosed().subscribe(result => {
      if(result) {
        this.createSubject(result, this.courseId);
      }
    });
  }

  public openEditDialog(subjectId: number, displayName: string): void {
    this.dialog.open(SubjectEditDialogComponent, {
      width: '550px',
      data: {
        name: displayName
      }
    }).afterClosed().subscribe(result => {
      if(result) {
        this.updateSubject(subjectId, result);
      }
    });
  }

}
 