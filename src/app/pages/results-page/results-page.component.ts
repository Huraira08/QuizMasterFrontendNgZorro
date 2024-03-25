import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/result';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {
  results: Result[] = []
  constructor(private quizService: QuizService){}
  ngOnInit(): void {
    this.quizService.getResults().subscribe({
      next: results=>{
        this.results = results;
      },
      error: error=>{
        console.log(error);
      }
    })
  }
}
