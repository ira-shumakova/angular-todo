import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { IValue } from './components/models/routeValue';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'todo list';
  showAddTodoButton = false;
  isCreateForm = false

  constructor(private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((value: IValue) => {
      const currentRoute = value.url;
      this.showAddTodoButton = currentRoute === '/';
      this.isCreateForm = currentRoute === '/create';
    })
  };
;
  redirect() {
    this.router.navigate(['/create'])
  }
  redirectToMain() {
    this.router.navigate(['/'])
  }
}
