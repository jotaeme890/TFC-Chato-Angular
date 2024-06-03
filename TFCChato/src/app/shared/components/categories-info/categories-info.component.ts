import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CategoryInfo } from 'src/app/core/interfaces/category-info';

@Component({
  selector: 'app-categories-info',
  templateUrl: './categories-info.component.html',
  styleUrls: ['./categories-info.component.scss'],
})
export class CategoriesInfoComponent implements OnInit {
  isScreenSmall: boolean = false;

  /**
   * Represents the input property for passing category information to the component.
   **/
  @Input() categories: CategoryInfo[] | null | undefined;

  /**
   * Represents the output property for emitting events when the trash icon is clicked for a category.
   */
  @Output() onTrashClicked: EventEmitter<CategoryInfo> =
    new EventEmitter<CategoryInfo>();

  /**
   * Represents the output property for emitting events when the edit icon is clicked for a category.
   */
  @Output() onEditClicked: EventEmitter<CategoryInfo> =
    new EventEmitter<CategoryInfo>();

  /**
   * Constructs a component constructor function.
   * Initializes the component by checking the initial screen size.
   */
  constructor() {
    this.checkScreenSize(window.innerWidth);
  }

  ngOnInit() {}

  /**
   * Emits an event when the delete icon for a category is clicked.
   *
   * @param category CategoryInfo - the category to be deleted.
   */
  deleteCategory(category: CategoryInfo) {
    this.onTrashClicked.emit(category);
  }

  /**
   * Emits an event when the edit icon for a category is clicked.
   *
   * @param category CategoryInfo - the category to be edited.
   */
  editCategory(category: CategoryInfo) {
    this.onEditClicked.emit(category);
  }

  /**
   * Listens for window resize events and updates the screen size accordingly.
   *
   * @param event any - the resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(event.target.innerWidth);
  }

  /**
   * Checks the screen size and sets a boolean flag accordingly.
   *
   * @param width number - the width of the window.
   */
  private checkScreenSize(width: number) {
    this.isScreenSmall = width <= 700;
  }
}
