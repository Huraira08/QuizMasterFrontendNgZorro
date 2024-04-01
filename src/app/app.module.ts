import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TitleComponent } from './components/title/title.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { StartQuizComponent } from './pages/start-quiz/start-quiz.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { ResultModalComponent } from './components/result-modal/result-modal.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UpsertPopupComponent } from './components/upsert-popup/upsert-popup.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TitleComponent,
    LoginPageComponent,
    SignupPageComponent,
    StartQuizComponent,
    QuizPageComponent,
    QuizQuestionComponent,
    ResultModalComponent,
    AdminPageComponent,
    UpsertPopupComponent,
    ResultsPageComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['http://localhost:4200/', 'https://localhost:7129/'], // Specify your domain(s)
        // disallowedRoutes: [] // Routes that don't require token (optional)
      }
    }),
    BrowserAnimationsModule,

    NzGridModule,
    NzDividerModule,
    NzInputModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
