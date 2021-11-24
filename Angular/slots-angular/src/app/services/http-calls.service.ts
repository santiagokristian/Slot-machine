import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  private backendUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) {

   }

  createJsonHeader(headers: HttpHeaders){
    headers.append('Content-Type', 'application/json');
    return {headers:headers,withCredentials:true}
  }

  getBase(url){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.backendUrl+url,this.createJsonHeader(headers))
  }

  postBase(url,data){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.backendUrl+url,data,this.createJsonHeader(headers))
  }

  //api sessions
  getNewSession(){
    return this.getBase('/api/session')
  }
  postCheckoutCredits(data){
    return this.postBase('/api/session/checkout',data)
  }

  //api rollmachine
  getSlotRolls(){
    return this.getBase('/api/slotRolls')
  }
  
}
