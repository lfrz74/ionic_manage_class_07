import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule],
})
export class ListDataComponent {
  @Input({ required: true }) data: any[];
  @Input() emptyText: string = '';
  @Input() addText: string = '';
  @Input() showAdd: boolean = true;

  @Output() add: EventEmitter<boolean>;

  //La diferencia con @ViewChild, es q este es para componentes estáticos dice y @ContentChild
  //para dinámicos dice v, ojo pilas
  @ContentChild('templateData', { static: false })
  templateData!: TemplateRef<any>;

  constructor() {
    this.data = [];
    this.add = new EventEmitter<boolean>();
  }

  addData() {
    this.add.emit(true);
  }
}
