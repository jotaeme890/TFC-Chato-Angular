import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-user',
  templateUrl: './item-user.component.html',
  styleUrls: ['./item-user.component.scss'],
})
export class ItemUserComponent implements OnInit {
  private _item: any | undefined;

  /**
   * Input property to set the item data.
   *
   * @param _item - The item data to be set.
   */
  @Input('item') set item(_item: any | undefined) {
    this._item = _item;
  }

  /**
   * Output property to emit a click event.
   */
  @Output('clicked') clicked = new EventEmitter();

  /**
   * Getter method to retrieve the item data.
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
