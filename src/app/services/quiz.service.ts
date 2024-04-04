import { Injectable } from '@angular/core';
import { QuizItem } from '../interfaces/quiz-item';
import { firstValueFrom, last, lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result } from '../interfaces/result';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // results!: Result[]
  // resultsSubject = new BehaviorSubject<Result[]>([]);
  idIndex: number = 0;
  private apiUrl: string = 'https://localhost:7129/api/QuizItem';
  private TOKEN_KEY = 'jwt_token';

  constructor(private http: HttpClient) { 
  }

  getHeaderWithToken(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`
    });
    return {headers};
  }

  async getQuizItems():Promise<QuizItem[]>{
    const observable = this.http.get<QuizItem[]>(this.apiUrl, this.getHeaderWithToken())
    return await firstValueFrom(observable);
  }

  async addQuizItem(quizItem: QuizItem){
    const observable =  this.http.post(this.apiUrl, quizItem, this.getHeaderWithToken())
    return await firstValueFrom(observable)
  }

  async editQuizItem(quizItem: QuizItem){
    const observable = this.http.put(this.apiUrl, quizItem, this.getHeaderWithToken())
    return await lastValueFrom(observable)
  }

  async deleteItem(id: number){
    const observable = this.http.delete(this.apiUrl + `/${id}`, this.getHeaderWithToken())
    return await lastValueFrom(observable)
  }

  async getResults(): Promise<Result[]>{
    const user = JSON.parse(localStorage.getItem('user')!) as User;
    const observable = this.http.get<Result[]>('https://localhost:7129/api/Result/' + user.id, this.getHeaderWithToken())
    return await firstValueFrom(observable);
  }

  async addResult(result: any){
    const user = JSON.parse(localStorage.getItem('user')!) as User;
    result["userId"] = user.id;
    const observable = this.http.post(`https://localhost:7129/api/Result`, result, this.getHeaderWithToken())
    return await firstValueFrom(observable);
  }

  async getTop10Results(){
    const observable = this.http.get<Result[]>('https://localhost:7129/api/Result/top10', this.getHeaderWithToken())
    return await firstValueFrom(observable);
    // .pipe();
  }
}


// // https://localhost:7129/WeatherForecast
    // this.http.get('https://localhost:7129/WeatherForecast').subscribe(data=>{
    //   console.log(data)
    // })
    // this.quizItems = [
    //   {
    //     id:1,
    //     question: "An interface design application that runs in the browser with team-based collaborative design projects",
    //     answers: ['Figma', 'Adobe XD', 'Invision', 'Sketch'],
    //     correctAnswerIndex: 0
    //   },
    //   {
    //     id: 2,
    //     question: "Which of the following is not a primary color of light?",
    //     answers: ["Red", "Yellow", "Blue", "Green"],
    //     correctAnswerIndex: 1
    //   },
    //   {
    //     id: 3,
    //     question: "What is the chemical symbol for water?",
    //     answers: ["O2", "CO2", "NaCl", "H2O"],
    //     correctAnswerIndex: 3
    //   },
    //   {
    //     id: 4,
    //     question: "What is the value of π (pi) to two decimal places?",
    //     answers: ["3.18", "3.16", "3.14", "3.12"],
    //     correctAnswerIndex: 2
    //   },
    // ]
    // this.idIndex = this.quizItems.length;