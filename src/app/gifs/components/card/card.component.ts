import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})

// OnInit es un hook de ciclo de vida de Angular que se ejecuta después de que Angular haya inicializado todas las propiedades de un componente.
export class CardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) throw new Error('El gif es obligatorio');
  }
}
