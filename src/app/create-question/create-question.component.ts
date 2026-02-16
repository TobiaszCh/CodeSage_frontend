import { Component, OnInit } from '@angular/core';
import { CreateQuestionService, Questions } from './create-question.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  
  newQuestions!: Questions[];
  error!: string;
  correctAnswerIndex?: number;
  subjectId!: number;
  
  constructor(private createQuestionService: CreateQuestionService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.subjectId = param["subjectId"];
      this.showOuestions(this.subjectId).subscribe(result => {
        this.newQuestions = this.addIndexCorrectAnswer(result); console.log(this.newQuestions[1]);console.log(this.newQuestions[1].answers); });
            
    })
  }
  
  public createOrUpdateQuestions(newQuestions: Questions[]): void {
    this.createQuestionService.hasQuestionsInSubject(this.subjectId).pipe(switchMap(result => 
      result  
      ? this.createQuestionService.updateQuestions(newQuestions)
      : this.createQuestionService.createQuestions(newQuestions)
    )).subscribe({
        next: (courseId) => {
          this.router.navigate(["courses", courseId]);
          this.showSuccess("Zapisano zmiany");
        },
        error: error => {
          this.showError(error.error.message);
        }
    })
  }

  public backToSubjects(subjectId: number): void {
    this.createQuestionService.getCoursId(subjectId).subscribe(result => {
      this.router.navigate(["courses", result]);
    })
  }

  public showOuestions(subjectId: number): Observable<Questions[]> {
    return this.createQuestionService.hasQuestionsInSubject(subjectId).pipe(switchMap(result => 
      result ? this.createQuestionService.getQuestionsBySubjectId(subjectId)
       : of(Array.from({length: 10}, () => ({
          displayName: "", 
          subjectId: subjectId,
          answers: [
            {displayName: "", isCorrect: false},
            {displayName: "", isCorrect: false},
            {displayName: "", isCorrect: false},
            {displayName: "", isCorrect: false}
          ]
      })))
    ));
  }

  public correctAnswer(questionIndex: number, correctAnswerIndex?: number): void {
    const questions = this.newQuestions[questionIndex];
    questions.answers.forEach((result, index) => result.isCorrect = index === correctAnswerIndex);
    this.correctAnswerIndex = undefined;    
  }

  public addIndexCorrectAnswer(questions: Questions[]): Questions[] {
    return questions.map(result => {
      result.indexCorrectAnswer = result.answers.findIndex(result => result.isCorrect == true);
      return result;
    }); 
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

  public showError(messageToToastr: string) {
    this.toastr.error(messageToToastr, "Błąd!");
  }
 
}
