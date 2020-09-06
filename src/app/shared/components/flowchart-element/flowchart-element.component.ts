import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProgressTrackerService } from 'src/app/core/services/progress-tracker.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-flowchart-element',
  templateUrl: './flowchart-element.component.html',
  styleUrls: ['./flowchart-element.component.scss']
})
export class FlowchartElementComponent implements OnInit,OnDestroy {

  @Input() name: string
  @Input() img: string
  @Input() current: boolean

  public clipPercent: number
  private progressSub:Subscription

  constructor(private progress: ProgressTrackerService) { }

  ngOnInit(): void {
    this.progressSub = this.progress.progressReport.subscribe(report => {
      let decimalComplete = report[this.name] || 0
      this.clipPercent = 100 - decimalComplete * 100
    })
  }

  ngOnDestroy(): void {
    this.progressSub.unsubscribe()
  }

}
