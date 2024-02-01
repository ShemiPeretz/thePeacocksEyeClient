import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'thePeacocksEyeClient';
  source = 'client';
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
}
