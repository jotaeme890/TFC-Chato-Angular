import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss'],
})
export class ItemCategoryComponent implements OnInit {
  private _item: any | undefined;

  /**
   * Setter method for setting the item data.
   *
   * @param _item - The item data to be set.
   */
  @Input('item') set item(_item: any | undefined) {
    this._item = _item;
  }

  /**
   * Output property for emitting a click event.
   */
  @Output('clicked') clicked = new EventEmitter();

  /**
   * Getter method for retrieving the item data.
   *
   * @returns The item data.
   */
  get item(): any | undefined {
    return this._item;
  }

  constructor() {}

  ngOnInit() {}

  /**
   * Event handler for when the user clicks on the item.
   * Emits a click event with the item data.
   */
  onUserClicked() {
    this.clicked.emit(this._item);
  }
}
