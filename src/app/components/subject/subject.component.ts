import { Component, OnInit } from '@angular/core';
import { Subject, SubjectService } from './subject.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
//CourseDetailsComponent
export class SubjectComponent implements OnInit {

  subjects: Subject[] = [];


  constructor(private subjectService: SubjectService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const courseId = param["courseId"]
      this.subjectService.getSubject(courseId).subscribe(value =>
        this.subjects = value);
    })
  }

  startSession(subjectId: number) {
    if (confirm('Czy chcesz rozpocząć sesję?')) {
      this.sendSubjectId(subjectId);
    } 
  }
  sendSubjectId(subjectId: number) {
    this.subjectService.sendSubjectIdToAnswerSession(subjectId).subscribe(responseAnswerSessionId => {
      console.log(responseAnswerSessionId)
      this.router.navigate(['/answer-session', responseAnswerSessionId])
    });
  }
}
