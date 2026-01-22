import { Component, OnInit } from '@angular/core';
import { CreateQuestionService, Questions } from './create-question.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
      this.newQuestions = Array.from({length: 10}, () => this.createEmptyQuestion());
    })
  }

  public createQuestions(newQuestions: Questions[]): void {
    this.createQuestionService.createQuestions(newQuestions).subscribe({
      next: (courseId) => {
        this.router.navigate(["courses", courseId]);
        this.showSuccess("Pytania do tematu zostały stworzone");
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

  public createEmptyQuestion(): Questions {
    return {
      displayName: "",
      subjectId: this.subjectId,
      answers: [
        {displayName: "", isCorrect: false},
        {displayName: "", isCorrect: false},
        {displayName: "", isCorrect: false},
        {displayName: "", isCorrect: false}
      ]
    }
  }

  public correctAnswer(questionIndex: number): void {
    const questions = this.newQuestions[questionIndex];
    questions.answers.forEach((result, index) => result.isCorrect = index === this.correctAnswerIndex);
    this.correctAnswerIndex = undefined;    
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

  public showError(messageToToastr: string) {
    this.toastr.error(messageToToastr, "Błąd!");
  }
 
}
