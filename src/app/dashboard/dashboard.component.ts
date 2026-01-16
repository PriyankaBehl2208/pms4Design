import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, LeftsidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

   isLeftSidebarCollapsed = signal<boolean>(false);
    screenWidth = signal<number>(window.innerWidth);
    
  /*sidenavWidth  = "0";
  closeWidth="0";

  
  openNav(){
    this.sidenavWidth = "250px";
  }

  closeNav(){
    this.sidenavWidth = "0px";
  }*/

    constructor(private rout: Router){}
    redirect(e: Event){
      this.rout.navigateByUrl('//usr');
      e.preventDefault();
    }

   

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 790) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: any): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
