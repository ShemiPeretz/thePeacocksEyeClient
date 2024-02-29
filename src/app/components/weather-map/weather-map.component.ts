import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrl: './weather-map.component.scss'
})
export class WeatherMapComponent implements OnInit{
  private map!: L.Map;

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }
}
