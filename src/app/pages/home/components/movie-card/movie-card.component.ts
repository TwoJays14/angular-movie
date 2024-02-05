import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Movie, Movies } from '../../../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() card!: Movies;
  @Output() pageNumber = new EventEmitter<number>();
  hoveredIndex: string | undefined;

  // @HostListener('mouseenter') onMouseEnter() {
  //   this.likeAndShare = true;
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.likeAndShare = false;
  // }

  onMouseEnter(index: string): void {
    console.log('index: ' + index);

    this.hoveredIndex = index;
  }

  onMouseLeave() {
    this.hoveredIndex = undefined;
  }

  page(index: number) {
    this.pageNumber.emit(index);
  }
}
