import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';


enum CardinalDirection {
  North,
  NorthEast,
  East,
  SouthEast,
  South,
  SouthWest,
  West,
  NorthWest
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
  temperature: Number = 0; // [celsius]
  humidity: Number = 0; // [percent]
  windSpeed: Number = 0; // [km/h]
  windDirection: CardinalDirection = CardinalDirection.East;
  uv: Number = 0; // [percent??]


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getActiveCities().subscribe(data => {
      this.allSites = this.processActiveCitiesToSites(data);
    });
    this.getDefaultSite();
    this.getCurrentWeatherForSite();
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
    this.dataService.getCurrentWeatherForSite(this.selectedSite.siteId).subscribe(data => {
      this.allSitesData = this.processWeatherSummary(data);
    });
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
    }
    return obj
  }


  onDropdownChange(event: any) {
    this.selectedSite = event.value;
    this.getCurrentWeatherForSite();
  }

}
