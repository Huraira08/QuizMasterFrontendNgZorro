import { Component, OnInit } from '@angular/core';
import { QuizItem } from 'src/app/interfaces/quiz-item';
import { QuizService } from 'src/app/services/quiz.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UpsertPopupZorroComponent } from 'src/app/components/upsert-popup-zorro/upsert-popup-zorro.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  quizItems: QuizItem[] = [];
  currentPageQuestions: readonly QuizItem[] = [];

  constructor(private quizService: QuizService, private modalService: NzModalService){
  }

  ngOnInit(): void {
    this.fetchQuizItems()
  }
  
  fetchQuizItems(){
    this.quizService.getQuizItems()
    .then(quizItem=>{
      this.quizItems = quizItem;
    })
    .catch(err=>{
       console.log(err);
     })
  }

  async deleteItem(id: number){
    try{
      const response = await this.quizService.deleteItem(id);
      console.log(response);
      this.fetchQuizItems();
    } catch(err){
      console.log(err);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly QuizItem[]){
    this.currentPageQuestions = listOfCurrentPageData;
  }

  createModal(isEdit: boolean, quizItem?: QuizItem){
    this.modalService.create({
      nzContent: UpsertPopupZorroComponent,
      nzData:{
        isEdit: isEdit,
        oldQuizItem: quizItem,
      },
      nzFooter: null,
      nzWidth: "716px",
      nzStyle:{'top': '10px'}
      
    })
    this.modalService.afterAllClose.subscribe(()=>{
      this.fetchQuizItems()
    })
  }
}
