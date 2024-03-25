import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { StartQuizComponent } from './pages/start-quiz/start-quiz.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { authGuard } from './guards/auth.guard';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';


const routes: Routes = [
  {path:"", redirectTo: "landing", pathMatch:"full"},
  {path: "landing", component: LandingPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "signup", component: SignupPageComponent},
  {path: "start-quiz", component: StartQuizComponent, canActivate: [authGuard]},
  {path: "quiz", component: QuizPageComponent, canActivate: [authGuard]},
  {path: "admin", component: AdminPageComponent, canActivate: [authGuard]},
  {path: "results", component: ResultsPageComponent, canActivate: [authGuard]},
  {path:"leaderboard", component: LeaderboardComponent, canActivate: [authGuard]},
  {path:"**", component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
