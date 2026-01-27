import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/services.service';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../Services/session.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leftsidebar',
   imports: [FormsModule, CommonModule],
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.scss']
})
export class LeftsidebarComponent {
  menuOpen = false;

  StageID: string = "";
  showPreDispatch=false;

   constructor(private router:Router,private apiService:ServicesService,private http: HttpClient,private sessionService: SessionService){
  
  }

ngOnInit(): void 
{


    this.StageID=this.sessionService.getItem('STAGEID');


    if(this.StageID=='10')
    {


    this.showPreDispatch=true;


    }

 }

onPrePDIDISPTACH(event:Event)
{

    event.preventDefault();
 
    this.router.navigate(['/PREPDIDISPATCH']);

}

onPrePDIDISPTACH_REVIEW(event:Event)
{

    event.preventDefault();
 
    this.router.navigate(['/REVIEWPREPDI']);

}

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
