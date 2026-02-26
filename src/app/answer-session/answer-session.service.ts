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

  public updateAnswerSessionStatus(answerSessionId: number, answerSessionStatusIdDto?: AnswerSessionStatusIdDto): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/answer-session/updateStatus/${answerSessionId}`, answerSessionStatusIdDto);

  }

  public getPoints(answerSessionId: number): Observable<AllPointsAnswerSession> {
    return this.httpClient.get<AllPointsAnswerSession>(`${this.baseUrl}/answer-session/${answerSessionId}`);
  }

  public getCoursId(answerSessionId: number): Observable<number> {
      return this.httpClient.get<number>(`${this.baseUrl}/answer-session/${answerSessionId}/course-id`);
    }
}

export interface Question {
  id: number;
  displayName: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  displayName: string;
}

export interface QuestionAnswerSelectDto {
  questionId: number,
  answerId: number
}

export interface AnswerSessionStatusIdDto {
  id: number
}

export interface AllPointsAnswerSession {
  allAnswers: number;
  correctAnswers: number;
}

