import { Observable } from "rxjs";

export function createHttpObservable(url) {
  return new Observable(t => {
    fetch(url).then(response => {
      return response.json();
    }).then(body => {
      t.next(body);
      t.complete();
    }).catch(err => t.error(err));
  })
}