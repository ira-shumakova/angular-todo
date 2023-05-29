import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() class: string = '';
  @Input() text: string = '';
  @Output() emitTodoEvent = new EventEmitter<string>(); 
  onButtonClick() {
    this.emitTodoEvent.emit();
  };
}
