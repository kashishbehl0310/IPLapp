import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Match } from '../../model/match';
import { RunRate } from '../../model/RunRate';
import { PieChart } from '../../model/PieChart';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  season: String;
  seasonMatches: Match[];
  downloadingDeliveries: Boolean = false;
  runRateData: RunRate [];
  piechartData: PieChart [];

  constructor(private route: ActivatedRoute,
              private homeService: HomeService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        
        this.season = params.get('season');
      })
      let p1 = new Promise((resolve, reject) => {
        this.homeService.populateData({
          path: 'assets/data/matches_new.csv',
          dbName: 'matches',
          collection: 'matches',
          id: 'id'
        })
          .then(message => {
            this.initialiseData(resolve, reject);
          })
          .catch(error => {
            this.initialiseData(resolve, reject);
          });
      });
  
      Promise.all([p1])
        .then(() => {
          this.downloadingDeliveries = false;
        })
        .catch(err => {
          console.log(err);
        })
  
    };
  
    initialiseData(resolve, reject): void {
      // this.getTodaysMatches(this.todaysDate, resolve, reject);
  
      setTimeout(() => {
        this.getSeasonMatches(this.season);
      }, 1000);
    }
  
    getSeasonMatches(season): void {
      this.homeService.getRecords({
        name: 'matches',
        collection: 'matches',
        index: 'season',
        keyValue: season
      })
        .then(matches => {
          this.seasonMatches = matches;
          console.log(this.seasonMatches);
          this.preparePieChart(matches);
        })
        .catch(error => {
          console.log('error in getting recs: ', error);
        })
    };
    
    preparePieChart(matches): void{
      this.piechartData = this.homeService.preparePieChart(matches);
      console.log(this.piechartData);
    }
    // preparePieChartData(matches): void {
    //   this.pieChartData = this.homeService.preparePieChartData(matches);
    // }
}
