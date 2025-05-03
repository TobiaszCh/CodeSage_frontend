import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerSessionService {

  constructor(private httpClient: HttpClient) { 

  }

  public getQuestions(answerSessionId: number): Observable<Question> {
    console.log(answerSessionId)
    return this.httpClient.get<Question>("http://localhost:8020/questions/answerSessionId/" + answerSessionId, {withCredentials: true});
  }

  public selectQuestionAnswer(answerSessionId: number, questionId: number, answerId: number): Observable<number> {
    const questionAnswerSelectDto: QuestionAnswerSelectDto = {
      questionId: questionId,
      answerId: answerId
    };
    //console.log(answerSessionId);
    //console.log(questionId);
    console.log(answerId);
    return this.httpClient.put<number>("http://localhost:8020/answer-session/selectQuestionAnswer/" + answerSessionId,  questionAnswerSelectDto, {withCredentials: true});
  }

  public updateAnswerSessionStatus(answerSessionId: number, answerSessionStatusIdDto?: AnswerSessionStatusIdDto) {
     this.httpClient.put<number>("http://localhost:8020/answer-session/updateStatus/" + answerSessionId, answerSessionStatusIdDto, {withCredentials: true}).subscribe();

}
}

export interface AnswerSession {
  id: number,
  userPoints: number,
  userId: number,
  subjectId: number
}

export interface Question {
  id: number;
  displayName: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  displayName: string;
  correct: boolean;
}

export interface QuestionAnswerSelectDto {
  questionId: number,
  answerId: number
}
export interface AnswerSessionStatusIdDto {
  id: number
}

