import { Component, OnInit } from '@angular/core';
import { QuizItem } from 'src/app/interfaces/quiz-item';
import { QuizService } from 'src/app/services/quiz.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpsertPopupComponent } from 'src/app/components/upsert-popup/upsert-popup.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  quizItems: QuizItem[] = [];
  currentPageQuestions: readonly QuizItem[] = [];

  constructor(private quizService: QuizService, private modal: NgbModal){
  }

  ngOnInit(): void {
    this.quizService.getQuizItems().subscribe({
      next:quizItems=>{
        this.quizItems = quizItems;
        // this.quizItems.push(...quizItems);
        // this.quizItems.push(...quizItems);
        // for(let item of this.quizItems){
        //   console.log(item.correctAnswerIndex)
        // }
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  addItem(){
    const modalRef = this.modal.open(UpsertPopupComponent, {size: "lg"});
  }

  EditItem(item: QuizItem){
    const modalRef = this.modal.open(UpsertPopupComponent, {size: "lg"});
    modalRef.componentInstance.oldQuizItem = item;
    modalRef.componentInstance.isEdit = true;
  }

  deleteItem(id: number){
    this.quizService.deleteItem(id);
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly QuizItem[]){
    this.currentPageQuestions = listOfCurrentPageData;
  }
}
