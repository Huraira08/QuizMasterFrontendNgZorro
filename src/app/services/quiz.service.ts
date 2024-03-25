import { Injectable } from '@angular/core';
import { QuizItem } from '../interfaces/quiz-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result } from '../interfaces/result';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizItems!: Array<QuizItem>
  quizItemsSubject = new BehaviorSubject<QuizItem[]>([]);
  results!: Result[]
  resultsSubject = new BehaviorSubject<Result[]>([]);
  idIndex: number = 0;
  private apiUrl: string = 'https://localhost:7129/api/QuizItem';
  private TOKEN_KEY = 'jwt_token';

  constructor(private http: HttpClient) { 
    this.fetchAllQuizItems();

    this.fetchResults();
  }

  getHeaderWithToken(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`
    });
    return {headers};
  }

  fetchAllQuizItems(){
    this.http.get<QuizItem[]>(this.apiUrl, this.getHeaderWithToken()).subscribe({
      next:quizItems=>{
        this.quizItems = quizItems;
        this.quizItemsSubject.next(this.quizItems);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  fetchResults(){
    const user = JSON.parse(localStorage.getItem('user')!) as User;
    this.http.get<Result[]>('https://localhost:7129/api/Result/'+user.id, this.getHeaderWithToken()).subscribe({
      next: results=>{
        this.results = results;
        this.resultsSubject.next(this.results);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  getQuizItems():Observable<QuizItem[]>{
    return this.quizItemsSubject.asObservable();
  }

  addQuizItem(quizItem: QuizItem){
    console.log(quizItem.id)
    this.http.post(this.apiUrl, quizItem, this.getHeaderWithToken()).subscribe({
      next:()=>{
        this.fetchAllQuizItems();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  editQuizItem(quizItem: QuizItem){
    this.http.put(this.apiUrl, quizItem, this.getHeaderWithToken()).subscribe({
      next:()=>{
        this.fetchAllQuizItems();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  deleteItem(id: number){
    this.http.delete(this.apiUrl + `/${id}`, this.getHeaderWithToken()).subscribe({
      next:()=>{
        this.fetchAllQuizItems();
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  getResults(): Observable<Result[]>{
    return this.resultsSubject.asObservable();
  }

  addResult(result: Result){
    const user = JSON.parse(localStorage.getItem('user')!) as User;
    console.log(user)
    return this.http.post(`https://localhost:7129/api/Result/${user.id}`, result, this.getHeaderWithToken()).pipe();
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