import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<boolean>();
  @Output() showFiller: boolean = false;
  searchValue: string | undefined;

  constructor(private sharedService: SharedService) {}

  clearSearch() {
    this.searchValue = '';
  }

  changeSidenav(filler: boolean) {
    this.showFiller = !this.showFiller;
    this.toggle.emit(filler);
    // console.log(filler);
  }

  performSearch() {
    const query = this.searchValue;
    if (query) {
      this.sharedService.emitChange(query);
      this.searchValue = '';
    }

    // Implement your search logic here
  }
}
