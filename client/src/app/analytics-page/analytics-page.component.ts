import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage} from "../shared/interfaces";
import {Chart} from "chart.js"
import {Subscription} from "rxjs";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  aSub: Subscription
  average: number
  pending = true

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Revenue',
      color: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.4)'
    }

    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.4)'
    }

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.pending = false

      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig .data = data.chart.map(item => item.order)

      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'
      orderCtx.canvas.height = '300px'

      new Chart(gainCtx, createChartConfig(gainConfig))
      new Chart(orderCtx, createChartConfig(orderConfig))

      this.average = data.average
    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}

function createChartConfig({labels, data, label, color, backgroundColor}) {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: true,
          backgroundColor
        }
      ]
    }
  }
}
