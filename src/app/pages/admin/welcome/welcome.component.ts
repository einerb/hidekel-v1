import { Component, OnInit } from '@angular/core';

export class Book {
  public image?: string;
  public bookname?: string;
  public verse?: number;
  public chapter?: number;
  public text?: string;
  public expiration?: moment.Moment;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public book?: Book;

  constructor() {}

  ngOnInit(): void {
    const bookLocal: any = localStorage.getItem('verse');

    this.book = JSON.parse(bookLocal);
  }
}
