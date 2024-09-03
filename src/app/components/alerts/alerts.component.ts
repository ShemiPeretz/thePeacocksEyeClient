import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';


export enum AlertLevel{
  High,
  Medium,
  Low
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent implements OnInit{
  alerts: any[] = [];
  noAlerts: boolean = true;
  alertLevel: AlertLevel = AlertLevel.Low;
  private cacheKey = 'alertsCache';
  private cacheDuration = 60 * 60 * 1000; // 60 minutes in milliseconds

  constructor(private dataService: DataService) {
  }

  /**
   * OnInit lifecycle getting alerts and setting alert level
   */
  ngOnInit() {
    const cachedData = this.getCachedData();
    if (cachedData) {
      this.processAlerts(cachedData);
    } else {
      this.getAlertsFromRSSFeed();
    }
    this.setAlertLevel();
    // TODO: Snippet for testing! remove for production
    // this.alerts = [
    //   {
    //   "title": "High Sea swimming danger",
    //   "description": "severe Warning of HIGH SEA SWIMMING DANGER in Mediterranean Sea on 26/03 from 10 until 22 LT.\
    //   The state of sea is Slight to Moderate. The significant wave height from 120 to 180 cm, increasing. The hazardous\
    //   weather conditions may continue after the warning will expire. if needed, the warning will be extended"
    //   }
    // ]
    // this.noAlerts = false;
  }

  /**
   * A private method that retrieves cached alert data from local storage. It checks if the cached data is still valid based on the cache duration.
   * @private
   */
  private getCachedData(): any {
    const cachedString = localStorage.getItem(this.cacheKey);
    if (!cachedString) return null;

    const { timestamp, data } = JSON.parse(cachedString);
    if (new Date().getTime() - timestamp > this.cacheDuration) {
      localStorage.removeItem(this.cacheKey);
      return null;
    }

    return data;
  }

  /**
   * A private method that caches alert data in local storage with a timestamp.
   * @param data
   * @private
   */
  private cacheData(data: any): void {
    const cacheData = {
      timestamp: new Date().getTime(),
      data: data
    };
    localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
  }

  /**
   * A private method that fetches alert data from an RSS feed using the DataService. It processes the received data and caches it.
   * @private
   */
  private getAlertsFromRSSFeed() {
    this.dataService.getAlerts().subscribe(data => {
      this.processAlerts(data)
      this.cacheData(data);
    }, error => {
      console.error('Error fetching alerts', error);
    });
  }

  /**
   * Processes the received alert data. If there are no alerts, it sets `noAlerts` to true. Otherwise, it populates the `alerts` array and sets `noAlerts` to false.
   * @param data
   */
  processAlerts(data: any){
    if (data === "no alerts") {
        this.noAlerts = true;
    } else {
      this.alerts = data.alerts;
      this.noAlerts = false;
    }
  }

  /**
   * Determines the current alert level based on the presence and number of alerts. It sets the `alertLevel` to Low, Medium, or High accordingly.
   */
  setAlertLevel() {
    if (this.noAlerts) {
      this.alertLevel = AlertLevel.Low;
    } else {
      if (this.alerts.length > 3) {
        this.alertLevel = AlertLevel.High;
      } else {
        this.alertLevel = AlertLevel.Medium;
      }
    }
  }

  /**
   * Returns a background color string based on the current alert level. The color changes depending on whether there are no alerts or if the alert level is Low, Medium, or High.
   */
  getBackgroundColorByLevel(): string{
    if (this.noAlerts){
      return 'rgba(103, 203, 145,0.65)'
    }
    switch (this.alertLevel){
      case AlertLevel.High:
        return 'rgb(236 112 99 / 65%)'
      case AlertLevel.Medium:
        return '#EB984E'
      case AlertLevel.Low:
      default:
        return 'rgba(255,227,0,0.65)'
    }
  }

}
