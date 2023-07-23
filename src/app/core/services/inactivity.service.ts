import { Injectable } from '@angular/core';
import { Subject, fromEvent, debounceTime, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimeout = 20 * 60 * 1000; // 20 minutes
  private inactivityTimer: any;
  private inactivitySubject = new Subject<void>();

  constructor() {
    fromEvent(document, 'mousemove').pipe(debounceTime(this.inactivityTimeout)).subscribe(() => {
      this.inactivitySubject.next();
    });
  }

  //check the inactivity
  public getInactivityStream(): Observable<void> {
    return this.inactivitySubject.asObservable();
  }

  //if the user move the mouse the time will be reset
  public resetTimer(): void {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      this.inactivitySubject.next();
    }, this.inactivityTimeout);
  }
}
