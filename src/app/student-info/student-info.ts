import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-info',
  imports: [CommonModule],
  templateUrl: './student-info.html',
  styleUrl: './student-info.css',
})
export class StudentInfo {
  studentId = 'K234111402';
  studentName = 'Nguyễn Ngọc Thanh Ngân';
}
