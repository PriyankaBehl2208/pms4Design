import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component';


@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LeftsidebarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

   isLeftSidebarCollapsed = signal<boolean>(false);
    screenWidth = signal<number>(window.innerWidth);
    
  constructor(){   
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: any): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
  
}
