let pxScale = 1600;
let input = `
.roboto-large-header {
    font-size: 7.5vw;
    line-height: 3.9vw;
}

.roboto-header {
    font-size: 3.3vw;
    line-height: 3.9vw;
}

.roboto-small-header {
    font-size: 1.9vw;
    line-height: 2.1vw;
}

.roboto-large-body{
    font-size: 1.4vw;
    line-height: 1.65vw;
}

.roboto-body{
    font-size: 1.25vw;
    line-height: 1.7vw;
}

.roboto-small-body{
    font-size: 1.0vw;
    line-height: 1.4vw;
}

.nunito-body{
    font-size: 1.4vw;
    line-height: 2.29vw;
}

.frank-picture-header{
    font-size: 7.5vw;
    line-height: 8.6vw;
}

.frank-small-header{
    font-size: 4.44vw;
    line-height: 5.76vw;
}

.frank-numbers{
    font-size: 6.67vw;
    line-height: 8.61vw;
}

.frank-sources{
    font-size: 1.25vw;
    line-height: 1.6vw;
}
`

let iter = input

while(iter.match(/[0-9]*\.[0-9]*vw/)) {
    let match = iter.match(/[0-9]*\.[0-9]*vw/)[0]
    let num = parseFloat(match.match(/[0-9]*\.[0-9]*/)[0])
    iter = iter.replace(match, `${num * pxScale / 100}px`)
}

console.log(iter)