import {Component, OnInit} from '@angular/core';
import { parseString } from 'xml2js';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.parseRssFeed();
    // TODO: Snippet for testing! remove for production
    this.alerts = [
      {
      "title": "High Sea swimming danger",
      "description": "severe Warning of HIGH SEA SWIMMING DANGER in Mediterranean Sea on 26/03 from 10 until 22 LT.\
      The state of sea is Slight to Moderate. The significant wave height from 120 to 180 cm, increasing. The hazardous\
      weather conditions may continue after the warning will expire. if needed, the warning will be extended"
      }
    ]
    this.noAlerts = false;
  }

  parseRssFeed(): void {
    const url: string = 'https://ims.gov.il/sites/default/files/ims_data/rss/alert/rssAlert_general_country_en.xml';
    this.http.get(url, { responseType: 'text' }).subscribe((data) => {
      parseString(data, (err, result) => {
        if (err) {
          console.error('Error parsing alerts RSS feed:', err);
          return;
        }

        const items: any[] = result.rss.channel[0].item;
        if (items && items.length > 0){
          this.noAlerts = false;
          for (const alert of items) {
            let alertObj: {title: string, description: string, date: string} = {title: "", description:"", date: ""};
            alertObj["title"] = alert.title[0];
            alertObj["description"] = this.removeHtmlTags(alert.description[0]);
            alertObj["date"] = alert.pubDate[0];
            this.alerts.push(alertObj);
          }
        }
      });
    });
  }

  removeHtmlTags(str: string): string {
    return str.replace(/<[^>]*>/g, '').replace("update: ", '');
  }

  getBackgroundColorByLevel(): string{
    if (this.noAlerts){
      return 'rgb(255 255 255)'
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
