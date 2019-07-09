// Angular 
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{firstname}} {{lastname}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent {
  @Input() firstname: string;
  @Input() lastname: string;
}