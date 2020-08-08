const gridWidth = 14
let draw = SVG().addTo('.map').size('704px',"600px").attr({
    viewBox: "0 0 1240 1100",
    preserveAspectRatio: "xMidYMid meet"
});
let data;

// 标记点
const eventPoint = [
    {
        name: "上海",
        coordinate: [121.3,31]
    },
    {
        name: "三亚",
        coordinate: [109,18.43]
    },
    {
        name: "武汉",
        coordinate: [114,30.56]
    },
    {
        name: "深圳",
        coordinate: [114,22.5]
    },
    {
        name: "台州",
        coordinate: [121.2,28.6]
    },
    {
        name: "温州",
        coordinate: [120.5,28]
    },
    {
        name: "合肥",
        coordinate: [117,31.7]
    },
    {
        name: "南京",
        coordinate: [118.8,32]
    },
    {
        name: "湖州",
        coordinate: [120,30.8]
    },
    {
        name: "常熟",
        coordinate: [120.7,31.6]
    },
    {
        name: "宜昌",
        coordinate: [111.26,30.55]
    },
]

window.onload = () => {
    let path = "geo.json";
    let xhr = new XMLHttpRequest();
    xhr.open('get',path);
    xhr.send(null);
    xhr.onload = () => {
        if(xhr.status == 200){
            data = JSON.parse(xhr.responseText);
            drawMap(data);
            eventPoint.map(v => {
                v.coordinate = converCoordinate(v.coordinate)
            })
            eventMap();
        }
    }
}

// 将经纬度坐标转换成像素坐标
function converCoordinate(coordinate){
    let x = parseInt((coordinate[0] - 74) * 1.565)
    let y = parseInt((54 - coordinate[1]) * 2);
    return [x, y];
}

// 绘制地图
function drawMap(geo) {
    geo.map((arr,x) => {
        if(arr.length){
            arr.map(y => {
                drawRect(x,y)
            })
        }
    })
}

function eventMap(){
    eventPoint.map(v => {
        drawEvent(v.coordinate[0],v.coordinate[1],v.name)
    })
}

// 绘制矩形像素点
function drawRect(x,y){
    let rect = draw.rect(6,6).attr({fill:"#87bce1",x:x * gridWidth - 3, y: y * gridWidth - 3 })
    rect.on('mouseover',function(e){
        this.fill({ color: 'rgb(43, 188, 138)' });
        this.animate().attr({
            width: 6 + 2,
            height: 6 + 2,
            x: x * gridWidth - 3 - 1, 
            y: y * gridWidth - 3 - 1
        })
        
    })
    rect.on('mouseout',function(){
        this.fill({ color: '#87bce1'})
        this.animate().attr({
            width: 6,
            height: 6,
            x: x * gridWidth - 3, 
            y: y * gridWidth - 3
        })
    })
    rect.on('click',function(){
        console.log(x,y)
    })
}

// 绘制圆形像素点
function drawEvent(x,y,name){
    let circle = draw.circle(10).attr({
        cx: x * gridWidth,
        cy: y * gridWidth,
        fill: '#fff'
    })
    let circle_wave = draw.circle(10).attr({ cx: x * gridWidth, cy: y * gridWidth }).fill('none').stroke({ width: 1.5, color: "rgba(255,255,255,0.6)" }).animate({
        duration: 2000
    }).loop().attr({ r: 20 })
    let text = draw.text(name).attr({
        x: x * gridWidth, 
        y: y * gridWidth,
        fill: "#fff"
    }).css({ "display":"none"})
    circle.on('mouseover',function(e){
        this.animate().fill({ color: "rgb(43, 188, 138)"})
        text.css({ "display":"block"})
    })
    circle.on('mouseout',function(){
        this.animate().fill("#fff")
        text.css({ "display":"none"})
    })
}