import { Component, OnInit } from '@angular/core';
import { concat, noop, of, scheduled } from 'rxjs';
import { concatAll, map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const http$ = createHttpObservable('/api/courses');

    // const courses$ = http$.pipe(map(res => Object.values(res['payload'])));

    // courses$.subscribe(data => {
    //   console.log(data);
    // }, noop, () => console.log('completed'));

    const source1$ = of(1, 2, 3);

    const source2$ = of(4, 5, 6);


    const results$ = concat(source1$, source2$);

    results$.subscribe(console.log);
  }
}
