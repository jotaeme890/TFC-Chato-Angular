import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CategoryInfo } from 'src/app/core/interfaces/category-info';

@Component({
  selector: 'app-categories-info',
  templateUrl: './categories-info.component.html',
  styleUrls: ['./categories-info.component.scss'],
})
export class CategoriesInfoComponent  implements OnInit {

  isScreenSmall: boolean = false;
  @Input() categories: CategoryInfo[] | null | undefined;
  @Output() onTrashClicked: EventEmitter<CategoryInfo> = new EventEmitter<CategoryInfo>()
  @Output() onEditClicked: EventEmitter<string> = new EventEmitter<string>()


  constructor() {
    this.checkScreenSize(window.innerWidth);
   }

  ngOnInit() {}

  deleteCategory( category: CategoryInfo ) {
    this.onTrashClicked.emit(category)
  }

  editCategory() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(event.target.innerWidth);
  }

  private checkScreenSize(width: number) {
    this.isScreenSmall = width <= 700;
  }


}
