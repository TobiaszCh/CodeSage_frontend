import { Component, OnInit } from '@angular/core';
import { Subject, SubjectService } from './subject.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjects: Subject[] = [];


  constructor(private subjectService: SubjectService, private router: Router) {
  }

  ngOnInit(): void {
    this.subjectService.getSubject().subscribe(value => this.subjects = value)
  }

  startSession(subjectId: number) {
    if (confirm('Czy chcesz rozpocząć sesję?')) {
      this.sendSubjectId(subjectId);
    }
  }
  sendSubjectId(subjectId: number) {
    this.subjectService.sendSubjectIdToAnswerSession(subjectId).subscribe(response => {
      console.log(response)
      //navigateTo/answersession/311
    }
    );
  }

}
