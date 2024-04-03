import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizItem } from 'src/app/interfaces/quiz-item';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-upsert-popup-zorro',
  styleUrls: ['./upsert-popup-zorro.component.css'],
  template:`
  <nz-modal
      [(nzVisible)]="isVisible"
      [nzContent]="modalContent"
      [nzFooter]="null"
      [nzWidth]="716"
      [nzClosable]="true"
      (nzOnCancel)="handleClose()"
      [nzStyle]="{'top': '10px'}"
    >
      <ng-template #modalContent>
      <div class="modal-header">
    <div>
      <h1>{{isEdit?'Edit':'Add'}} Question</h1>
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
        <button type="submit" class="btn btn-primary">{{isEdit? 'Edit' : 'Add'}} Question</button>
      </div>
    </form>
  </div>
      </ng-template>
    </nz-modal>
  `
})
export class UpsertPopupZorroComponent implements OnInit, OnChanges{
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  questionForm!: FormGroup
  alphabetIndexArray = ['A', 'B', 'C', 'D']
  numberIndexArray = [0, 1, 2, 3];
  // quizItem!: QuizItem;

  // for edit
  @Input() isEdit: boolean = false;
  @Output() isEditChange = new EventEmitter<boolean>();
  @Input() oldQuizItem?: QuizItem;

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
    console.log("Check")
    console.log(this.oldQuizItem)
    if (this.oldQuizItem && this.isEdit) {
      this.questionForm.patchValue({
        question: this.oldQuizItem.question,
        answers: this.oldQuizItem.answers,
        correctAnswer: this.oldQuizItem.correctAnswerIndex
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['oldQuizItem'] && !changes['oldQuizItem'].firstChange){
      if(this.isEdit){
        this.questionForm.patchValue({
          question: this.oldQuizItem!.question,
          answers: this.oldQuizItem!.answers,
          correctAnswer: this.oldQuizItem!.correctAnswerIndex
        });
      }
    }
    if(!this.isEdit){
      this.questionForm.reset();
    }
  }

  get answers(){
    return this.questionForm.get('answers') as FormArray
  }

  changeCorrectAnswer(e: any){
    console.log(e);
  }

  handleClose(){
    this.isEdit = false;
    this.oldQuizItem = {} as QuizItem;
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

  async submitForm(){
    if(this.questionForm.valid){
      const quizItem: QuizItem  = this.questionForm.value;
      quizItem.correctAnswerIndex = this.questionForm.value['correctAnswer']
      // console.log(quizItem);
      if(!this.isEdit){
        try{
          await this.quizService.addQuizItem(quizItem);
        }catch(err){
          console.log(err);
        }
      }else{
        console.log(quizItem)
        quizItem.id = this.oldQuizItem!.id
        try{
          await this.quizService.editQuizItem(quizItem);
        }catch(err){
          console.log(err);
        }
      }
    }
    else{
      console.log("Invalid form")
    }
    this.isVisible = false;
    this.isVisibleChange.emit(false);
    this.isEdit = false;
    this.isEditChange.emit(false);
    this.oldQuizItem = undefined;
  }
}
