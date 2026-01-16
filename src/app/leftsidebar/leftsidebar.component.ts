import { Component } from '@angular/core';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.scss']
})
export class LeftsidebarComponent {
  menuOpen = false;

  toggleMenu() {
    debugger;
    this.menuOpen = !this.menuOpen;
    // this will add/remove the 'close' class
    const nav = document.querySelector('.nav--open') as HTMLElement;
    if (nav) {
      nav.classList.toggle('close', !this.menuOpen);
    }
  }
}
