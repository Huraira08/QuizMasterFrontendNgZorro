import { Component, OnInit } from '@angular/core';
import { QuizItem } from 'src/app/interfaces/quiz-item';
import { QuizService } from 'src/app/services/quiz.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UpsertPopupZorroComponent } from 'src/app/components/upsert-popup-zorro/upsert-popup-zorro.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  quizItems: QuizItem[] = [];
  currentPageQuestions: readonly QuizItem[] = [];

  constructor(private quizService: QuizService,
     private modalService: NzModalService,
     private notification: NzNotificationService
     ){
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
      const response: any = await this.quizService.deleteItem(id);
      console.log(response.rowsAffected);
      const {rowsAffected} = response;
      if(rowsAffected > 0){
        this.notification.create('success', 'Success', `${rowsAffected} Row${rowsAffected === 1? '':'s'} Affected`)
      }
      else{
        this.notification.create('error', 'Failed', `Could not delete`)
      }
      this.fetchQuizItems();
    } catch(err){
      console.log(err);
      this.notification.create('error', 'Failed', `Could not delete`)
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
