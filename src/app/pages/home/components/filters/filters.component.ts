import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Genres } from '../../../../models/movie.model';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit {
  @Input() genreList: Genres | undefined;
  @Output() genreChange = new EventEmitter<string>();

  onGenreChange(selectedValue: string): void {
    this.genreChange.emit(selectedValue);
  }

  ngOnInit(): void {}
}
