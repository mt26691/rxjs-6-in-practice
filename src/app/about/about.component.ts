import { Component, OnInit } from '@angular/core';
import { noop, Observable } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = new Observable(t => {
      fetch('/api/courses').then(response => {
        return response.json();
      }).then(body => {
        t.next(body);
        t.complete();
      }).catch(err => t.error(err));
    });

    http$.subscribe(data => {
      console.log(data);
    }, noop, () => console.log('completed'));
  }
}
