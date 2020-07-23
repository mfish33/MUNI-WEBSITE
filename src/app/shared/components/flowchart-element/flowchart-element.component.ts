import { Component, OnInit, Input } from '@angular/core';
import { ProgressTrackerService } from 'src/app/core/services/progress-tracker.service';


@Component({
  selector: 'app-flowchart-element',
  templateUrl: './flowchart-element.component.html',
  styleUrls: ['./flowchart-element.component.scss']
})
export class FlowchartElementComponent implements OnInit {

  @Input() name: string
  @Input() img: string
  @Input() current: boolean

  public clipPercent: number

  constructor(private progress: ProgressTrackerService) { }

  ngOnInit(): void {
    let decimalComplete = this.progress.progressReport()[this.name] || 0
    this.clipPercent = 100 - decimalComplete * 100
  }

}
