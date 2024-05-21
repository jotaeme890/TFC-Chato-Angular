import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryInfo } from 'src/app/core/interfaces/category-info';

@Component({
  selector: 'app-categories-info',
  templateUrl: './categories-info.component.html',
  styleUrls: ['./categories-info.component.scss'],
})
export class CategoriesInfoComponent  implements OnInit {

  @Input() categories: CategoryInfo[] | null | undefined;
  @Output() onTrashClicked: EventEmitter<{uuid: string, name: string}> = new EventEmitter<{uuid: string, name: string}>()
  @Output() onEditClicked: EventEmitter<string> = new EventEmitter<string>()


  constructor() { }

  ngOnInit() {}
  openModal(){

  }

  deleteCategory( categoryId: string | undefined, categoryName: string ) {
    if(categoryId)
      this.onTrashClicked.emit({uuid:categoryId, name: categoryName})
  }

}
