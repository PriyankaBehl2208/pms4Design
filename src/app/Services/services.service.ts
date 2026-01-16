import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListVerify } from '../Model/Model';

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
   
    }
