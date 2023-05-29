import { Component } from '@angular/core';
import { TodosAPIService } from '../services/todosAPI.service';
import { ITodo } from '../models/todos';
import { IValue } from '../models/routeValue';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent {
  isCreateForm = false;

  constructor(private todosAPIService: TodosAPIService, private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((value: IValue) => {
      const currentRoute = value.url;
      this.isCreateForm = currentRoute === '/create';
    })
  }
  onSubmit() {
    const todo = {
      title: "new todo",
      isCompleted: false
    }
    this.todosAPIService.create(todo).subscribe()
  }
}
