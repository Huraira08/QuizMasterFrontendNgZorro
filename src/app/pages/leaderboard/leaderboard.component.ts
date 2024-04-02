import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/result';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  topResults: Result[] = [];

  constructor(private quizService: QuizService){}

  ngOnInit(): void {
    this.quizService.getTop10Results().subscribe({
      next: results=>{
        this.topResults = results;
        console.log(this.topResults)
      },
      error: error=>{
        console.log(error);
      }
    })
  }
  
}
