import { Observable } from "rxjs";

export function createHttpObservable(url): Observable<any> {
  return new Observable(t => {

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal }).then(response => {
      if (response.ok) {
        return response.json();
      }
      t.error(`Request failed with status code = ${response.status}`);
    }).then(body => {
      t.next(body);
      t.complete();
    }).catch(err => t.error(err));

    return () => {
      console.log(`unsubcribe----`);
      controller.abort();
    };
  })
}