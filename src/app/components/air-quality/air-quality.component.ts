import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {channel} from "node:diagnostics_channel";

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
export class AirQualityComponent implements OnInit{
  airQualityLevel: AirQualityLevel = AirQualityLevel.Unhealthy;
  airQualityDescription: string = "";
  pm2:number = 16;
  pm10:number = 42;
  no2:number = 5;
  o3:number = 81;

  private airQualityDataCacheKey: string = 'airQualityCache';
  private cacheDuration = 30 * 60 * 1000; // 30 minutes in milliseconds



  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    // Fetching air quality data from server
    this.getAirQualityChannelsData();
    // Setting air quality description by air quality level
    this.airQualityDescription = this.getDescriptionByLevel();
  }

  getAirQualityChannelsData(): void {
    const cachedData = this.getCachedAirQualityData();
    if (cachedData) {
      this.setAirQualityChannelsData(cachedData);
    } else {
      this.dataService.getAirQuality().subscribe(data => {
          this.setAirQualityChannelsData(data);
          this.cacheAirQualityData(data);
        }
      );
    }
  }

  setAirQualityChannelsData(data: any) : void {
    const channels = data.channels;
    this.pm2 = channels['PM2.5'];
    this.pm10 = channels['PM10'];
    this.no2 = channels['NO2'];
    this.o3 = channels['O3'];
  }

  private cacheAirQualityData(data: any): void {
    this.cacheData(data, this.airQualityDataCacheKey);
  }


  private cacheData(data: any, cacheKey: string) {
    const cacheData = {
      timestamp: new Date().getTime(),
      data: data
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  }

  private getCachedAirQualityData(): any {
    return this.getCachedData(this.airQualityDataCacheKey);
  }

  private getCachedData(cacheKey: string): any {
    const cachedString = localStorage.getItem(cacheKey);
    if (!cachedString) return null;
    const {timestamp, data} = JSON.parse(cachedString);
    if (new Date().getTime() - timestamp > this.cacheDuration) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    return data;
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
