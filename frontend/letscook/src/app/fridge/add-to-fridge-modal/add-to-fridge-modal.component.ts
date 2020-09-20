import { Ingredient } from '../model/ingredient';
import { FridgeService } from './../service/fridge.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-to-fridge-modal',
  templateUrl: './add-to-fridge-modal.component.html',
  styleUrls: ['./add-to-fridge-modal.component.scss']
})
export class AddToFridgeModalComponent implements OnInit {

  addForm: FormGroup;

  closeResult = '';

  keyword = 'name';

  ingredients: Ingredient[];

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.ingredients.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).map(i => i.name).slice(0, 10))
    )

  constructor(private modalService: NgbModal,
              private fridgeService: FridgeService,
              private fb: FormBuilder,
              private config: NgbTypeaheadConfig) {
                config.showHint = true;
              }

  ngOnInit() {

    this.addForm = this.fb.group({
      ingredient: ['', Validators.required],
      quant: [1, Validators.required]
    });

    this.fridgeService.getAllIngredients()
    .subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addToFridge() {
    if (this.addForm.valid) {

      this.addForm.patchValue({
        ingredient: this.ingredients.find(i => i.name === this.addForm.controls.ingredient.value).id
      });

      this.fridgeService.add(this.addForm.value)
      .subscribe(result => {
        this.addForm.reset();
      });
    }
  }

}
