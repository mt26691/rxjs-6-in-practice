import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delayWhen, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');

        const courses$: Observable<any[]> = http$
            .pipe(
                catchError(err => {
                    console.log(`error happened`);
                    console.error(err);
                    return throwError(err);
                    // return of([]); 
                }),
                finalize(() => {
                    console.log(`finalize executed`);

                }),
                tap(() => console.log("HTTP REQUEST EXECUTED")),
                map(res => Object.values(res['payload'])),
                shareReplay(),
                retryWhen(errors => errors.pipe(delayWhen(() => timer(2000))))
            );


        this.beginnersCourses$ = courses$.pipe(
            map(courses => courses.filter(t => t.category === 'BEGINNER'))
        );

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(t => t.category === 'ADVANCED'))
        );
    }

}
