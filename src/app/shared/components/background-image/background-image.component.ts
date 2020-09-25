import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.scss']
})
export class BackgroundImageComponent implements OnInit {

  constructor() { }

  public backgroundRatio:number
  public windowRatio:number
  @ViewChild('background') backgroundImage: ElementRef
  @Input() src: string

  async ngOnInit(): Promise<void> {
    while(!this.resize()) {
      await new Promise(resolve => setTimeout(resolve,50))
    }
  }

  resize(): boolean {
    this.backgroundRatio = this.backgroundImage?.nativeElement?.naturalWidth / this.backgroundImage?.nativeElement?.naturalHeight
    if(isNaN(this.backgroundRatio)) {
      return false
    }
    this.windowRatio = window.innerWidth / window.innerHeight
    return true
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowRatio = window.innerWidth / window.innerHeight
  }

}
