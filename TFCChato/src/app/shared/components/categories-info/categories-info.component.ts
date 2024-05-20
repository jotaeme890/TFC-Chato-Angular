import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryInfo } from 'src/app/core/interfaces/category-info';

@Component({
  selector: 'app-categories-info',
  templateUrl: './categories-info.component.html',
  styleUrls: ['./categories-info.component.scss'],
})
export class CategoriesInfoComponent  implements OnInit {

  @Input() categories: CategoryInfo[] | null | undefined;
  @Output() onCategoryClicked: EventEmitter<string> = new EventEmitter<string>()


  constructor() { }

  ngOnInit() {}

  dataIncident( incidentId: string | undefined ) {
    this.onCategoryClicked.emit(incidentId)
  }

}
