import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent  implements OnInit {

  private _item:any|undefined;
  
  @Input('item') set item(_item:any|undefined){
    this._item = _item;
  }

  @Output('clicked') clicked = new EventEmitter();

  get item():any|undefined{
    return this._item;
  }

  constructor() { }

  ngOnInit() {}

  onUserClicked(){
    this.clicked.emit(this._item);
  }

}
