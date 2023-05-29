import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { ITodo, ITodoWithId } from "../models/todos";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TodosAPIService {  
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ITodoWithId[]> {
    return this.http.get<ITodoWithId[]>('https://646c7f787b42c06c3b2b5e50.mockapi.io/todos')
  }

  getOne(id: number): Observable<ITodoWithId> {
    return this.http.get<ITodoWithId>(`https://646c7f787b42c06c3b2b5e50.mockapi.io/todos/${id}`)
  }

  create(todo: ITodo): Observable<ITodoWithId> {
    return this.http.post<ITodoWithId>('https://646c7f787b42c06c3b2b5e50.mockapi.io/todos', todo)
  }

  update(todo: ITodoWithId): Observable<ITodoWithId> {
    return this.http.put<ITodoWithId>(`https://646c7f787b42c06c3b2b5e50.mockapi.io/todos/${todo.id}`, todo)
  }

  delete(id: number): Observable<ITodoWithId> {
    return this.http.delete<ITodoWithId>(`https://646c7f787b42c06c3b2b5e50.mockapi.io/todos/${id}`)
  }
}