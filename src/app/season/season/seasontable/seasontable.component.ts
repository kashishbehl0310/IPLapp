import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../../model/match';

@Component({
  selector: 'app-seasontable',
  templateUrl: './seasontable.component.html',
  styleUrls: ['./seasontable.component.css']
})
export class SeasontableComponent implements OnInit {

  @Input() matches: Match;
  @Input() season: String;
  constructor() { }

  ngOnInit() {
  }

}
