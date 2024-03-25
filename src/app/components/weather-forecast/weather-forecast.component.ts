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
  allSitesData: {} = {};
  selectedSite: { siteId:string,siteName:string } = { siteId:'',siteName:'' };
  temperature: number = 0; // [celsius]
  humidity: number = 0; // [percent]
  windSpeed: number = 0; // [km/h]
  windDirection: number = 0; // [degrees]
  uv: number = 0; // [percent??]
  maxTemp: number = 0; // [celsius]
  minTemp: number = 0; // [celsius]
  rain: number = 0; // [ml]
  pressure: number = 0; // [hPa]
  weatherCondition: WeatherCondition = WeatherCondition.sunny;

  testMode: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if (this.testMode){
      this.allSites =  [
        {"siteId": 411,"siteName": "BEER SHEVA"},
        {"siteId": 59, "siteName": "BEER SHEVA BGU"}
    ]
    } else {
      this.dataService.getActiveCities().subscribe(data => {
        this.allSites = this.processActiveCitiesToSites(data);
      });
    }
    this.getDefaultSite();
    this.getCurrentWeatherForSite();
    // TODO - uncomment when real data is streaming
    // this.weatherCondition = this.calculateWeatherCondition();
  }

  processActiveCitiesToSites(data: any): any[]{
    let entries: [string, unknown][] = Object.entries(data);
    const obj: any[] = [];
    entries.forEach(entry => obj.push({"siteId": entry[0], "siteName": entry[1]}));
    return obj;
  }

  getDefaultSite(): void{
    const site = this.allSites.find(site => site.siteName === 'BEER SHEVA BGU' || site.siteName === 'BEER SHEVA')
    this.selectedSite = site ?? this.allSites[0];
  }

  getCurrentWeatherForSite(){
    if (this.testMode) {
      this.allSitesData = {
        "windSpeed": 15,
        "windDirection": 330,
        "temperature": 17,
        "uv": 4
      };
      this.temperature  = 17;
      this.humidity  = 47;
      this.windSpeed  = 15;
      this.windDirection = 330;
      this.uv = 4;
      this.maxTemp = 21;
      this.minTemp = 8;
      this.rain = 0;
      this.pressure = 1012;
    } else {
      this.dataService.getCurrentWeatherForSite(this.selectedSite.siteId).subscribe(data => {
        this.allSitesData = this.processWeatherSummary(data);
      });
    }
  }

  processWeatherSummary(data: any): {}{
    const obj: any = {};
    let entries: [string, unknown][] = Object.entries(data);
    for (const entry of entries) switch (entry[0]) {
      case "TD":
        obj["temperature"] =  entry[1];
        break;
      case "RH":
        obj["humidity"] =  entry[1];
        break;
      case "WS":
        obj["windSpeed"] =  entry[1];
        break;
      case "WD":
        obj["windDirection"] =  entry[1];
        break;
      case "Grad":
        obj["uv"] =  entry[1];
        break;
      case "TDmax":
        obj["maxTemp"] =  entry[1];
        break;
      case "TDmin":
        obj["minTemp"] =  entry[1];
        break;
      case "Rain":
        obj["rain"] =  entry[1];
        break;
      case "BP":
        obj["pressure"] =  entry[1];
        break;
    }
    return obj
  }


  onDropdownChange(event: any) {
    this.selectedSite = event.value;
    this.getCurrentWeatherForSite();
  }

  getWindArrowRotation(): string {
    return `rotate(${this.windDirection}deg)`;
  }

  calculateWeatherCondition(): WeatherCondition {
    if (this.rain > 0.5){
      return WeatherCondition.rainy;
    }
    if (this.temperature <= 0){
      return WeatherCondition.snowy;
    }
    if (this.humidity > 90){
      return WeatherCondition.foggy;
    }
    if (this.windSpeed > 25){
      return WeatherCondition.windy;
    }
    // TODO: ADD CLOUDY RELEVANT WEATHER INFO
    return WeatherCondition.sunny;
  }

  protected readonly WeatherCondition = WeatherCondition;

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
}
