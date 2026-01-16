import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-leftsidebar',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './leftsidebar.component.html',
  styleUrl: './leftsidebar.component.css'
})
export class LeftsidebarComponent {
  public isLeftSidebarCollapsed = input.required<boolean>();
  openSidebar: boolean = true;
constructor(private router: Router) { this.router.events.subscribe(event => { if (event instanceof NavigationEnd && this.isMobile()) { this.openSidebar = false; } }); }
 
ngOnInit(): void { if (window.innerWidth > 768) { this.openSidebar = false; } }

  menuSidebar = [
    {
      link_name: "Admin",
      link: null,
      icon: "bi bi-person",
      sub_menu: [
        {
          link_name: "User",
          link: "../usr",
        }
      ]
    }, {
      link_name: "Master",
      link: null,
      icon: "bi bi-person-raised-hand",
      sub_menu: [
        {
          link_name: "Stages",
          link: "/posts/web-design",
        }, {
          link_name: "Family Serial",
          link: "/posts/login-form",
        }, {
          link_name: "Cranes",
          link: "/posts/card-design",
        }, {
          link_name: "Crane Setting",
          link: "/posts/card-design",
        }
      ]
    }, {
      link_name: "Planning",
      link: null,
      icon: "bi bi-files",
      sub_menu: [
        {
          link_name: "Monthly Plan",
          link: "/ui-face",
        }, {
          link_name: "Rolling Plan",
          link: "/box-icons",
        },
        {
          link_name: "Fixed Plan",
          link: "/pigments",
        }
      ]
    }, {
      link_name: "Reports",
      link: "/explore",
      icon: "bi bi-file-earmark-spreadsheet",
      sub_menu: []
    }
  ]

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  isMobile(): boolean 
  { 
    return window.innerWidth <= 768; 
  } // adjust breakpoint as needed 

  closeSidebarOnMobile() 
  { 
    if (this.isMobile()) { this.openSidebar = false; } 
  }
}
