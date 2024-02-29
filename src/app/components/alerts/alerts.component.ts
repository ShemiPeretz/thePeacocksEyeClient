import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent implements OnInit{
  alerts!: any[];

  constructor() {
  }

  ngOnInit() {
    this.alerts = [
      {
      "title": "ALERT 1",
      "description": "Flood alert"
      },
      {
        "title": "ALERT 2",
        "description": "Earthquake alert"
      },
      {
        "title": "ALERT 3",
        "description": "Severe Heat alert"
      }
    ]
  }
}
