import { Component, EventEmitter, Inject, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { QuizItem } from 'src/app/interfaces/quiz-item';
import { QuizService } from 'src/app/services/quiz.service';

export interface IModalData{
  isEdit: boolean,
  oldQuizItem?: QuizItem
}

@Component({
  selector: 'app-upsert-popup-zorro',
  styleUrls: ['./upsert-popup-zorro.component.css'],
  template:`
      <div class="modal-header">
    <div>
      <h1>{{modalData.isEdit?'Edit':'Add'}} Question</h1>
    </div>
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
        <label for="correctAnswer" class="mr-2">Correct Answer</label>
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
        <button type="submit" class="btn btn-primary">{{modalData.isEdit? 'Edit' : 'Add'}} Question</button>
      </div>
    </form>
  </div>
  `
})
export class UpsertPopupZorroComponent implements OnInit{
  questionForm!: FormGroup
  alphabetIndexArray = ['A', 'B', 'C', 'D']
  numberIndexArray = [0, 1, 2, 3];


  constructor(private formBuilder: FormBuilder, 
    private quizService: QuizService, 
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public modalData: IModalData,
    private notification: NzNotificationService
    ){
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
    if (this.modalData.oldQuizItem && this.modalData.isEdit) {
      this.questionForm.patchValue({
        question: this.modalData.oldQuizItem.question,
        answers: this.modalData.oldQuizItem.answers,
        correctAnswer: this.modalData.oldQuizItem.correctAnswerIndex
      });
    }
  }

  get answers(){
    return this.questionForm.get('answers') as FormArray
  }

  changeCorrectAnswer(e: any){
    console.log(e);
  }

  handleClose(){
    this.modalRef.close();
  }

  async submitForm(){
    if(this.questionForm.valid){
      const quizItem: QuizItem  = this.questionForm.value;
      quizItem.correctAnswerIndex = this.questionForm.value['correctAnswer']
      // console.log(quizItem);
      if(!this.modalData.isEdit){
        try{
          await this.quizService.addQuizItem(quizItem);
          this.notification.create('success', 'Success', 'New Question added');
        }catch(err){
          console.log(err);
          this.notification.create('error', 'Operation failed', `Question not Added`);
        }
      }else{
        quizItem.id = this.modalData.oldQuizItem!.id
        try{
          const response: any = await this.quizService.editQuizItem(quizItem);
          const {rowsAffected} = response;
          if(rowsAffected > 0){
            this.notification.create('success', 'Success', `${rowsAffected} row${rowsAffected === 1?'':'s'} updated`);
          }else{
            this.notification.create('error', 'Operation failed', `Question not updated`);
          }
        }catch(err){
          console.log(err);
          this.notification.create('error', 'Operation failed', `Question not updated`);
        }
      }
    }
    else{
      console.log("Invalid form")
    }
    this.modalRef.close();
  }
}
