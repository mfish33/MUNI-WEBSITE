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
      _value:900,
      set value(value){
        this._value = value
        this.self.generateData()
      },
      get value() {
        return this._value
      },
      min:0,
      get max(){return 200000 / parseInt(this.multiplier)}
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
        return this.self.input.contribution.value * parseInt(this.self.input.contribution.multiplier) / parseInt(this.multiplier) * 15
      }
    },
    timeHorizon:{
      self:this,
      _value:15,
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
          formalName:'Passive Short Term',
          description:'This strategy can work for people that have expensive short term goals. Typically this means using your savings within the next 5 years.',
          value:.0075,
          uncertainty:.0025
        },
        {
          name:'Low-Medium Risk',
          formalName:'Passive Long Term: Dividends',
          description:'This strategy is useful for people that are looking for a source of consistent income (whether to reinvest and grow assets faster or withdrawal to live off).',
          value:.075,
          uncertainty:.025
        },
        {
          name:'Medium Risk',
          formalName:'Passive Long Term: Funds',
          description:'This strategy tends to work for people with a “set it and forget it” mentality. You could be in this bucket if you are satisfied with your current job/industry and can see yourself working in it for many years before retiring.',
          value:.08,
          uncertainty:.04
        },
        {
          name:'High Risk',
          formalName:'Active Short Term',
          description:'Active short term investing typically means that you are actively trading in the stock market. Examples of this strategy include day trading and swing trading. These methods require buying and selling stocks within the day or a few days.',
          value:.1,
          uncertainty:.2
        }
      ],
      self:this,
      get value() {
        return this.options[this.activePlanIndex].value
      },
      get uncertainty(){
        return this.options[this.activePlanIndex].uncertainty
      },
      _activePlanIndex:2,
      get activePlanIndex(){
        return this._activePlanIndex
      },
      set activePlanIndex(value) {
        this._activePlanIndex = value
        this.self.generateData()
      },
      get activePlan() {
        return this.options[this.activePlanIndex]
      }
    }
  }
  public toolTipToggle = ''

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
            borderColor:"#427AA1"

          },
          {
            label: 'Lower Bound',
            data: this.data.lowerBound,
            backgroundColor: '#6EA0C4',
            fill:'-1',
            borderColor:'#427AA1'
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
                  labelString:'Investment Value (Dollars)',
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
              borderColor: 'black',
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
              borderColor: 'black',
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
          }]
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

    const eqProjected = (x) => this.data.projected[x-1] ? this.data.projected[x-1].y * (1 + this.input.risk.value) + (this.input.contribution.value * parseInt(this.input.contribution.multiplier)) : this.input.startingCapital.value
    const eqUpperBound = (x) => this.data.upperBound[x-1] ? this.data.upperBound[x-1].y * (1 + this.input.risk.value + this.input.risk.uncertainty) + (this.input.contribution.value * parseInt(this.input.contribution.multiplier)) : this.input.startingCapital.value
    const eqLowerBound = (x) => this.data.lowerBound[x-1] ? this.data.lowerBound[x-1].y * (1 + this.input.risk.value - this.input.risk.uncertainty) + (this.input.contribution.value * parseInt(this.input.contribution.multiplier)) : this.input.startingCapital.value
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
