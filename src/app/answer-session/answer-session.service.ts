import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerSessionService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {

  }

  public getQuestions(answerSessionId: number): Observable<Question> {
    return this.httpClient.get<Question>(`${this.baseUrl}/questions/answerSessionId/${answerSessionId}`);
  }

  public selectQuestionAnswer(answerSessionId: number, questionId: number, answerId: number): Observable<number> {
    const questionAnswerSelectDto: QuestionAnswerSelectDto = {
      questionId: questionId,
      answerId: answerId
    };
    return this.httpClient.put<number>(`${this.baseUrl}/answer-session/selectQuestionAnswer/${answerSessionId}`, questionAnswerSelectDto);
  }

  public updateAnswerSessionStatus(answerSessionId: number, answerSessionStatusIdDto?: AnswerSessionStatusIdDto) {
    this.httpClient.put<number>(`${this.baseUrl}/answer-session/updateStatus/${answerSessionId}`, answerSessionStatusIdDto).subscribe();

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

