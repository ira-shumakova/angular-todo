import { Component, OnInit } from '@angular/core';
import { ITodoWithId } from '../models/todos';
import { TodosService } from '../services/todos.service';
import { TodosAPIService } from '../services/todosAPI.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todos$: Observable<ITodoWithId[]>;
  todos: ITodoWithId[];

  constructor(
    private todosService: TodosService, 
    private todosAPIService: TodosAPIService, 
    private router: Router
  ) {
    this.todos$ = this.todosService.getTodos$();
    this.todos = this.todosService.getTodos();
  }

  ngOnInit(): void {
    this.todosAPIService.getAll().subscribe((data) => {
      this.todosService.setTodos(data);
      this.todos = this.todosService.getTodos();
    })
  }

  onCheck(todo: ITodoWithId) {
    todo.isCompleted = !todo.isCompleted
    this.todosAPIService.update(todo).subscribe((data) => {
      this.todosService.setTodo(data);
    })
  }

  onEdit(id: number) {
    this.router.navigate([`edit/${id}`])
  }

  onDelete(id: number) {
    this.todosAPIService.delete(id).subscribe((data) => {
      this.todosService.deleteTodo(data.id)
    })
  }
}
