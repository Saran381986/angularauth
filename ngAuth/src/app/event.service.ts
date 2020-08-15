import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl="http://localhost:3000/api/events";
  private _specialEventsUrl="http://localhost:3000/api/special";

  constructor( private http:HttpClient) { }


  
//returns the array of events
  getEvents(){
    return this.http.get<any>(this._eventsUrl)
  }
  //returns the array of special events
  getSpecialEvents(){
    return this.http.get<any>(this._specialEventsUrl)
  }
}
