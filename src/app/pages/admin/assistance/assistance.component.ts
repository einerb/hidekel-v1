import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
})
export class AssistanceComponent implements OnInit {
  public dateRealized?: string;

  constructor() {}

  ngOnInit(): void {
    moment.locale('es');
    this.dateRealized = moment(new Date()).format('LLLL');
  }
}
