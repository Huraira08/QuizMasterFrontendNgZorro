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
  isModalVisible: boolean = false;
  isEdit: boolean = false;
  oldQuizItem?: QuizItem;

  constructor(private quizService: QuizService){
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
    this.isEdit = false;
    this.oldQuizItem = undefined
    this.isModalVisible = true;
    // const modalRef = this.modal.open(UpsertPopupComponent, {size: "lg"});
  }

  EditItem(item: QuizItem){
    this.isEdit = true;
    this.oldQuizItem = item;
    console.log(this.oldQuizItem)
    this.isModalVisible = true;
  }

  async deleteItem(id: number){
    try{
      await this.quizService.deleteItem(id);
    } catch(err){
      console.log(err);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly QuizItem[]){
    this.currentPageQuestions = listOfCurrentPageData;
  }
}
