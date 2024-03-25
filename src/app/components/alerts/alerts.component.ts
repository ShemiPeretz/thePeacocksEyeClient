import {Component, OnInit} from '@angular/core';
import { parseString } from 'xml2js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent implements OnInit{
  alerts: any[] = [];
  noAlerts: boolean = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.parseRssFeed();
    // this.alerts = [
    //   {
    //   "title": "ALERT 1",
    //   "description": "Flood alert"
    //   },
    //   {
    //     "title": "ALERT 2",
    //     "description": "Earthquake alersdfsdjklnfgsdkjfghbsdjklghskej;rghfkasejdhgkasdjhgkasdjgklasedhgdt"
    //   },
    //   {
    //     "title": "ALERT 3",
    //     "description": "Severe Heat alert sdfkgljsdflkgdfkljgsdfjkl;gsdjkl;fgdklsfjglsdkfghsdfhjklgdfhjklgsdjklhfghjkdghjksdf"
    //   }
    // ]
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
        if (items.length > 0){
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

}
