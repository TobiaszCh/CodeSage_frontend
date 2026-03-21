import { Component, OnInit } from '@angular/core';
import { Subject, CheckCompletedSessions, SubjectService, SubjectCompletedAge, AnswerSession, Course, CreateSubject} from './subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDeleteDialogComponent } from './dialogs/delete/subject-delete-dialog.component';
import { SubjectInfoDialogComponent } from './dialogs/info/subject-info-dialog.component';
import { SubjectStartSessionDialogComponent } from './dialogs/start-session/subject-start-session-dialog.component';
import { SubjectEditDialogComponent } from './dialogs/edit/subject-edit-dialog.component';
import { SubjectAddDialogComponent } from './dialogs/add/subject-add-dialog.component';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjects: Subject[] = [];
  titleFromCourse?: Course;
  checkCompletedSessions: CheckCompletedSessions[] = [];
  answerSessionId!: AnswerSession;
  courseId!: number;
  addSubject: boolean = false;
  newSubject: CreateSubject = {
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

  public sendSubjectIdToAnswerSession(subjectId: number): void {
    this.subjectService.sendSubjectIdToAnswerSession(subjectId).subscribe(responseAnswerSessionId => {
      this.router.navigate(['/answer-session', responseAnswerSessionId])
    });
  }

  public getAllNumbersOfCorrectAnswersAtLeast80Percent(courseId: number) {
    this.subjectService.getAllNumbersOfCorrectAnswersAtLeast80Percent(courseId).subscribe(
      value => {
        this.checkCompletedSessions = value;
      }
    );
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
    this.subjectService.createSucject(displayName, courseId).subscribe((result) => {
      this.goToCreateQuestion(result);
      }
    );
  }

  public goToCreateQuestion(subjectId: number): void {
      this.router.navigate(["subjects", subjectId, "questions", "new"]);
  }

  public goToEditQuestion(subjectId: number): void {
      this.router.navigate(["subjects", subjectId, "questions", "edit"]);
  }

  public startAnswerSession(subjectId: number): void {
    this.subjectService.hasQuestionsInSubject(subjectId).subscribe(result => {
      if(result) {
        this.openStartSessionDialog(subjectId);
      }
      else {
        this.openInfoDialog();
      }
    });
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

  public openInfoDialog(): void {
    this.dialog.open(SubjectInfoDialogComponent, {
      width: '550px',
    })
  }

  public openStartSessionDialog(subjectId: number): void {
    this.dialog.open(SubjectStartSessionDialogComponent, {
      width: '550px',
    }).afterClosed().subscribe(result => {
      if(result) {
        this.sendSubjectIdToAnswerSession(subjectId);
      }
    });
  }
}
 