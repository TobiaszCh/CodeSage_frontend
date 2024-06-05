import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer-session',
  templateUrl: './answer-session.component.html',
  styleUrls: ['./answer-session.component.css']
})
export class AnswerSessionComponent implements OnInit {

  levelId?: number;
  courseId?: number;

  constructor(private router: ActivatedRoute) {

  }
  
  
  ngOnInit(): void {

  }

}
