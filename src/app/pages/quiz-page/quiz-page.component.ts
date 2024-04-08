import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { QuizItem } from 'src/app/interfaces/quiz-item';
import { QuizService } from 'src/app/services/quiz.service';
import { Result } from 'src/app/interfaces/result';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResultZorroModalComponent } from 'src/app/components/result-zorro-modal/result-zorro-modal.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  answerIndex:number = -1;
  quizItems: Array<QuizItem> = []
  quizItemIndex!:number;
  score!: number;

  timer: number = 240;


  constructor(private quizService: QuizService,
     private router: Router,
     private modalService: NzModalService
     ){

  }

  ngOnInit(): void {
    this.quizService.getQuizItems()
    .then(quizItems=>{
       this.quizItems = quizItems.sort(()=> Math.random() - 0.5);
    }).catch(error=>{
      console.log(error);
    })
    
    this.quizItemIndex = 0;
    this.score = 0;

    let intervalObs = interval(1000)
    let subscription = intervalObs.subscribe({
      next:((value)=>{
        this.timer -= 1;
        if(this.timer === 0) {
          subscription.unsubscribe()
          // this.submitResult()
        }
      })
    })
  }

  receiveAnswer(answer:number){
    this.answerIndex = answer;
  }

  handleScore(){
    if(this.answerIndex === this.quizItems[this.quizItemIndex].correctAnswerIndex){
      this.score++;
      console.log(this.score)
    }
  }

  submitResult(){
    this.modalService.create({
      nzContent: ResultZorroModalComponent,
      nzData:{
        score: this.score
      },
      nzFooter: null,
      nzWidth: "716px",
      nzClosable: false
    })

    this.modalService.afterAllClose.subscribe(async ()=>{
      const newResult = {id: '',name:'', attemptedDate: new Date(Date.now()), score: this.score, }
      this.quizService.addResult(newResult)
      .then(response=>{
        console.log(response);
         this.router.navigate(['/start-quiz'], {replaceUrl:true})
      })
      .catch(error=>{
         console.log(error);
         this.router.navigate(['/start-quiz'], {replaceUrl:true})
      })
    })
  }

  handleNextClick(){
    if(this.answerIndex < 0)return;
    if(this.quizItemIndex < this.quizItems.length){
      this.handleScore();
      this.quizItemIndex++;
      this.answerIndex = -1;
    }
    if(this.quizItemIndex >= this.quizItems.length){
      this.submitResult();
    }
  }
  
  floor(value: number){
    return Math.floor(value);
  }
}
