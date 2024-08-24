import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';

export enum WeatherCondition{
  sunny,
  cloudy,
  partly_cloudy,
  rainy,
  windy,
  snowy,
  foggy
}

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})
export class WeatherForecastComponent implements OnInit{
  allSites: any[] = [];
  allowedSites: any[] = [];
  selectedSite: { siteId:number,siteName:string } = { siteId:0,siteName:'' };
  temperature: number = 0; // [celsius]
  humidity: number = 0; // [percent]
  windSpeed: number = 0; // [km/h]
  windDirection: number = 0; // [degrees]
  radiation: number = 0; // [w/m2]
  maxTemp: number = 0; // [celsius]
  minTemp: number = 0; // [celsius]
  rain: number = 0; // [ml]
  pressure: number = 0; // [hPa]
  weatherCondition: WeatherCondition = WeatherCondition.sunny;

  private weatherDataCacheKey = 'weatherSummaryCache';
  private activeSitesDataCacheKey = 'activeSitesCache';
  private cacheDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

  testMode: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Testing if server side rendering (SSR) is off (should return true + localstorage should be available)
    console.log('Is window defined?', typeof window !== 'undefined');
    try {
      localStorage.setItem('test', 'test');
      console.log('localStorage is available');
    } catch (e) {
      console.log('localStorage is not available');
    }
    // setting allowed sites
    this.setAllowedSites();
    // Fetching active sites
    this.setActiveSites();
    // Setting default site for component start-up
    this.getDefaultSite();
    // Fetching weather data for the default site
    this.getCurrentWeatherForSelectedSite();
  }

  private setAllowedSites(): void {
    this.allowedSites = [
      {"siteId": 411, "siteName": "BEER SHEVA BGU"},
      {"siteId": 178, "siteName": "TEL AVIV"},
      {"siteId": 23, "siteName": "JERUSALEM"},
      {"siteId": 42, "siteName": "HAIFA"},
      {"siteId": 124, "siteName": "ASHDOD"},
      {"siteId": 208, "siteName": "ASHKELON"},
      {"siteId": 10, "siteName": "MAROM GOLAN"},
      {"siteId": 54, "siteName": "BEIT DAGAN"},
      {"siteId": 64, "siteName": "EILAT"}
    ]
  }

  private setActiveSites() {
    if (this.testMode){
      this.allSites =  this.allowedSites;
      return;
    }
    const cachedData = this.getCachedActiveSitesData();
    if (cachedData) {
      this.allSites = this.processActiveSitesData(cachedData);
    } else {
      this.dataService.getActiveSites().subscribe(data => {
        this.allSites = this.processActiveSitesData(data);
        this.cacheActiveSitesData(data);
      });
    }
  }

  processActiveSitesData(data: any): any[] {
    let entries: [string, unknown][] = Object.entries(data);
    const activeSites: any[] = entries.map(entry => ({
      siteId: Number(entry[0]),
      siteName: String(entry[1])
    }));

    // Filter active sites to only include allowed sites
    const filteredSites = activeSites.filter(activeSite =>
      this.allowedSites.some(allowedSite => allowedSite.siteId === activeSite.siteId)
    );

    return filteredSites;
  }

  getDefaultSite(): void{
    // const site = this.allSites.find(site => site.siteName === 'BEER SHEVA BGU')
    // this.selectedSite = site ?? this.allSites[0];
    this.selectedSite = {"siteId": 411,"siteName": "BEER SHEVA BGU"};
  }

  getCurrentWeatherForSelectedSite(){
    if (this.testMode) {
      return;
    } else {
      const siteId = this.selectedSite?.siteId;
      const cachedData = this.getCachedWeatherData(siteId);
      if (cachedData) {
        this.processWeatherData(cachedData);
      } else {
        this.dataService.getCurrentWeatherForSite(siteId).subscribe(data => {
          this.processWeatherData(data);
          this.cacheWeatherData(siteId, data);
        });
      }
    }
  }

  processWeatherData(data: any): void {
    // Reset all variables to zero at the start
    this.temperature = 0;
    this.humidity = 0;
    this.windSpeed = 0;
    this.windDirection = 0;
    this.radiation = 0;
    this.maxTemp = 0;
    this.minTemp = 0;
    this.rain = 0;
    this.pressure = 0;

    // Process the data if it exists
    if (data && typeof data === 'object') {
      let entries: [string, unknown][] = Object.entries(data);
      for (const [key, value] of entries) {
        switch (key) {
          case "temperature_dry":
            this.temperature = Math.floor(Number(value) || 0);
            break;
          case "relative_humidity":
            this.humidity = Number(value) || 0;
            break;
          case "wind_speed":
            this.windSpeed = Number(value) || 0;
            break;
          case "wind_direction":
            this.windDirection = Number(value) || 0;
            break;
          case "radiation_global":
            this.radiation = Number(value) || 0;
            break;
          case "temperature_max":
            this.maxTemp = Number(value) || 0;
            break;
          case "temperature_min":
            this.minTemp = Number(value) || 0;
            break;
          case "rain":
            this.rain = Number(value) || 0;
            break;
          case "pressure":
            this.pressure = Number(value) || 0;
            break;
        }
      }
    }

    this.calculateWeatherCondition();
  }

  private getCachedWeatherData(siteId: number): any {
    const cacheKey: string = `${this.weatherDataCacheKey}_${siteId}`;
    return this.getCachedData(cacheKey);
  }
  private getCachedActiveSitesData(): any {
    return this.getCachedData(this.activeSitesDataCacheKey);
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

  private cacheWeatherData(siteId: number, data: any): void {
    const cacheKey = `${this.weatherDataCacheKey}_${siteId}`;
    this.cacheData(data, cacheKey);
  }

  private cacheActiveSitesData(data: any): void {
    this.cacheData(data, this.activeSitesDataCacheKey);
  }

  private cacheData(data: any, cacheKey: string) {
    const cacheData = {
      timestamp: new Date().getTime(),
      data: data
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  }

  onDropdownChange(event: any) {
    this.selectedSite = event.value;
    this.getCurrentWeatherForSelectedSite();
  }

  getWindArrowRotation(): string {
    return `rotate(${this.windDirection - 90}deg)`;
  }

  calculateWeatherCondition(): WeatherCondition {
    if (this.rain > 0.5){
      this.weatherCondition =  WeatherCondition.rainy;
    }
    if (this.temperature <= 0){
      this.weatherCondition = WeatherCondition.snowy;
    }
    if (this.humidity > 90){
      this.weatherCondition = WeatherCondition.foggy;
    }
    if (this.windSpeed > 25){
      this.weatherCondition = WeatherCondition.windy;
    }
    // TODO: ADD CLOUDY RELEVANT WEATHER INFO
    return WeatherCondition.sunny;
  }

  // protected WeatherCondition = WeatherCondition;

  getBackgroundImage(): string {
    switch (this.weatherCondition){
      case WeatherCondition.sunny:
        return 'url(/assets/img/sunny-sky2.jpg)'
      case WeatherCondition.cloudy:
        return 'url(/assets/img/dark-clouds.jpg)';
      case WeatherCondition.partly_cloudy:
        return 'url(/assets/img/partly-cloudy2.jpg)';
      case WeatherCondition.rainy:
        return 'url(/assets/img/rainy.jpg)';
      case WeatherCondition.snowy:
        return 'url(/assets/img/snow.jpg)';
      case WeatherCondition.windy:
        return 'url(/assets/img/sunny-sky.jpg)'
      case WeatherCondition.foggy:
        return 'url(/assets/img/fog.jpg)'
      default:
        return 'url(/assets/img/sunny-sky.jpg)';
    }
  }

  protected readonly WeatherCondition = WeatherCondition;
}
