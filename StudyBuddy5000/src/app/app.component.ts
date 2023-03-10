import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from './api.service';
import { questionAnswer } from './interfaces/questionAnswer.interface';
import { NgForm } from '@angular/forms'
import { userData } from './interfaces/userData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'StudyBuddy5000';
  studies: questionAnswer[] = []
  isCanHasAnswer: boolean = false;
  question: string = '';
  answer: string = '';
  truthy: boolean = false;
  isHome: boolean = this.getPathName() === 'Home';
  currentUser: userData | null = null;

  constructor(private api: ApiService) { }

  getUser() {
  }
  
  getPathName() {
    let pathArray = window.location.pathname.split('/');
    return pathArray[
      pathArray.length - 1
    ]
  }

  postStudy(newStudy: NgForm) {
    let study: questionAnswer = {
      id: -1,
      question: newStudy.form.value.question,
      answer: newStudy.form.value.answer
    }
    this.api.createStudy(study).subscribe(
      (x) => this.studies.push(x as questionAnswer)
    )

    this.getStudies();
  }

  getStudies() {
    this.api.getStudy()
      .subscribe(
        (x) =>
          this.studies = x
      )
  }

  notTruthy() {
    this.truthy = !this.truthy;
    console.log(typeof this.studies)
  }

  ngOnInit(): void {
    this.getStudies()

  }
}
