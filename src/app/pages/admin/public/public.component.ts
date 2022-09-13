import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  public dateRealized?: string;

  constructor() {}

  ngOnInit(): void {
    moment.locale('es');
    this.dateRealized = moment(new Date()).format('LLLL');
  }
}
