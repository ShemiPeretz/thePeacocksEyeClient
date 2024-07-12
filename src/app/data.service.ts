import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {GraphMeta} from "./data/graph-meta";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCurrentWeatherForSite(siteId: number): Observable<any> {
    const requestData = { station: siteId };
    return this.http.post<any>('http://127.0.0.1:8080/weather_summery/', requestData);
  }

  getAllSites(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/get-all-sites');
  }

  /*
  Returns List of all cities that has an active Temperature sensor.
   */
  getActiveCities(): Observable<any>{
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

  getGraphStations(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/graph_stations');
  }

  /*
  Returns plotly graph object in json format
   */
  postGraph(graphMeta: GraphMeta): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://127.0.0.1:8080/graphs/', graphMeta, { headers });
  }

  getAlerts(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/get-alerts/');
  }

  readJsonFile(filePath: string): Observable<any> {
    return this.http.get<any>(filePath);
  }

}
