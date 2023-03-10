import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { questionAnswer } from '../interfaces/questionAnswer.interface';
import { NgForm } from '@angular/forms';
import { userData } from '../interfaces/userData.interface';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  studies:questionAnswer[] = [];
  currentUser: userData | null = null;
  errorMessage = '';
  successMessage='';
  constructor(private api: ApiService) { }
  postStudy(newStudy: NgForm) {
    let study:questionAnswer = {
      id: -1,
      question: newStudy.form.value.question,
      answer: newStudy.form.value.answer
    }
    if(this.studies.filter(x=> x.question === study.question && x.answer === study.answer)[0]){
      newStudy.resetForm()
      this.errorMessage = 'Question already exists!'
      this.successMessage="";
    }else{
    this.api.createStudy(study).subscribe(
      response => {
        if(response){
          console.log(response)
          this.successMessage = 'Data added successfully!';
          this.errorMessage="";
          newStudy.resetForm()
        }
      },);
    }
    this.getStudies();
  }

  getStudies() {
    this.api.getStudy()
      .subscribe(
        (x) =>
          this.studies = x
      )
  }
  ngOnInit(): void {
    this.getStudies();
  }

}
