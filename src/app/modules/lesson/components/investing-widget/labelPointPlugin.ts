const labelPointPlugin = {
    getLineStartPosition: function (chart, point) {
        const meta = chart.getDatasetMeta(point.dataset); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        return [data[point.index]._model.x,data[point.index]._model.y];
    },
    addLabel: function (chartInstance, point) {
        const lineStart = this.getLineStartPosition(chartInstance, point);
        let yOffset = point.yOffset
        if(lineStart[1] < 100) {
            yOffset = 2 * point.yOffset
        }
        const context = chartInstance.chart.ctx;
  
        // render vertical line
        context.beginPath();
        context.strokeStyle = point.color;
        context.lineWidth = 2
        context.moveTo(lineStart[0], lineStart[1]);
        context.lineTo(point.xOffset + lineStart[0], - yOffset + lineStart[1]);
        context.stroke();
  
        // write label
        context.fillStyle = point.color;
        context.textAlign = point.textAlign;
        context.font = `18px Roboto`
        context.fillText(point.value, point.xOffset + lineStart[0], -yOffset + lineStart[1] - point.textYAdjust);

        let width = context.measureText(point.value).width;


        let underLineX = point.xOffset + lineStart[0]
        switch(point.textAlign){
            case "center":
                underLineX -= (width/2); 
                break;
            case "right":
                underLineX -= width; 
                break;
          }

        context.beginPath();
        context.strokeStyle = point.color;
        context.lineWidth = 2;
        context.moveTo(underLineX, - yOffset + lineStart[1]);
        context.lineTo(underLineX + width, -yOffset + lineStart[1]);
        context.stroke();
    },
  
    afterDatasetsDraw: function (chart, easing) {
        if (chart.config.options.plugins.labelPoint) {
            chart.config.options.plugins.labelPoint.forEach(point => this.addLabel(chart, point));
        }
    },
};

export default labelPointPlugin