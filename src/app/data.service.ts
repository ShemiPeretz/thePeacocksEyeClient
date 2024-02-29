import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getVariable(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/get-variable');
  }

  getCurrentWeatherForSite(site: string): Observable<any> {
    const requestData = { site: site };
    return this.http.post<any>('http://127.0.0.1:8000/get-current-weather', requestData);
  }

  getAllSites(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/get-all-sites');
  }

  /*
  Returns List of all cities that has an active Temperature sensor.
   */
  getActiveSites(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/get-acrive-sites');
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
    return this.http.get<any>('http://127.0.0.1:8000/get-active-sites');
  }

  /*
  Returns List of all active alerts from IMS rss alerts feed
   */
  getWarnings(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/get-warnings');
  }

  /*
  Returns plotly graph object in json format
   */
  getGraph(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/get-graph');
  }


}
