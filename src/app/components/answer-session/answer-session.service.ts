import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerSessionService {

  constructor(private httpClienct: HttpClient) { 

  }

  public getQuestions(answerSessionId: number): Observable<Question> {
    return this.httpClienct.get<Question>("http://localhost:8020/questions/answerSessionId/" + answerSessionId);
  }

  public selectQuestionAnswer(answerSessionId: number, questionId: number, answerId: number): Observable<number> {
    const questionAnswerSelectDto: QuestionAnswerSelectDto = {
      id: answerSessionId,
      questionId: questionId,
      answerId: answerId
    };
    return this.httpClienct.put<number>("http://localhost:8020/answer-session/selectQuestionAnswer/" + questionAnswerSelectDto.id,  questionAnswerSelectDto);
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

