import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';

const routes: Routes = [
  {path: '', component: TodolistComponent},
  {path: 'create', component: NewTodoComponent},
  {path: 'edit/:id', component: NewTodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
