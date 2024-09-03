import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";

export enum AirQualityLevel{
  Dangerous = "Dangerous",
  Unhealthy = "Unhealthy",
  Poor = "Poor" ,
  Fair = "Fair" ,
  Excellent = "Excellent"
}

/**
 * @component AirQualityComponent
 * @description Displays air quality data & index
 */
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

  /**
   * Initializes the component.
   * Fetches the current Air Quality data.
   * Sets the air quality text description.
   */
  ngOnInit() {
    // Fetching air quality data from server
    this.getAirQualityChannelsData();
    // Setting air quality description by air quality level
    this.airQualityDescription = this.getDescriptionByLevel();
  }

  /**
   * Fetches the current Air Quality data from the Server or Cache (if exists and not expired).
   * If fetched from server -> Caches the data
   */
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

  /**
   * Sets the air quality component variables from data
   * @param data - Holds all air quality channels
   */
  setAirQualityChannelsData(data: any) : void {
    const channels = data.channels;
    this.pm2 = channels['PM2.5'];
    this.pm10 = channels['PM10'];
    this.no2 = channels['NO2'];
    this.o3 = channels['O3'];
  }

  /**
   * Caches the air quality data
   * @param data - Holds all air quality channels
   * @private
   */
  private cacheAirQualityData(data: any): void {
    this.cacheData(data, this.airQualityDataCacheKey);
  }

  /**
   * General data caching in localstorage
   * @param data - any
   * @param cacheKey - key to store in localstorage dictionary
   * @private
   */
  private cacheData(data: any, cacheKey: string) {
    const cacheData = {
      timestamp: new Date().getTime(),
      data: data
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  }

  /**
   * Retrieves cached air quality data.
   * @private
   */
  private getCachedAirQualityData(): any {
    return this.getCachedData(this.airQualityDataCacheKey);
  }

  /**
   * Retrieves cached data for a given cache key.
   * @param cacheKey - The key to retrieve data from localstorage
   * @private
   */
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


  /**
   *  Returns a background color string based on the current air quality level.
   */
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

  /**
   * Returns a description string based on the current air quality level.
   */
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

  /**
   * Returns a string of recommended activities based on the current air quality level. (Note: This function is currently empty for all levels)
   */
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
