import { Component } from '@angular/core';
import { DataService } from '../../data.service';


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
export class WeatherForecastComponent {
  allSites: string[] = [];
  selectedSite: string = 'Beer-Sheva';
  temperature: Number = 0; // [celsius]
  humidity: Number = 0; // [percent]
  windSpeed: Number = 0; // [km/h]
  windDirection: CardinalDirection = CardinalDirection.East;
  uv: Number = 0; // [percent??]

  isTest: boolean = true;
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.dataService.getAllSites().subscribe(data => {
    //   this.sites = data.sites;
    // });
    this.allSites = ['Beer-Sheva', 'Haifa'];
    this.getCurrentWeatherForSite();
  }

  getCurrentWeatherForSite(){
    if(this.isTest){
      const mockData = this.getCurrentWeatherForSiteTEST()
      this.temperature = mockData.temperature;
      this.humidity = mockData.humidity;
      this.windSpeed = mockData.windSpeed;
      this.windDirection = mockData.windDirection;
      this.uv = mockData.uv;   
      return;
    }
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
    console.log("****************ONDATACHANGE**************");
    console.log((event.target as HTMLSelectElement).value);
    const newSelectedSite = (event.target as HTMLSelectElement).value;
    this.selectedSite = newSelectedSite;
    this.getCurrentWeatherForSite();
  }

}
