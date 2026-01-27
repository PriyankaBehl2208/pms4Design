import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ServicesService } from '../Services/services.service';
import { SessionService } from '../Services/session.service';
import Notiflix from 'notiflix';
import { UserListVerify } from '../Model/Model';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  secretKey: string= '1234567890123456'; // keep this safe, ideally not hardcoded
  uname: string = "";
  pwd: string = "";
  responseData: any[]=[];
   UserListVerify!:UserListVerify;
 constructor(private router:Router,private apiService:ServicesService,private http: HttpClient,private sessionService: SessionService){
  
  }

  Login(event:Event)
  {

    
  event.preventDefault();

  debugger;
  this.UserListVerify={};
 this.UserListVerify.UserName=this.uname;


 this.sessionService.setItem('LOGINAME',this.uname);

const secretKey = 'ESCORTS1234567890987654321@KUBOTA';
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
const key = CryptoJS.enc.Utf8.parse(secretKey.substring(0, 16)); // 16-byte key


function encrypt(text: string): string {
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(text),
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}


debugger;


 const Encryptedval = encrypt(this.pwd);

 
 this.UserListVerify.Passward=Encryptedval;

  
    debugger;
     
    this.apiService.ValidateUser(this.UserListVerify).subscribe({
         
             next:(response)=>{
             if(response.statusCode==200)
             {
              debugger;
                 if(response.message=="")
                 {
                   Notiflix.Notify.failure('Wrong ID And Passward!');
                 // return;
                 }
               else
                 {
                   debugger;
                   this.responseData=response.message;
                     debugger;
                   this.sessionService.setItem('authToken', response.token);

                    this.sessionService.setItem('STAGEID', response.stageID);

                    this.router.navigate(['/dash']);
                 }
            
             }
             else
             {
               Notiflix.Notify.failure(response.message);
               return;
             }
           }
          })
  }
}
