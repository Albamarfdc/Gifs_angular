import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
  // Sin el ViewChild
  // (keyup.enter)="searchTag(txtTagInput.value)"
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }

  //Sin ViewChild
  // searchTag(newTag: string) {
  //   console.log({ newTag });
  // }
}
