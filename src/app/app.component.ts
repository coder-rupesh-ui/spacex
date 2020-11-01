import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spacex';
  startYear = 2001;
  endYear = 2020;
  years = [];
  successfulLaunch: boolean;
  successfulLanding: boolean;
  missionList: any[] = [];
  param: any = {};
  developerName = 'Rupeshkumar Yadav';

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.filter$.subscribe((data) => {
      this.getProgramList(this.param);
    });
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.years.push({
        label: i,
        selected: false
      });
    }
  }

  getProgramList(param) {
    this.appService.getData(param).subscribe((data: any[]) => {
      console.log(data);
      this.missionList = data;
    }, error => {
      console.log(error);
    });
  }

  selectYear(year) {
    this.clearYearSelection();
    year.selected = true;
    this.param.launch_year = year.label;
    this.appService.setParams(this.param);
  }

  clearYearSelection() {
    this.years.forEach((year) => {
      year.selected = false;
    });
  }

  selectLaunch(flag) {
    this.successfulLaunch = flag;
    this.param.launch_success = flag;
    this.appService.setParams(this.param);
  }

  selectLanding(flag) {
    this.successfulLanding = flag;
    this.param.land_success = flag;
    this.appService.setParams(this.param);
  }
}
