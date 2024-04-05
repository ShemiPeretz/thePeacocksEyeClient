import { Component } from '@angular/core';

export enum AirQualityLevel{
  Dangerous = "Dangerous",
  Unhealthy = "Unhealthy",
  Poor = "Poor" ,
  Fair = "Fair" ,
  Excellent = "Excellent"
}
@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html',
  styleUrl: './air-quality.component.scss'
})
export class AirQualityComponent {
  airQualityLevel: AirQualityLevel = AirQualityLevel.Excellent;
  airQualityDescription: string = "";
  pm2:number = 16;
  pm10:number = 42;
  no2:number = 5;
  o3:number = 81;

  constructor() {
    this.airQualityDescription = this.getDescriptionByLevel();
  }

  getBackgroundColorByLevel(): string{
    switch (this.airQualityLevel){
      case AirQualityLevel.Dangerous:
        return '#E74C3C';
      case AirQualityLevel.Unhealthy:
        return '#EB984E';
      case AirQualityLevel.Poor:
        return '#F7DC6F';
      case AirQualityLevel.Fair:
        return '#ABEBC6';
      case AirQualityLevel.Excellent:
        return '#2ECC71';
    }
  }

  getDescriptionByLevel(): string {
    switch (this.airQualityLevel){
      case AirQualityLevel.Dangerous:
        return 'The pollution has reached extreme levels. Immediate effects on health.';
      case AirQualityLevel.Unhealthy:
        return 'The air has reached a very high level of pollution. Effects can be immediately felt by individuals at risk. Everybody feels the effects of a prolonged exposure.';
      case AirQualityLevel.Poor:
        return 'The air has reached a high level of pollution. Higher than the maximum limit for 24 hours established by WHO.';
      case AirQualityLevel.Fair:
        return 'The air is moderately polluted. Greater than the maximum limit established for one year by WHO. A long-term exposure constitutes a health risk.';
      case AirQualityLevel.Excellent:
        return 'The air is pure, ideal for outdoor activities!';
    }
  }

  getActivitiesByLevel(): string {
    switch (this.airQualityLevel){
      case AirQualityLevel.Dangerous:
        return '';
      case AirQualityLevel.Unhealthy:
        return '';
      case AirQualityLevel.Poor:
        return '';
      case AirQualityLevel.Fair:
        return '';
      case AirQualityLevel.Excellent:
        return '';
    }
  }


}
