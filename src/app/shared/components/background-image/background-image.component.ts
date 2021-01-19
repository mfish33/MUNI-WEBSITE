import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, HostListener } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.scss']
})
export class BackgroundImageComponent implements OnInit {

  constructor(
    private sanitizer:DomSanitizer
  ) { }

  public backgroundRatio:number
  public windowRatio:number
  @ViewChild('background') backgroundImage: ElementRef
  @Input() src: string
  @Input() centered:boolean
  public imgSrc:SafeUrl
  public offset = 0

  async ngOnInit(): Promise<void> {
    const imgRes = await fetch(this.src)
    const imgBlob = await imgRes.blob()
    const imgUrl = URL.createObjectURL(imgBlob)
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(imgUrl)
    const imgDims = await this.getPngDimensions(imgBlob)
    this.backgroundRatio = imgDims.width / imgDims.height
    this.onResize()
  }

  async getPngDimensions(pngBlob:Blob): Promise<{width:number, height:number}> {
    let dv = new DataView(await pngBlob.slice(16, 24).arrayBuffer()) 
    return{
      width: dv.getInt32(0),
      height: dv.getInt32(4)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowRatio = window.innerWidth / window.innerHeight
    if(this.centered && this.windowRatio < this.backgroundRatio) {
      let imgWidth = this.backgroundRatio * window.innerHeight
      this.offset = Math.round((imgWidth - window.innerWidth) / 2)
    } else {
      this.offset = 0
    }
  }

}
