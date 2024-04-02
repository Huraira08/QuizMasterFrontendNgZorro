import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { QuizItem } from 'src/app/interfaces/quiz-item';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultModalComponent } from 'src/app/components/result-modal/result-modal.component';
import { Result } from 'src/app/interfaces/result';

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
  isModalVisible = false;

  private modalService = inject(NgbModal);

  constructor(private quizService: QuizService, private router: Router){

  }

  ngOnInit(): void {
    this.quizService.getQuizItems().subscribe({
      next:(quizItems)=>{
        this.quizItems = quizItems;
      },
      error:(error)=>{
        console.log(error);
      }
    })
    this.quizItemIndex = 0;
    this.score = 0;
  }

  receiveAnswer(answer:number){
    this.answerIndex = answer;
    // console.log(this.answer)
  }

  handleScore(){
    if(this.answerIndex === this.quizItems[this.quizItemIndex].correctAnswerIndex){
      this.score++;
      console.log(this.score)
    }
  }

  handleNextClick(){
    // console.log(this.quizItems[this.answerIndex].question)
    if(this.answerIndex < 0)return;
    if(this.quizItemIndex < this.quizItems.length){
      this.handleScore();
      this.quizItemIndex++;
      this.answerIndex = -1;
    }
    if(this.quizItemIndex >= this.quizItems.length){
      this.isModalVisible = true;
      // const modalRef = this.modalService.open(ResultModalComponent, {size: "lg", centered: true});
      //     modalRef.componentInstance.score = this.score;
      //     modalRef.result.then(
      //       (result)=>{
      //         this.quizService.addResult(newResult).subscribe({
      //           next:()=>{
      //             this.router.navigate(['/start-quiz'], {replaceUrl:true})
      //           },
      //           error:(error)=>{
      //             console.log(error);
      //             this.router.navigate(['/start-quiz'], {replaceUrl:true})
      //           }
      //         })
      //       },
      //       (reason)=>{
      //         this.quizService.addResult(newResult).subscribe({
      //           next:()=>{
      //             this.router.navigate(['/start-quiz'], {replaceUrl:true})
      //           },
      //           error:(error)=>{
      //             console.log(error);
      //             this.router.navigate(['/start-quiz'], {replaceUrl:true})
      //           }
      //         })
      //       }
      //     )
    }
  }

  handleClose(){
    const newResult: Result = {id: 0,attemptedDate: new Date(Date.now()),score: this.score}
    this.quizService.addResult(newResult).subscribe({
      next:()=>{
        this.router.navigate(['/start-quiz'], {replaceUrl:true})
      },
      error:(error)=>{
        console.log(error);
        this.router.navigate(['/start-quiz'], {replaceUrl:true})
      }
    })
    this.isModalVisible = false;
  }
}
