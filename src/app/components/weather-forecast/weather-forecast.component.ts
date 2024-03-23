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
  allSites: string[] = [];
  selectedSite!: string ;
  temperature: Number = 0; // [celsius]
  humidity: Number = 0; // [percent]
  windSpeed: Number = 0; // [km/h]
  windDirection: CardinalDirection = CardinalDirection.East;
  uv: Number = 0; // [percent??]


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getActiveCities().subscribe(data => {
      this.allSites = this.getAllActiveSitesFromRequest(data);
    });
    this.selectedSite= this.getDefaultSite(this.allSites);
    this.getCurrentWeatherForSite();
  }

  getAllActiveSitesFromRequest(data: any): string[]{
    return Object.values(data);
  }

  getDefaultSite(allSites: string[]): string{
    return allSites.includes('BEER SHEVA') ? 'BEER SHEVA' : allSites[0];
  }

  getCurrentWeatherForSite(){
    this.dataService.getCurrentWeatherForSite(this.selectedSite).subscribe(data => {
      this.temperature = data.temperature;
      this.humidity = data.humidity;
      this.windSpeed = data.windSpeed;
      this.windDirection = data.windDirection;
      this.uv = data.uv;
    });
  }

  getCurrentWeatherForSiteTEST(){
    let mockData = {"temperature": 0,
                    "humidity": 0,
                    "windSpeed": 0,
                    "windDirection": CardinalDirection.North,
                    "uv": 0
    };
    switch(this.selectedSite){
      case 'Haifa':
        mockData["temperature"] = 15;
        mockData["humidity"] = 70;
        mockData["windSpeed"] = 5;
        mockData["windDirection"] = CardinalDirection.East;
        mockData["uv"] = 1;
        break;
      case 'Beer-Sheva':
      default:
        mockData["temperature"] = 30;
        mockData["humidity"] = 40;
        mockData["windSpeed"] = 20;
        mockData["windDirection"] = CardinalDirection.SouthEast;
        mockData["uv"] = 3;
        break;
    }
    return mockData;
  }

  onDropdownChange(event: any) {
    this.selectedSite = event.value;
    this.getCurrentWeatherForSite();
  }

}
