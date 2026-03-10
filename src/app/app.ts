import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentInfo } from './student-info/student-info';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StudentInfo, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Panda Store';
}
