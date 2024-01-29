import { Component, OnInit } from '@angular/core';
import { Subject, SubjectService } from './subject.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit{

  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const courseId = params['courseId'];
      this.subjectService.getSubject().subscribe(subject =>
        this.subjects = subject.filter(a => a.courseId === +courseId))
     
    })
  }

}
