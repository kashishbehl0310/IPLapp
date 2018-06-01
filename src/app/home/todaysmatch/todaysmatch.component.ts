import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../model/match';
@Component({
  selector: 'app-todaysmatch',
  templateUrl: './todaysmatch.component.html',
  styleUrls: ['./todaysmatch.component.css','../../app.component.css']
})
export class TodaysmatchComponent implements OnInit {

  @Input() matches: Match[];
  @Input() date: String;
  path: String = "assets/team_logos";
  veiwMore: Boolean = false;
  text: String;
  ngOnInit(){}

  constructor(){

  }
  toggle(){
    this.veiwMore = !this.veiwMore;
  }

  winbywickets(number): boolean{
    return number > 0;
  }
  winbyruns(number): boolean{
    return number > 0;
  }
  
}
