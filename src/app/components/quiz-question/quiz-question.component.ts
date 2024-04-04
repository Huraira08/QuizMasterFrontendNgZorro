import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { QuizItem } from 'src/app/interfaces/quiz-item';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnChanges {
  @Input() quizItem!: QuizItem;
  @Output() answer = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['quizItem'] && !changes['quizItem'].firstChange){
      this.selectedAnswer = -1;
    }
  }

  // To use alphbetical indexing on answer buttons
  charIndex = ['A', 'B', 'C', 'D']
  selectedAnswer: number = -1;

  selectAnswer(index: number){
    this.selectedAnswer = index;
    this.answer.emit(this.selectedAnswer);
  } 
}
