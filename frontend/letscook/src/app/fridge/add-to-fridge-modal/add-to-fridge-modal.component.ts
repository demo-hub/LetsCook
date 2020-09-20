import { Ingredient } from '../model/ingredient';
import { FridgeService } from './../service/fridge.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-add-to-fridge-modal',
  templateUrl: './add-to-fridge-modal.component.html',
  styleUrls: ['./add-to-fridge-modal.component.scss']
})
export class AddToFridgeModalComponent implements OnInit {

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

  constructor(private modalService: NgbModal, private fridgeService: FridgeService) { }

  ngOnInit() {
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

}
