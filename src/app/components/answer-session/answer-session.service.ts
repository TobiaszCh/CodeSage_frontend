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
    return this.httpClient.get<Question>("http://localhost:8020/questions/answerSessionId/" + answerSessionId);
  }

  public selectQuestionAnswer(answerSessionId: number, questionId: number, answerId: number): Observable<number> {
    const questionAnswerSelectDto: QuestionAnswerSelectDto = {
      id: answerSessionId,
      questionId: questionId,
      answerId: answerId
    };
    return this.httpClient.put<number>("http://localhost:8020/answer-session/selectQuestionAnswer/" + questionAnswerSelectDto.id,  questionAnswerSelectDto);
  }

  public updateAnswerSessionStatus(answerSessionId: number): Observable<AnswerSessionStatusIdDto> {
    const answerSessionStatusIdDto: AnswerSessionStatusIdDto = {
      id: answerSessionId
    }
    console.log("Updating answer session status for ID in service:", answerSessionId);
    console.log("Updating answer session status for ID in service Object:", answerSessionStatusIdDto.id);
    console.log(answerSessionStatusIdDto);
    return this.httpClient.put<AnswerSessionStatusIdDto>("http://localhost:8020/answer-session/updateStatus/" + answerSessionStatusIdDto.id, answerSessionStatusIdDto);

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
  id: number,
  questionId: number,
  answerId: number
}
export interface AnswerSessionStatusIdDto {
  id: number
}

