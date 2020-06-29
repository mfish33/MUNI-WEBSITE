import { Component, Input, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import simpleParallax from 'simple-parallax-js';


@Component({
  selector: 'app-parallax-title',
  templateUrl: './parallax-title.component.html',
  styleUrls: ['./parallax-title.component.scss']
})
export class ParallaxTitleComponent implements AfterViewInit {

  @Input() imgUrl: string
  @Input() title: string

  @ViewChild('titleImg') titleImg: ElementRef

  private blurMax = 8
  private imgHeightOffset = .5
  public blur = this.blurMax
  public titleOpacity = 100

  constructor() { }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    let scrollHeight = window.pageYOffset
    let imgHeight = this.titleImg.nativeElement.offsetHeight
    let effectiveImageHeight = imgHeight - this.imgHeightOffset * imgHeight
    this.blur = this.blurMax - this.blurMax * scrollHeight / effectiveImageHeight
    this.titleOpacity = 100 - 100 * scrollHeight / effectiveImageHeight
  }

  ngAfterViewInit() {
    new simpleParallax(this.titleImg.nativeElement, { scale: 1.4 })
  }

}
