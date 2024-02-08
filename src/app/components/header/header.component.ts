import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<boolean>();
  @Output() showFiller: boolean = false;
  searchControl: FormControl = new FormControl('');

  constructor(private sharedService: SharedService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((model) => {
        this.performSearch(model);
      });
  }


  changeSidenav(filler: boolean) {
    this.showFiller = !this.showFiller;
    this.toggle.emit(filler);
    // console.log(filler);
  }

  performSearch(query: string) {
  
    if (query) {
      this.sharedService.emitChange(query);
     
    }

  }
}
