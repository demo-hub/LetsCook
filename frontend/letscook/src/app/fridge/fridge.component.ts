import { FridgeService } from './service/fridge.service';
import { Component, OnInit } from '@angular/core';
import { Fridge, FridgeContent } from './model/fridge';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit {

  fridgeContent: FridgeContent[];

  constructor(private fridgeService: FridgeService) { }

  ngOnInit() {
    this.fridgeService.getAllFridgeContent()
    .subscribe(fridge => {
      this.fridgeContent = fridge;
    });
  }

}
