import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<boolean>();
  @Output() showFiller: boolean = false;

  changeSidenav(filler: boolean) {
    this.showFiller = !this.showFiller;
    this.toggle.emit(filler);
    console.log(filler);
  }
}
