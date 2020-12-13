import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'chartjs-plugin-annotation'
import * as chartjs from 'chart.js'
import labelPointPlugin from './labelPointPlugin'

@Component({
  selector: 'app-investing-widget',
  templateUrl: './investing-widget.component.html',
  styleUrls: ['./investing-widget.component.scss']
})
export class InvestingWidgetComponent implements OnInit,AfterViewInit {

  public input = {
    age: {
      self:this,
      _value:23,
      set value(value){
        this._value = value
        this.self.generateData()
      },
      get value() {
        return this._value
      },
      min:14,
      max:65
    },
    startingCapital: {
      self:this,
      _value:20000,
      set value(value){
        this._value = value
        this.self.generateData()
      },
      get value() {
        return this._value
      },
      min:0,
      max:200000
    },
    contribution: {
      // Multiplier is defaulted to bi-weekly
      _multiplier:'26',
      set multiplier(value){
        // Done in this way to make sure new multiplier is set before the value setter is called
        let oldMultiplier = this.multiplier
        this._multiplier = value
        this.value = Math.floor(this.value * parseInt(oldMultiplier) / parseInt(this.multiplier))  
      },
      get multiplier() {
        return this._multiplier
      },
      self:this,
      _value:3000,
      set value(value){
        this._value = value
        this.self.generateData()
      },
      get value() {
        return this._value
      },
      min:0,
      get max(){return 1000000 / parseInt(this.multiplier)}
    },
    expenses:{
      // Multiplier is defaulted to monthly
      _multiplier:'12',
      set multiplier(value){
        let oldMultiplier = this.multiplier
        this._multiplier = value
        this.value = Math.floor(this.value * parseInt(oldMultiplier) / parseInt(this.multiplier))
      },
      get multiplier() {
        return this._multiplier
      },
      self:this,
      _value:2700,
      set value(value){
        this._value = value
        this.self.generateData()
      },
      get value() {
        return this._value
      },
      min:0,
      get max(){
        return this.self.input.contribution.value * parseInt(this.self.input.contribution.multiplier) / parseInt(this.multiplier)
      }
    },
    timeHorizon:{
      self:this,
      _value:10,
      set value(value){
        this._value = value
        this.self.generateData()
      },
      get value() {
        return this._value
      },
      min:5,
      get max(){ 
        return 100 - this.self.input.age.value
      }
    },
    risk:{
      options:[
        {
          name:'Low Risk',
          value:.03,
          uncertainty:.01
        },
        {
          name:'Low-Medium Risk',
          value:.05,
          uncertainty:.015
        },
        {
          name:'Medium-High Risk',
          value:.08,
          uncertainty:.04
        },
        {
          name:'High Risk',
          value:.08,
          uncertainty:.5
        }
      ],
      self:this,
      _value:.08,
      set value(value){
        this._value = value
        this.self.generateData()
      },
      get value() {
        return this._value
      },
      uncertainty:.5
    }
  }

  constructor() { }

  @ViewChild('chart') chart:ElementRef
  data = {
    years:[],
    projected:[],
    upperBound:[],
    lowerBound:[]
  }
  chartjsChart:chartjs

  ngOnInit(): void {
    this.generateData()
  }

  ngAfterViewInit() {
    chartjs.plugins.register(labelPointPlugin)
    const ctx = this.chart.nativeElement.getContext('2d')
    this.chartjsChart =  new chartjs.Chart(ctx, {
      type: 'line',
      data: {
        labels:this.data.years,
        datasets: [{
            label: 'Projected',
            data: this.data.projected,
            fill:false,
            borderColor:"#5D5B5B",
            borderDash:[15, 5]
          },
          {
            label: 'Upper Bound',
            data: this.data.upperBound, 
            fill:false,
            borderColor:"green"

          },
          {
            label: 'Lower Bound',
            data: this.data.lowerBound,
            backgroundColor: '#6EE376',
            fill:'-1',
            borderColor:'green'
          }
        ]
      },
      options: {
        responsive:true,
        maintainAspectRatio: false,
          scales: {
              yAxes: [{
                scaleLabel:{
                  display:true,
                  labelString:'Investment value (Dollars)',
                  fontFamily:'Roboto',
                  fontSize:18,
                  fontColor:'black'
                },  
                ticks: {
                    beginAtZero: true,
                    callback : function(value:number,index,array) { return (value < 1000000) ? value > 1000 ? value/1000 + 'K' : value : value/1000000 + 'M'; } 
                }
              },
              {
                //If I want to try and get labels onm right side
                position:'right',
                scaleLabel:{
                  display:false,
                  labelString:' ',
                  fontFamily:'Roboto',
                  fontSize:18,
                  fontColor:'black'
                },  
                ticks: {
                    beginAtZero: true,
                    callback : function(value:number,index,array) { return ''} 
                }
              }],
              xAxes:[{
                scaleLabel:{
                  display:true,
                  labelString:'Age (Years)',
                  fontFamily:'Roboto',
                  fontSize:18,
                  fontColor:'black'
                },  
              }]
          },
          tooltips: {
            titleFontFamily:'Roboto',
            titleFontSize:14,
            bodyFontFamily:'Roboto',
            bodyFontSize:14,
            displayColors:false,
            callbacks: {
              label: function(tooltipItem, data) {
                let datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                return `${datasetLabel} = $${this.numberWithCommas(this.roundThousands(tooltipItem.yLabel))}`
              }.bind(this),
              title:function(tooltipItem, data) {
                return `Age: ${tooltipItem[0].xLabel}`
              }
            }
          },
          annotation:{
            annotations:[{
              type: 'line',
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: this.input.timeHorizon.value + this.input.age.value,
              borderWidth: 2,
              borderColor: '#0099FF',
              label:{
                enabled:true,
                content:'Time Horizon',
                position:'bottom',
                yAdjust:30,
                fontFamily:'Roboto',
                fontSize:14,
                yPadding:8
              }
            },
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.input.expenses.value * parseInt(this.input.expenses.multiplier) * 25,
              borderWidth: 2,
              borderColor: '#0099FF',
              label:{
                enabled:true,
                content:`Financial Freedom Number $${this.numberWithCommas(this.numberWithCommas(this.input.expenses.value * parseInt(this.input.expenses.multiplier) * 25))}`,
                position:'left',
                xAdjust:30,
                fontFamily:'Roboto',
                fontSize:14,
                yPadding:8,
              }
            }
          ]
          },
        legend:{
          display:false
        },
        plugins:{
          labelPoint:[{
            dataset:0,
            index:0,
            xOffset:80,
            yOffset:100,
            textYAdjust:5,
            textAlign:'center',
            color:'black',
            value:'Starting Capital'
          },
          {
            dataset:0,
            index:this.data.projected.length - 1,
            xOffset:-60,
            yOffset:-80,
            textYAdjust:5,
            textAlign:'right',
            color:'black',
            value:`Average: ${this.input.risk.value * 100}%`
          },
          {
            dataset:2,
            index:this.data.projected.length - 1,
            xOffset:-60,
            yOffset:-100,
            textYAdjust:5,
            textAlign:'right',
            color:'black',
            value:`Uncertainty: ±${this.input.risk.uncertainty * 100}%`
          }
        ]
        }
      },
      
    });
    
    
  }

  generateData() {
    // clear data
    this.data.years = []
    this.data.projected = []
    this.data.upperBound = []
    this.data.lowerBound = []

    const eqProjected = (x) => (this.data.projected[x-1]?.y ?? this.input.startingCapital.value) * (1 + this.input.risk.value) + (this.input.contribution.value * parseInt(this.input.contribution.multiplier) - this.input.expenses.value * parseInt(this.input.expenses.multiplier))
    const eqUpperBound = (x) => (this.data.projected[x-1]?.y ?? this.input.startingCapital.value) * (1 + this.input.risk.value + this.input.risk.uncertainty) + (this.input.contribution.value * parseInt(this.input.contribution.multiplier) - this.input.expenses.value * parseInt(this.input.expenses.multiplier))
    const eqLowerBound = (x) => (this.data.projected[x-1]?.y ?? this.input.startingCapital.value) * (1 + this.input.risk.value - this.input.risk.uncertainty) + (this.input.contribution.value * parseInt(this.input.contribution.multiplier) - this.input.expenses.value * parseInt(this.input.expenses.multiplier))
    let startingAge = this.input.age.value
    for(let year = startingAge; year < this.input.timeHorizon.value + 5 + startingAge; year++) {
      this.data.years.push(year)
      this.data.projected.push({
        x:year,
        y:eqProjected(year - startingAge)
      })
      this.data.upperBound.push({
        x:year,
        y:eqUpperBound(year - startingAge)
      })
      this.data.lowerBound.push({
        x:year,
        y:eqLowerBound(year - startingAge)
      })
    }

    if(!this.chartjsChart) {
      return
    }

    this.chartjsChart.data.datasets[0].data = (this.data.projected as chartjs.ChartPoint[])
    this.chartjsChart.data.datasets[1].data = (this.data.upperBound as chartjs.ChartPoint[])
    this.chartjsChart.data.datasets[2].data = (this.data.lowerBound as chartjs.ChartPoint[])
    // Time Horizon update
    // @ts-ignore
    this.chartjsChart.options.annotation.annotations[0].value = this.input.timeHorizon.value + this.input.age.value
    // Financial Freedom update
    let financialFreedomNumber = this.input.expenses.value * parseInt(this.input.expenses.multiplier) * 25
    //@ts-ignore
    this.chartjsChart.options.annotation.annotations[1].value = financialFreedomNumber
    //@ts-ignore
    this.chartjsChart.options.annotation.annotations[1].label.content = `Financial Freedom Number $${this.numberWithCommas(this.numberWithCommas(financialFreedomNumber))}`
    this.chartjsChart.data.labels = this.data.years

    // Update Point annotations
    this.chartjsChart.options.plugins.labelPoint[1].value = `Average ${this.input.risk.value * 100}%`
    this.chartjsChart.options.plugins.labelPoint[2].value = `Uncertainty ±${this.input.risk.uncertainty * 100}%`
    this.chartjsChart.options.plugins.labelPoint[1].index = this.data.projected.length - 1
    this.chartjsChart.options.plugins.labelPoint[2].index = this.data.projected.length - 1
    this.chartjsChart.update()
  }

  makeHeading() {
    let lower = this.data.lowerBound[this.input.timeHorizon.value]?.y
    let upper = this.data.upperBound[this.input.timeHorizon.value]?.y
    return `$${this.numberWithCommas(this.roundThousands(lower))} - $${this.numberWithCommas(this.roundThousands(upper))}`
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  roundThousands(x) {
    return Math.round(x / 1000) * 1000
  }

}
