import { Component, OnInit } from '@angular/core';
import { TodosAPIService } from '../services/todosAPI.service';
import { TodosService } from '../services/todos.service';
import { ITodo, ITodoWithId } from '../models/todos';
import { IValue } from '../models/routeValue';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {
  todo: ITodoWithId | undefined
  isCreateForm = false;
  form = new FormGroup({
    title: new FormControl<string>(''),
    isCompleted: new FormControl<boolean>(false)
  })

  constructor(
      private todosAPIService: TodosAPIService, 
      private todosService: TodosService,
      private router: Router,
      private route: ActivatedRoute
      ) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((value: IValue) => {
      const currentRoute = value.url;
      this.isCreateForm = currentRoute === '/create';
    })
  }
  ngOnInit(): void { 
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.todosAPIService.getOne(id).subscribe((todo: ITodoWithId) => {
          this.todo = todo;
          this.form.patchValue({
            title: todo.title,
            isCompleted: todo.isCompleted
          });
        });
      }
      return
    });
  }

  submit() {
    const formValue = this.form.value;

    if(this.todo) {
      this.todo.title = formValue.title ?? '';
      this.todo.isCompleted = formValue.isCompleted  ?? false;
      this.todosAPIService.update(this.todo).subscribe((data) => {
        this.todosService.setTodo(data);
      })
    } else {
      const newTodo: ITodo = {

        title: this.form.value.title ?? '',
        isCompleted: this.form.value.isCompleted ?? false
      };
      this.todosAPIService.create(newTodo).subscribe((data) => {
        this.todosService.addTodo(data);
      });
    }
    this.router.navigate(['/'])
  }
  
}
