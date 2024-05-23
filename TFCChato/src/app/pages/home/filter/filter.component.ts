import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent  implements OnInit {


  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController,
  ) { 
    this.form = this.formBuilder.group({
      category: [undefined],
      checked: [undefined],
      resolved: [undefined]
    });
  }

  ngOnInit() {}

  setFilters(){
    console.log(this.form.value);
  }

  resetFilters() {
    this.form.reset();
  }

}
