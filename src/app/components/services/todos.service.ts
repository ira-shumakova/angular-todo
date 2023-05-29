import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITodoWithId, ITodo } from '../models/todos';

@Injectable({
  providedIn: 'root'
})

export class TodosService {
  private todosListArray: BehaviorSubject<ITodoWithId[]> = new BehaviorSubject([{}] as ITodoWithId[]);

  getTodos$(): Observable<ITodoWithId[]> {
    return this.todosListArray.asObservable();
  }

  getTodos() {
    return this.todosListArray.getValue();
  }

  getTodo(id: number) {
    return this.getTodos().find((todo) => todo.id === id);
  }

  setTodos(newValue: ITodoWithId[]) {
    this.todosListArray.next(newValue)
  }

  setTodo(updatedTodo: ITodoWithId) {
    const todos = this.todosListArray.getValue();
    const updatedTodos = todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todo; 
    });

    this.todosListArray.next(updatedTodos); 
  }

  addTodo(todo: ITodoWithId) {
    const currentTodos = this.todosListArray.getValue();
    const updatedTodos = [...currentTodos, todo];
    this.todosListArray.next(updatedTodos);
  }

  deleteTodo(id: number) {
    const todos = this.getTodos().filter((todo) => todo.id !== id)
    this.todosListArray.next(todos)
  }
}