import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonPopover, IonInput } from '@ionic/angular';
import { CategoriesService } from 'src/app/core/services/api/categories.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

export const CATEGORY_SELECTABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CategorySelectableComponent),
  multi: true
};

@Component({
  selector: 'app-category-selectable',
  templateUrl: './category-selectable.component.html',
  styleUrls: ['./category-selectable.component.scss'],
  providers: [
    CATEGORY_SELECTABLE_VALUE_ACCESSOR
  ],
})
export class CategorySelectableComponent  implements OnInit {

  categorySelected: any | undefined;
  disabled:boolean = true;
  categories: any[] = [];

  @Input() set city(_city: any | null) {
  }

  propagateChange = (obj: any) => {}

  constructor(
    public categoryService: CategoriesService,
    public firebase: FirebaseService
  ) { 
  }
  
  async onLoadCategories() {
    try {
      this.firebase.categories$.subscribe({
        next: categories => {
          this.categories = categories
        }
      })
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  private async selectCategory(id:string|undefined, propagate:boolean=false){
    if(id){
      await this.categoryService.getCategory(id).then(category => {
        this.categorySelected = category
      });
    }
    else
      this.categorySelected = undefined;
    if(propagate){
      this.propagateChange(this.categorySelected.data.name);
    }
  }
  
  writeValue(obj: any): void {
    if(obj){
      this.selectCategory(obj.name);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  private async filter(value:string){
  }

  onFilter(evt:any){
    this.filter(evt.detail.value);
  }

  onCityClicked(popover:IonPopover, category:any){
    this.selectCategory(category.uuid,true);
    popover.dismiss();
  }

  clearSearch(input:IonInput){
    input.value = "";
    this.filter("");
  }

  deselect(popover:IonPopover|null=null){
    this.selectCategory(undefined, true);
    if(popover)
      popover.dismiss();
  }


}
