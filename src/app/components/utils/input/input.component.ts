import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label!: string;
  @Output() inputChanged = new EventEmitter<string>();

  inputValue = '';

  onInputChange() {
    this.inputChanged.emit(this.inputValue);
  }
}
