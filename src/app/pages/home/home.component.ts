import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import  Recipe from '../../constant/constant'
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isSlider: boolean = false;
  onam: Array<any> = [];
  effect: string = 'scrollx';
  array = [1, 2, 3, 4];
  toggle: boolean = false;

  @ViewChild('carousel') carousel!: NzCarouselComponent;
  @ViewChild('myModal', { static: false }) modal!: ElementRef;
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;

  constructor(private notification: NzNotificationService,private Router:Router) {}

  ngOnInit(): void {}


  onClick(data: string) {
    this.onam.length === 0
      ? Array.from({ length: 30 }).forEach((a, i) => {
          this.onam.push({ img: `menus/${i + 1}.jpg`,content:Recipe[i]['description'],title:Recipe[i]['title'] });
        })
      : [];
    this.isSlider = true;
    this.toggle = data === 'slider';
    this.open();
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isSlider = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isSlider = false;
  }

  prev(): void {
    this.carousel.pre();
  }

  next(): void {
    this.carousel.next();
  }

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
    const video = this.videoElement.nativeElement;
    video.currentTime = 0;
    video.pause()
  }

  redirect(){
    this.Router.navigate(['/Gm&chef']);
  }
}
