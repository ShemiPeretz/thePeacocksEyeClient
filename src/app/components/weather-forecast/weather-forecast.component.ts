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
  sites: string[] = [];
  defaultSite: string = 'Beer-Sheva';
  temperature: Number = 0; // [celsius]
  humidity: Number = 0; // [percent]
  windSpeed: Number = 0; // [km/h]
  windDirection: CardinalDirection = CardinalDirection.East;
  uv: Number = 0; // [percent??]
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllSites().subscribe(data => {
      this.sites = data.sites;
    });
    this.getCurrentWeatherForSite(this.defaultSite);
  }

  getCurrentWeatherForSite(site: string){
    this.dataService.getCurrentWeatherForSite(site).subscribe(data => {
      this.temperature = data.temperature;
      this.humidity = data.humidity;
      this.windSpeed = data.windSpeed;
      this.windDirection = data.windDirection;
      this.uv = data.uv;
    });
  }

}
