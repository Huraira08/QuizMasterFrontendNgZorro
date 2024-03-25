import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent {
  constructor(private router: Router){}

  navigate(){
    this.router.navigate(['/quiz'])
  }
}
