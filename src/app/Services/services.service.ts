import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FINAL_SAVE, GET_ENGINEVALUE, GETMAIN_LIST, REMARKS_VAL, UserListVerify } from '../Model/Model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

 
  private apiUrl='https://localhost:7211/api';
  //private apiUrl='https://emfg.escortskubota.com/PREPDI4API/api';

  constructor(private http:HttpClient) 
  { 
  }

    private apiCall(
      method: string,
      endpoint: string,
      body: any = null,
      params: HttpParams = new HttpParams(),
      bearerToken?: string
    ): Observable<any> {
      const url = `${this.apiUrl}/${endpoint}`;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      if (bearerToken) {
        debugger;
        headers = headers.set('Authorization', `Bearer ${bearerToken}`);
      }

      const options: any = {
        headers,
        ...(body ? { body } : {}),
        ...(params.keys().length ? { params } : {})
      };
      return this.http.request(method, url, options);
    }



      ValidateUser(user:UserListVerify):Observable<any>
      {
        debugger;
       return this.apiCall('POST','MesChecklist/VALIDATE_USER',user);
      }

    FINAL_SAVE_ENGINE(user:FINAL_SAVE):Observable<any>
     {
       debugger;
       return this.apiCall('POST','MesChecklist/FINAL_SAVE',user,undefined,sessionStorage.getItem('authToken') as string);
     } 

     
      FINAL_SAVE_REVIEW(user:FINAL_SAVE):Observable<any>
     {
       debugger;
       return this.apiCall('POST','MesChecklist/FINAL_SAVE_REVIEW',user,undefined,sessionStorage.getItem('authToken') as string);
     } 

     GETMAIN_LIST_REVIEW(user:GETMAIN_LIST):Observable<any>
     {
       debugger;
       return this.apiCall('POST','MesChecklist/GETMAIN_LIST_REVIEW',user,undefined,sessionStorage.getItem('authToken') as string);
     }

    GETMAIN_LIST(user:GETMAIN_LIST):Observable<any>
     {
       debugger;
       return this.apiCall('POST','MesChecklist/GETMAIN_LIST',user,undefined,sessionStorage.getItem('authToken') as string);
     }

      GET_VALUE_ENGINE(user:GET_ENGINEVALUE):Observable<any>
      {
        debugger;
       return this.apiCall('POST','MesChecklist/GET_ENGINEVALUE',user,undefined,sessionStorage.getItem('authToken') as string);
      }

        UPDATE_REMARKS(user:REMARKS_VAL):Observable<any>
     {
       debugger;
       return this.apiCall('POST','MesChecklist/UPDATE_REMARKS',user,undefined,sessionStorage.getItem('authToken') as string);
     } 

       UPDATE_SATUSOK(user:REMARKS_VAL):Observable<any>
     {
       debugger;
       return this.apiCall('POST','MesChecklist/UPDATE_STATUSOK',user);
     }  

      STATUSDONE_OK(user:REMARKS_VAL):Observable<any>
     {
       debugger;
       return this.apiCall('POST','MesChecklist/STATUSDONE_OK',user);
     }  
     
   
    }
