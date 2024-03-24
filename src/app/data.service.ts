import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private testMode: boolean = true;

  constructor(private http: HttpClient) { }

  getVariable(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/get-variable');
  }

  getCurrentWeatherForSite(siteId: string): Observable<any> | any{
    if (this.testMode){
      return {"WS": 15,
              "WD": 330,
              "TD": 17.9,
              "Grad": 4
              }
    }
    const requestData = { station: siteId };
    return this.http.post<any>('http://127.0.0.1:8080/weather_summery/', requestData);
  }

  getAllSites(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/get-all-sites');
  }

  /*
  Returns List of all cities that has an active Temperature sensor.
   */
  getActiveCities(): Observable<any> | any {
    if (this.testMode){
      return {
        411: "BEER SHEVA",
        59: "BEER SHEVA BGU"
      }
    }
    return this.http.get<any>('http://127.0.0.1:8080/active-cities/');
  }

  /*
  Returns:
  Temperature, Wind speed, Wind direction, UV level, Humidity
  of relevant city
   */
  getWeatherSummaryByCity(cityId: string): Observable<any> {
    const requestData = {
      city: cityId
    };
    return this.http.get<any>('http://127.0.0.1:8080/get-active-sites');
  }

  /*
  Returns List of all active alerts from IMS rss alerts feed
   */
  getWarnings(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/get-warnings');
  }

  /*
  Returns plotly graph object in json format
   */
  getGraph(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/get-graph');
  }


}
