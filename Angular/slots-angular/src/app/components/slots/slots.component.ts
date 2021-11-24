
import { ImageSlotsComponent } from './../reusable/image-slots/image-slots.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpCallsService } from 'src/app/services/http-calls.service';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {
  @ViewChild('firstSlot') firstSlot: ImageSlotsComponent;
  @ViewChild('secondSlot') secondSlot: ImageSlotsComponent;
  @ViewChild('thirdSlot') thirdSlot: ImageSlotsComponent;

  firstNumber: number = 0;
  secondNumber: number = 0;
  thirdNumber: number = 0;
  credits:number = 0
  dataSource = [{ firstSlot: 1, secondSlot: 2, thirdSlot: 3 }];
  columnsToDisplay: Array<String> = ['firstSlot', 'secondSlot', 'thirdSlot'];
  slotDetailsArray = ['C','L','O','M'];
  serviceSubScription:Subscription;

  constructor(private httpService:HttpCallsService,
              private router:Router) { }

  ngOnInit(): void {
    this.serviceSubScription = this.httpService.getNewSession().subscribe((data:any)=>{
      this.credits = data.credits;
    },error=>{
      alert(error.error)
    })
  }

  randomizeSlots() {
    this.firstSlot.randomize();
    this.secondSlot.randomize();
    this.thirdSlot.randomize();
    this.getRollResults();
  }

  stopSlots() {

    setTimeout(() => { this.firstSlot.stopRandomize(); }, 1)
    setTimeout(() => { this.secondSlot.stopRandomize(); }, 300)
    setTimeout(() => { this.thirdSlot.stopRandomize(); }, 600)
    
  }
  
  getRollResults(){
    this.serviceSubScription = this.httpService.getSlotRolls().subscribe((data:any)=>{
      this.credits = data.credits;
      this.assignRoleResults(data.rollDetails);
    },(error) =>{alert(error.error);
                  this.stopSlots();
                  })
  }

  assignRoleResults(rollDetails){
    this.firstNumber = this.slotDetailsArray.findIndex((slot)=>slot==rollDetails.firstSlot);
    this.secondNumber = this.slotDetailsArray.findIndex((slot)=>slot==rollDetails.secondSlot);
    this.thirdNumber = this.slotDetailsArray.findIndex((slot)=>slot==rollDetails.thirdSlot);
    
    this.stopSlots();
    setTimeout(() => { this.checkForWinnings()}, 700);
  }
  checkForWinnings(){
    if(this.firstNumber==this.secondNumber&&this.firstNumber==this.thirdNumber){
      switch(this.firstNumber){
        case 0: alert('You won an additional 10 Credits. Congratulations');break;
        case 1: alert('You won an additional 20 Credits. Congratulations');break;
        case 2: alert('You won an additional 30 Credits. Congratulations');break;
        case 3: alert('You won an additional 40 Credits. Congratulations');break;
      }
    }
  }
  checkoutCredits(){
    this.router.navigate(['/checkout']);
  }
}
