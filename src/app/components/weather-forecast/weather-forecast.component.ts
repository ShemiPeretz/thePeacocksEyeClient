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
        {"siteId": 411,"siteName": "BEER SHEVA BGU"},
        {"siteId": 178, "siteName": "TEL AVIV"},
        {"siteId": 23, "siteName": "JERUSALEM"},
        {"siteId": 42, "siteName": "HAIFA"},
        {"siteId": 124, "siteName": "ASHDOD"},
        {"siteId": 208, "siteName": "ASHKELON"},
        {"siteId": 10, "siteName": "MAROM GOLAN"},
        {"siteId": 54, "siteName": "BEIT DAGAN"},
        {"siteId": 64, "siteName": "EILAT"},
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
      const demoData = this.getDemoData();
      this.temperature  = demoData[this.selectedSite.siteName]['TD'];
      this.humidity  = demoData[this.selectedSite.siteName]['RH'];
      this.windSpeed  = demoData[this.selectedSite.siteName]['WS'];
      this.windDirection = demoData[this.selectedSite.siteName]['WD'];
      this.uv = demoData[this.selectedSite.siteName]['Grad'];
      this.maxTemp = demoData[this.selectedSite.siteName]['TDmax'];
      this.minTemp = demoData[this.selectedSite.siteName]['TDmin'];
      this.rain = demoData[this.selectedSite.siteName]['Rain'];
      this.pressure = demoData[this.selectedSite.siteName]['BP'];
    } else {
      this.dataService.getCurrentWeatherForSite(this.selectedSite.siteId).subscribe(data => {
        this.allSitesData = this.processWeatherSummary(data);
      });
    }
    this.calculateWeatherCondition()
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

  getDemoData(): any{
    let result: any = {};
    result = {
      "BEER SHEVA BGU": {
        "Rain": 0,
        "WS": 1.7,
        "WD": 113,
        "TD": 20,
        "RH": 35,
        "TDmax": 21,
        "TDmin": 20,
        "BP": 980,
        "Grad": 8
      },
      "TEL AVIV": {
        "Rain": 0,
        "WS": 3,
        "WD": 254,
        "TD": 16,
        "RH": 89,
        "TDmax": 17,
        "TDmin": 16,
        "BP": "--",
        "Grad": 7
      },
      "JERUSALEM": {
        "Rain": 0,
        "WS": 1.9,
        "WD": 349,
        "TD": 22,
        "TDmax": 22,
        "TDmin": 21,
        "BP": 924,
        "RH": 20,
        "Grad": 7
      },
      "HAIFA":{
        "Rain": 0,
        "WS": 3.1,
        "WD": 237,
        "TD": 20,
        "RH": 47,
        "TDmax": 20,
        "TDmin": 20,
        "Grad": 7
      },
      "ASHDOD":{
        "Rain": 0,
        "WS": 1.2,
        "WD": 233,
        "TD": 18,
        "RH": 89,
        "TDmax": 18,
        "TDmin": 18,
        "BP": "--",
        "Grad": 7
      },
      "ASHKELON":{
        "Rain": 0,
        "WS": 2,
        "WD": 305,
        "TD": 18,
        "RH": 92,
        "TDmax": 18,
        "TDmin": 18,
        "BP": "--",
        "Grad": 7
      },
      "MAROM GOLAN":{
        "Rain": 0.0,
        "WS": 5.3,
        "WD": 288.0,
        "RH": 31.0,
        "TD": 22.9,
        "TDmax": 23.2,
        "TDmin": 22.7,
        "BP": 969.0,
        "Grad": 6
      },
      "BEIT DAGAN":{},
      "EILAT": {},
    }

    return result
  }

  protected readonly WeatherCondition = WeatherCondition;
}
