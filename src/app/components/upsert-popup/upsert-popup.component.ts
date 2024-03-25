import { Component, inject, Input, OnInit } from '@angular/core';
import {NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizItem } from 'src/app/interfaces/quiz-item';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-upsert-popup',
  // templateUrl: './upsert-popup.component.html',
  styleUrls: ['./upsert-popup.component.css'],
  template:`
  <div class="modal-header">
    <div>
      <h1>{{isEdit?'Edit':'Add'}} Question</h1>
    </div>
		<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
	</div>
  <div class="modal-body">
    <form [formGroup]="questionForm" (ngSubmit)="submitForm()">
      <div class="mb-4 input-group">
        <span class="input-group-text">Question</span>
        <input 
        type="text"
        name="question"
        id="question"
        class="form-control"
        formControlName="question"
        >
      </div>

      <div formArrayName="answers" class="mb-4">
          <div *ngFor="let answer of answers.controls; let i=index;" class="input-group mb-2 w-50">
            <span class="input-group-text">{{alphabetIndexArray[i]}}</span>
            <input type="text" [formControlName]="i" class="form-control answers" [id]="i">
          </div>
      </div>

      <div>
        <label for="correctAnswer" class="mr-2">Department</label>
        <select name="correctAnswer" id="correctAnswer"
        class="form-control" formControlName="correctAnswer"
        (change)="changeCorrectAnswer($event)"
        >
        <option *ngFor="let index of numberIndexArray" [ngValue]="index">
            {{answers.controls[index].value}}
        </option>
        </select>
      </div>

      <div class="mt-3 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">{{isEdit? 'Edit' : 'Add'}} Question</button>
      </div>
    </form>
  </div>
  `
})
export class UpsertPopupComponent implements OnInit {
  questionForm!: FormGroup
  activeModal = inject(NgbActiveModal)
  alphabetIndexArray = ['A', 'B', 'C', 'D']
  numberIndexArray = [0, 1, 2, 3];
  // quizItem!: QuizItem;

  // for edit
  @Input() isEdit: boolean = false;
  @Input() oldQuizItem!: QuizItem;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService){
    this.questionForm = this.formBuilder.group({
      question: ['',[Validators.required]],
      answers: this.formBuilder.array([
      ]),
      correctAnswer: ['',[Validators.required]]
    })

    for(let i=0;i<4;i++){
      this.answers.push(this.formBuilder.control(
        '',
        [Validators.required]
        ));
    }

    
  }
  ngOnInit(): void {
    console.log(this.oldQuizItem)
    if (this.isEdit && this.oldQuizItem) {
      this.questionForm.patchValue({
        question: this.oldQuizItem.question,
        answers: this.oldQuizItem.answers,
        correctAnswer: this.oldQuizItem.correctAnswerIndex
      });
    }
  }

  get answers(){
    return this.questionForm.get('answers') as FormArray
  }

  changeCorrectAnswer(e: any){
    console.log(e);
  }

  submitForm(){
    if(this.questionForm.valid){
      const quizItem: QuizItem  = this.questionForm.value;
      quizItem.correctAnswerIndex = this.questionForm.value['correctAnswer']
      // console.log(quizItem);
      if(!this.isEdit){
        this.quizService.addQuizItem(quizItem);
      }else{
        console.log(quizItem)
        quizItem.id = this.oldQuizItem.id
        this.quizService.editQuizItem(quizItem);
      }
      this.activeModal.close();
    }
    else{
      console.log("Invalid form")
    }
    
  }
}
