// import { Component, OnInit } from '@angular/core';
// import * as L from 'leaflet';
// import 'leaflet-heatmap';
//
// declare module 'leaflet' {
//   export interface HeatMapOptions {
//     minOpacity?: number;
//     maxZoom?: number;
//     max?: number;
//     radius?: number;
//     blur?: number;
//     gradient?: { [key: number]: string };
//   }
//   export interface HeatLayer extends L.Layer {
//     setLatLngs(latlngs: L.LatLngExpression[]): this;
//     addLatLng(latlng: L.LatLngExpression): this;
//     setOptions(options: HeatMapOptions): this;
//   }
//   export function heatLayer(latlngs: L.LatLngExpression[], options?: HeatMapOptions): HeatLayer;
// }
//
// interface WeatherPoint {
//   lat: number;
//   lon: number;
//   value: number;
// }
//
// @Component({
//   selector: 'app-map',
//   template: '<div id="map" style="height: 600px;"></div>',
//   styleUrls: ['./map.component.scss']
// })
// export class MapComponent implements OnInit {
//   private map!: L.Map;
//   private heatmapLayer!: L.HeatLayer;
//
//   constructor() { }
//
//   ngOnInit(): void {
//     this.getWeatherData();
//     this.initMap();
//
//   }
//
//   private initMap(): void {
//     this.map = L.map('map').setView([32.0853, 34.7818], 7);
//
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(this.map);
//
//     this.heatmapLayer = L.heatLayer([], {
//       radius: 20,
//       blur: 15,
//       maxZoom: 17,
//       max: 1.0,
//       gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
//     }).addTo(this.map);
//   }
//
//   private getWeatherData(): void {
//     const data = {
//       "data": {
//         "10": {
//           "name": "MEROM GOLAN PICMAN",
//           "location": {
//             "latitude": 33.1288,
//             "longitude": 35.8045
//           },
//           "data": {
//             "stationId": 10,
//             "data": [
//               {
//                 "datetime": "2024-07-11T14:00:00+03:00",
//                 "channels": [
//                   {
//                     "id": 1,
//                     "name": "Rain",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 2,
//                     "name": "WSmax",
//                     "alias": null,
//                     "value": 11.1,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 3,
//                     "name": "WDmax",
//                     "alias": null,
//                     "value": 307.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 4,
//                     "name": "WS",
//                     "alias": null,
//                     "value": 6.6,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 5,
//                     "name": "WD",
//                     "alias": null,
//                     "value": 299.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 6,
//                     "name": "STDwd",
//                     "alias": null,
//                     "value": 13.2,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 7,
//                     "name": "RH",
//                     "alias": null,
//                     "value": 33.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 8,
//                     "name": "TD",
//                     "alias": null,
//                     "value": 32.4,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 9,
//                     "name": "TDmax",
//                     "alias": null,
//                     "value": 32.7,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 10,
//                     "name": "TDmin",
//                     "alias": null,
//                     "value": 32.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 11,
//                     "name": "WS1mm",
//                     "alias": null,
//                     "value": 8.4,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 13,
//                     "name": "Ws10mm",
//                     "alias": null,
//                     "value": 6.6,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 14,
//                     "name": "Time",
//                     "alias": null,
//                     "value": 1400.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 15,
//                     "name": "TG",
//                     "alias": null,
//                     "value": 43.7,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 16,
//                     "name": "Grad",
//                     "alias": null,
//                     "value": 879.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 19,
//                     "name": "TW",
//                     "alias": null,
//                     "value": -9999.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   }
//                 ]
//               }
//             ]
//           }
//         },
//         "23": {
//           "name": "JERUSALEM CENTRE",
//           "location": {
//             "latitude": 31.7806,
//             "longitude": 35.2217
//           },
//           "data": {
//             "stationId": 23,
//             "data": [
//               {
//                 "datetime": "2024-07-11T14:10:00+03:00",
//                 "channels": [
//                   {
//                     "id": 1,
//                     "name": "Rain",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 2,
//                     "name": "WSmax",
//                     "alias": null,
//                     "value": 8.9,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 3,
//                     "name": "WDmax",
//                     "alias": null,
//                     "value": 291.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 4,
//                     "name": "WS",
//                     "alias": null,
//                     "value": 3.9,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 5,
//                     "name": "WD",
//                     "alias": null,
//                     "value": 287.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 6,
//                     "name": "STDwd",
//                     "alias": null,
//                     "value": 31.8,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 7,
//                     "name": "TD",
//                     "alias": null,
//                     "value": 33.8,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 8,
//                     "name": "TW",
//                     "alias": null,
//                     "value": 2026.1,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 9,
//                     "name": "TDmax",
//                     "alias": null,
//                     "value": 34.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 10,
//                     "name": "TDmin",
//                     "alias": null,
//                     "value": 33.6,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 12,
//                     "name": "WS1mm",
//                     "alias": null,
//                     "value": 6.1,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 13,
//                     "name": "Ws10mm",
//                     "alias": null,
//                     "value": 4.3,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 14,
//                     "name": "Time",
//                     "alias": null,
//                     "value": 1405.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 17,
//                     "name": "BP",
//                     "alias": null,
//                     "value": 919.51,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 18,
//                     "name": "RH",
//                     "alias": null,
//                     "value": 26.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   }
//                 ]
//               }
//             ]
//           }
//         },
//         "42": {
//           "name": "HAIFA UNIVERSITY",
//           "location": {
//             "latitude": 32.7611,
//             "longitude": 35.0208
//           },
//           "data": null
//         },
//         "54": {
//           "name": "BET DAGAN",
//           "location": {
//             "latitude": 32.0073,
//             "longitude": 34.8138
//           },
//           "data": null
//         },
//         "64": {
//           "name": "ELAT",
//           "location": {
//             "latitude": 29.5526,
//             "longitude": 34.952
//           },
//           "data": {
//             "stationId": 64,
//             "data": [
//               {
//                 "datetime": "2024-07-11T14:10:00+03:00",
//                 "channels": [
//                   {
//                     "id": 1,
//                     "name": "WSmax",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 2,
//                     "name": "WDmax",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 3,
//                     "name": "WS",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 4,
//                     "name": "WD",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 5,
//                     "name": "STDwd",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 6,
//                     "name": "TD",
//                     "alias": null,
//                     "value": 40.2,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 7,
//                     "name": "RH",
//                     "alias": null,
//                     "value": 24.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 8,
//                     "name": "TDmax",
//                     "alias": null,
//                     "value": 40.7,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 9,
//                     "name": "TDmin",
//                     "alias": null,
//                     "value": 39.8,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 10,
//                     "name": "WS1mm",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 12,
//                     "name": "Grad",
//                     "alias": null,
//                     "value": 778.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 13,
//                     "name": "NIP",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 14,
//                     "name": "DiffR",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 17,
//                     "name": "Rain",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 21,
//                     "name": "Ws10mm",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 22,
//                     "name": "Time",
//                     "alias": null,
//                     "value": 1400.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 23,
//                     "name": "BP",
//                     "alias": null,
//                     "value": 1002.77,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 28,
//                     "name": "TW",
//                     "alias": null,
//                     "value": -9999.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   }
//                 ]
//               }
//             ]
//           }
//         },
//         "124": {
//           "name": "ASHDOD PORT",
//           "location": {
//             "latitude": 31.8342,
//             "longitude": 34.6377
//           },
//           "data": {
//             "stationId": 124,
//             "data": [
//               {
//                 "datetime": "2024-07-11T14:10:00+03:00",
//                 "channels": [
//                   {
//                     "id": 1,
//                     "name": "Rain",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 2,
//                     "name": "WSmax",
//                     "alias": null,
//                     "value": 5.1,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 3,
//                     "name": "WDmax",
//                     "alias": null,
//                     "value": 351.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 4,
//                     "name": "WS",
//                     "alias": null,
//                     "value": 4.2,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 5,
//                     "name": "WD",
//                     "alias": null,
//                     "value": 347.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 6,
//                     "name": "STDwd",
//                     "alias": null,
//                     "value": 5.5,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 7,
//                     "name": "TD",
//                     "alias": null,
//                     "value": 31.6,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 8,
//                     "name": "RH",
//                     "alias": null,
//                     "value": 74.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 9,
//                     "name": "TDmax",
//                     "alias": null,
//                     "value": 31.8,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 10,
//                     "name": "TDmin",
//                     "alias": null,
//                     "value": 31.5,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 11,
//                     "name": "WS1mm",
//                     "alias": null,
//                     "value": 4.7,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 12,
//                     "name": "Ws10mm",
//                     "alias": null,
//                     "value": 4.2,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 13,
//                     "name": "Time",
//                     "alias": null,
//                     "value": 1410.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 17,
//                     "name": "TW",
//                     "alias": null,
//                     "value": -9999.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   }
//                 ]
//               }
//             ]
//           }
//         },
//         "178": {
//           "name": "TEL AVIV COAST",
//           "location": {
//             "latitude": 32.058,
//             "longitude": 34.7588
//           },
//           "data": {
//             "stationId": 178,
//             "data": [
//               {
//                 "datetime": "2024-07-11T14:10:00+03:00",
//                 "channels": [
//                   {
//                     "id": 1,
//                     "name": "Rain",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 2,
//                     "name": "WSmax",
//                     "alias": null,
//                     "value": 5.4,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 3,
//                     "name": "WDmax",
//                     "alias": null,
//                     "value": 357.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 4,
//                     "name": "WS",
//                     "alias": null,
//                     "value": 4.1,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 5,
//                     "name": "WD",
//                     "alias": null,
//                     "value": 350.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 6,
//                     "name": "STDwd",
//                     "alias": null,
//                     "value": 9.1,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 7,
//                     "name": "TD",
//                     "alias": null,
//                     "value": 30.5,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 8,
//                     "name": "RH",
//                     "alias": null,
//                     "value": 76.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 9,
//                     "name": "TDmax",
//                     "alias": null,
//                     "value": 30.9,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 10,
//                     "name": "TDmin",
//                     "alias": null,
//                     "value": 30.3,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 11,
//                     "name": "WS1mm",
//                     "alias": null,
//                     "value": 4.9,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 12,
//                     "name": "Ws10mm",
//                     "alias": null,
//                     "value": 4.9,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   },
//                   {
//                     "id": 13,
//                     "name": "Time",
//                     "alias": null,
//                     "value": 1408.0,
//                     "status": 2,
//                     "valid": false,
//                     "description": null
//                   }
//                 ]
//               }
//             ]
//           }
//         },
//         "208": {
//           "name": "ASHQELON PORT",
//           "location": {
//             "latitude": 31.6394,
//             "longitude": 34.5215
//           },
//           "data": {
//             "stationId": 208,
//             "data": [
//               {
//                 "datetime": "2024-07-11T14:10:00+03:00",
//                 "channels": [
//                   {
//                     "id": 1,
//                     "name": "Rain",
//                     "alias": null,
//                     "value": 0.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 2,
//                     "name": "WSmax",
//                     "alias": null,
//                     "value": 5.6,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 3,
//                     "name": "WDmax",
//                     "alias": null,
//                     "value": 10.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 4,
//                     "name": "WS",
//                     "alias": null,
//                     "value": 4.8,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 5,
//                     "name": "WD",
//                     "alias": null,
//                     "value": 8.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 6,
//                     "name": "STDwd",
//                     "alias": null,
//                     "value": 4.4,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 7,
//                     "name": "TD",
//                     "alias": null,
//                     "value": 29.7,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 8,
//                     "name": "RH",
//                     "alias": null,
//                     "value": 82.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 9,
//                     "name": "TDmax",
//                     "alias": null,
//                     "value": 29.9,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 10,
//                     "name": "TDmin",
//                     "alias": null,
//                     "value": 29.5,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 11,
//                     "name": "WS1mm",
//                     "alias": null,
//                     "value": 5.2,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 12,
//                     "name": "Ws10mm",
//                     "alias": null,
//                     "value": 4.8,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   },
//                   {
//                     "id": 13,
//                     "name": "Time",
//                     "alias": null,
//                     "value": 1402.0,
//                     "status": 1,
//                     "valid": true,
//                     "description": null
//                   }
//                 ]
//               }
//             ]
//           }
//         },
//         "411": {
//           "name": "BEER SHEVA BGU",
//           "location": {
//             "latitude": 31.2642,
//             "longitude": 34.8045
//           },
//           "data": null
//         }
//       }
//     };
//     // Manually added weather data
//     const weatherData: WeatherPoint[] = [
//       { lat: 32.0853, lon: 34.7818, value: 30 }, // Tel Aviv
//       { lat: 31.7683, lon: 35.2137, value: 25 }, // Jerusalem
//       { lat: 32.7940, lon: 34.9896, value: 28 }, // Haifa
//       { lat: 31.2518, lon: 34.7915, value: 32 }, // Be'er Sheva
//       { lat: 29.5581, lon: 34.9482, value: 35 }, // Eilat
//       // Add more cities as needed
//     ];
//     if (this.heatmapLayer) {
//       const heatMapData = weatherData.map(point => [point.lat, point.lon, point.value] as L.LatLngTuple);
//       this.heatmapLayer.setLatLngs(heatMapData);
//     }
//   }
// }
