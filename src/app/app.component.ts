import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

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
  successfulLaunch: string;
  successfulLanding: string;
  missionList: any[] = [];
  param: any = {};
  developerName = 'Rupeshkumar Yadav';


  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.launch_year) {
        this.param.launch_year = queryParams.launch_year;
      }
      if (queryParams.launch_success) {
        this.param.launch_success = queryParams.launch_success;
        this.successfulLaunch = queryParams.launch_success;
      }
      if (queryParams.land_success) {
        this.param.land_success = queryParams.land_success;
        this.successfulLanding = queryParams.land_success;
      }
      this.init();
    })
  }

  init() {
    /* this.appService.filter$.subscribe((data) => {
      this.getProgramList(this.param);
    }); */
    this.getProgramList(this.param);
    this.years = [];
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.years.push({
        label: i,
        selected: i == this.param.launch_year
      });
    }
  }

  getProgramList(param) {
    this.appService.getData(param).subscribe((data: any[]) => {
      this.missionList = data;
    }, error => {
      console.log(error);
    });
  }

  selectYear(year) {
    this.clearYearSelection();
    year.selected = true;
    this.param.launch_year = year.label;
    // this.appService.setParams(this.param);
    this.router.navigate(['/'], {
      queryParams: this.param
    });
  }

  clearYearSelection() {
    this.years.forEach((year) => {
      year.selected = false;
    });
  }

  selectLaunch(flag) {
    this.successfulLaunch = flag;
    this.param.launch_success = flag;
    // this.appService.setParams(this.param);
    this.router.navigate(['/'], {
      queryParams: this.param
    });
  }

  selectLanding(flag) {
    this.successfulLanding = flag;
    this.param.land_success = flag;
    // this.appService.setParams(this.param);
    this.router.navigate(['/'], {
      queryParams: this.param
    });
  }
}
