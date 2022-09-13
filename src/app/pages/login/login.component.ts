import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { VerseService } from 'src/app/services';

export class Book {
  public image?: string;
  public bookname?: string;
  public verse?: number;
  public chapter?: number;
  public text?: string;
  public expiration?: moment.Moment;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isAdmin?: boolean = false;
  public year = new Date().getFullYear();
  public book?: Book;

  constructor(
    private router: Router,
    private readonly verseService: VerseService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.router.url === '/auth/iniciar-sesion' ? true : false;

    const dataBook = {
      image:
        'https://res.cloudinary.com/dclbq0rdh/image/upload/v1663009825/verses/imagen1.jpg',
      bookname: 'Josué',
      verse: 9,
      chapter: 1,
      text: 'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.',
      expiration: moment(new Date()),
    };

    if (
      localStorage.getItem('verse') === null ||
      localStorage.getItem('verse') === typeof undefined
    ) {
      localStorage.setItem('verse', JSON.stringify(dataBook));
    } else {
      const bookLocal: any = localStorage.getItem('verse');
      const today = moment(new Date());
      const hours = today.diff(JSON.parse(bookLocal).expiration, 'hours');
      let numberImage = Math.floor(Math.random() * 15 + 1);
      let urlImage = `../../../assets/verses/imagen${numberImage}.jpg`;

      if (hours > 24) {
        this.verseService.getVerse().subscribe((res: any) => {
          const { bookname, verse, chapter, text } = res[0];
          this.book = {
            image: urlImage ? urlImage : dataBook.image,
            bookname: bookname ? bookname : dataBook.bookname,
            verse: verse ? verse : dataBook.verse,
            chapter: chapter ? chapter : dataBook.chapter,
            text: text ? text : dataBook.text,
            expiration: moment(new Date()),
          };

          localStorage.setItem('verse', JSON.stringify(this.book));
        });
      }
    }
  }
}
