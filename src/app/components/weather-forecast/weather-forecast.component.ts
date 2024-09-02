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

  /**
   * @function ngOnInit
   * @description Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * It initializes the component by setting allowed sites, fetching active sites, and getting the current weather for the default site.
   */
  ngOnInit(): void {

    // // Testing if server side rendering (SSR) is off (should return true + localstorage should be available)
    // console.log('Is window defined?', typeof window !== 'undefined');
    // try {
    //   localStorage.setItem('test', 'test');
    //   console.log('localStorage is available');
    // } catch (e) {
    //   console.log('localStorage is not available');
    // }
    // setting allowed sites
    this.setAllowedSites();
    // Fetching active sites
    this.setActiveSites();
    // Fetching weather data for the default site
    this.getCurrentWeatherForSelectedSite();
  }


  /**
   * @function setAllowedSites
   * @description Initializes the `allowedSites` array with a predefined list of sites.
   * @private
   */
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

  /**
 * @function setActiveSites
 * @description  A private method that fetches and sets the active weather sites. It first checks for cached data, and if not available, it fetches new data from the server. It also sets the default site for the component start-up.
 */
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
    // Setting default site for component start-up
    this.getDefaultSite();
  }

   /**
  * Processes the raw active sites data into a formatted array of site objects. It also filters the sites to include only those in the `allowedSites` list.
  * @param data - The raw active sites data.
  * @returns An array of site objects.
  */
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

   /**
  * Sets the `selectedSite` to either the site with ID 411 (BEER SHEVA BGU) if it exists in the `allSites` array, or the first site in the array if it doesn't.
  */
  getDefaultSite(): void{
    const site = this.allSites.find(site => site.siteId === 411)
    this.selectedSite = site ?? this.allSites[0];
   // this.selectedSite = {"siteId": 411,"siteName": 'BEER SHEVA BGU'};
  }

   /**
  * Fetches the current weather data for the selected site. It first checks for cached data, and if not available, it fetches new data from the server.
  */
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

   /**
  * Processes the raw weather data and updates the component's weather-related properties with the received values.
  * @param data - The raw weather data.
  */
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

   /**
  * A private method that retrieves cached weather data for a specific site from local storage.
  * @param siteId - The ID of the site.
  * @returns The cached weather data, or null if not available.
  */
  private getCachedWeatherData(siteId: number): any {
    const cacheKey: string = `${this.weatherDataCacheKey}_${siteId}`;
    return this.getCachedData(cacheKey);
  }

  /**
  * A private method that retrieves cached active sites data from local storage.
  * @returns The cached active sites data, or null if not available.
  */
  private getCachedActiveSitesData(): any {
    return this.getCachedData(this.activeSitesDataCacheKey);
  }


   /**
  * A private method that retrieves cached data from local storage for a given cache key and checks if it's still valid based on the cache duration.
  * @param cacheKey - The key used to store the cached data.
  * @returns The cached data, or null if not available or expired.
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
  * A private method that caches weather data for a specific site in local storage.
  * @param siteId - The ID of the site.
  * @param data - The weather data to be cached.
  */
  private cacheWeatherData(siteId: number, data: any): void {
    const cacheKey = `${this.weatherDataCacheKey}_${siteId}`;
    this.cacheData(data, cacheKey);
  }

   /**
  * A private method that caches active sites data in local storage.
  * @param data - The active sites data to be cached.
  */
  private cacheActiveSitesData(data: any): void {
    this.cacheData(data, this.activeSitesDataCacheKey);
  }

   /**
  * A private method that caches any data in local storage with a timestamp.
  * @param data - The data to be cached.
  * @param cacheKey - The key used to store the cached data.
  */
  private cacheData(data: any, cacheKey: string) {
    const cacheData = {
      timestamp: new Date().getTime(),
      data: data
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  }

   /**
  * An event handler that updates the selected site and fetches new weather data when the user selects a different site from the dropdown.
  * @param event - The event object containing the selected site.
  */
  onDropdownChange(event: any) {
    this.selectedSite = event.value;
    this.getCurrentWeatherForSelectedSite();
  }

   /**
  * Calculates the rotation angle for the wind direction arrow based on the current wind direction.
  * @returns The rotation angle for the wind direction arrow.
  */
  getWindArrowRotation(): string {
    return `rotate(${this.windDirection - 90}deg)`;
  }

   /**
  * Determines the current weather condition based on various weather parameters like rain, temperature, humidity, and wind speed.
  * @returns The current weather condition.
  */
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

   /**
  * Returns the appropriate background image URL based on the current weather condition.
  * @returns The URL of the background image.
  */
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
