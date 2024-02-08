import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private emitChangeSource = new EventEmitter<string>();

  changeEmitted$ = this.emitChangeSource.asObservable();

  

  emitChange(change: string): void {
    this.emitChangeSource.emit(change);
    console.log('change', change);
  }
}
