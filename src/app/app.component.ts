import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spacex';
  startYear=2001;
  endYear=2020;
  years = [];
  successfulLaunch: boolean;
  successfulLanding: boolean;

  ngOnInit() {
    for(let i=this.startYear;i<=this.endYear;i++) {
      this.years.push({
        label: i,
        selected: false
      });  
    }
  }

  selectYear(year) {
    this.clearYearSelection();
    year.selected = true;
  }

  clearYearSelection() {
    this.years.forEach((year) => {
      year.selected = false;
    })
  }

  selectLaunch(flag) {
    this.successfulLaunch = flag;
  }

  selectLanding(flag) {
    this.successfulLanding = flag;
  }
}
