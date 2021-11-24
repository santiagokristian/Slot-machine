import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'image-slots',
  templateUrl: './image-slots.component.html',
  styleUrls: ['./image-slots.component.css']
})
export class ImageSlotsComponent implements OnInit, AfterViewInit {
  @Input()selectedNumber:number;
  imagesList:Array<String> = ['assets/images/C.png','assets/images/L.png','assets/images/O.png','assets/images/M.png']
  selectedImage:String='assets/images/C.png';
  interval:any;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    this.selectedImage = this.imagesList[0];
  }

  randomize(){
    this.interval = setInterval(()=>{
      let random = Math.floor(Math.random()*4);
      this.selectedImage = this.imagesList[random];
    },100)
  }

  stopRandomize(){
    clearInterval(this.interval);
    this.selectedImage = this.imagesList[this.selectedNumber];
  }

}
