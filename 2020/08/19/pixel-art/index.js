// grid width
let gridWidth = 1;
let flag = true;
$('#buttons button').click(function(e) {
    if(flag){
        flag = false;
        draw($(e.target).data('event'))
    }
})

const func = {
    // 原始
    origin: (R, G, B) => {
        return `rgb(${R}, ${G}, ${B})`;
    },
    // 浮雕
    reliefTransfer: (R1, G1, B1, R2, G2, B2) => {
        const r = (R1 - R2 + 128) * 0.3;
        const g = (G1 - G2 + 128) * 0.59;
        const b = (B1 - B2 + 128) * 0.11;
        return `rgb(${r}, ${g}, ${b})`;
    },
    // 马赛克
    mosaicTransfer: (R, G, B) => {
        gridWidth = 6;
        return `rgb(${R}, ${G}, ${B})`;
    },
    // 怀旧滤镜
    nostalgicTransfer: (R, G, B) => {
        let r = (0.393 * R + 0.769 * G + 0.189 * B);
        let g = (0.349 * R + 0.686 * G + 0.168 * B);
        var b = (0.272 * R + 0.534 * G + 0.131 * B);
        r = r < 0 ? 0 : r > 255 ? 255 : r;
        g = g < 0 ? 0 : g > 255 ? 255 : g;
        b = b < 0 ? 0 : b > 255 ? 255 : b;
        return `rgb(${r}, ${g}, ${b})`;
    },
    // 熔铸滤镜
    castingTransfer: (R, G, B) => {
        let r = R * 128 / (G + B + 1);
        let g = G * 128 / (R + B + 1);
        let b = B * 128 / (G + R + 1);
        r = r < 0 ? 0 : r > 255 ? 255 : r;
        g = g < 0 ? 0 : g > 255 ? 255 : g;
        b = b < 0 ? 0 : b > 255 ? 255 : b;
        return `rgb(${r}, ${g}, ${b})`
    },
    // 连环画滤镜
    colorTransfer: (R, G, B) => {
        const r = Math.abs(G - B + G + R) * R / 256;
        const g = Math.abs(B - G + B + R) * R / 256;
        const b = Math.abs(B - G + B + R) * G / 256;
        return `rgb(${r}, ${g}, ${b})`
    },
    // 冰冻滤镜
    frozenTransfer: (R, G, B) => {
        let r = (R - G - B) * 3 / 2;
        let g = (G - R - B) * 3 / 2;
        let b = (B - G - R) * 3 / 2;
        r = r < 0 ? 0 : r > 255 ? 255 : r;
        g = g < 0 ? 0 : g > 255 ? 255 : g;
        b = b < 0 ? 0 : b > 255 ? 255 : b;
        return `rgb(${r}, ${g}, ${b})`
    },
    // 灰度转换
    grayTransfer: (R, G, B) => {
        // 加权平均
        const c = 0.3 * R + 0.59 * G + 0.11 * B
        return `rgb(${c}, ${c}, ${c})`
    },
    // 黑白转换
    bwTransfer: (R, G, B) => {
        const avg = (R + G + B) / 3;
        const c = avg >= 100 ? 255 : 0;
        return `rgb(${c}, ${c}, ${c})`
    },
    // 底片
    reverse: (R, G, B) => {
        const r = 255 - R;
        const g = 255 - G;
        const b = 255 - B
        return `rgb(${r}, ${g}, ${b})`
    },
    // 去色滤镜
    colorRemove: (R, G, B) => {
        // 最值平均值
        const avg = Math.floor((Math.min(R, G, B) + Math.max(R, G, B)) / 2 );
        return `rgb(${avg}, ${avg}, ${avg})`
    },
    // 褐色转换
    brownTransfer: (R, G, B) => {
        const r = R * 0.393 + G * 0.769 + B * 0.189;
        const g = R * 0.349 + G * 0.686 + B * 0.168;
        const b = R * 0.272 + G * 0.534 + B * 0.131;
        return `rgb(${r}, ${g}, ${b})`
    },
    // 亮度增强
    brightTransfer: (R, G, B) => {
        const degree = 30;
        let r = R + degree;
        let g = G + degree;
        let b = B + degree;
        r = r < 0 ? 0 : r > 255 ? 255 : r;
        g = g < 0 ? 0 : g > 255 ? 255 : g;
        b = b < 0 ? 0 : b > 255 ? 255 : b;
        return `rgb(${r}, ${g}, ${b})`
    },
    // 对比度增强
    contrastTransfer: (R, G, B) => {
        const degree = 40;
        let contrast = (100 + degree) / 100;
        contrast *= contrast;
        let r = parseInt(((R / 255 - 0.5) * contrast + 0.5) * 255);
        let g = parseInt(((G / 255 - 0.5) * contrast + 0.5) * 255);
        let b = parseInt(((B / 255 - 0.5) * contrast + 0.5) * 255);
        r = r < 0 ? 0 : r > 255 ? 255 : r;
        g = g < 0 ? 0 : g > 255 ? 255 : g;
        b = b < 0 ? 0 : b > 255 ? 255 : b;
        return `rgb(${r}, ${g}, ${b})`
    },
    // LEMO
    lemoTransfer: (R, G, B) => {
        const mixPixel = 10
        let r = mixPixel > 128 ? (R + (mixPixel + mixPixel - 255) * ((Math.Sqrt(R / 255)) * 255 - R) / 255) : (R + (mixPixel + mixPixel - 255) * (R - R * R / 255) / 255);
        r = r < 0 ? 0 : r > 255 ? 255 : r;
        r = (mixPixel + r) - mixPixel * r / 128;
        r = r < 0 ? 0 : r > 255 ? 255 : r;

        let g = mixPixel > 128 ? (G + (mixPixel + mixPixel - 255) * ((Math.Sqrt(G / 255)) * 255 - G) / 255) : (G + (mixPixel + mixPixel - 255) * (G - G * G / 255) / 255);
        g = g < 0 ? 0 : g > 255 ? 255 : g;
        g = (mixPixel + g) - mixPixel * g / 128;
        g = g < 0 ? 0 : g > 255 ? 255 : g;

        let b = mixPixel > 128 ? (B + (mixPixel + mixPixel - 255) * ((Math.Sqrt(B / 255)) * 255 - B) / 255) : (B + (mixPixel + mixPixel - 255) * (B - B * B / 255) / 255);
        b = b < 0 ? 0 : b > 255 ? 255 : b;
        b = (mixPixel + b) - mixPixel * b / 128;
        b = b < 0 ? 0 : b > 255 ? 255 : b;

        return `rgb(${r}, ${g}, ${b})`
    } 
}

function draw(type) {
    $('#canvas-container').empty();
    $('#loading').show()
    gridWidth = 1;
    let canvasN = document.createElement('canvas');
    let canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d');
    let ctxN = canvasN.getContext('2d');

    new Promise(resolve => {
        let img = new Image();
        img.src = './landscape.jpg';
        img.onload = () => { resolve(img) };
    })
    .then(img => new Promise(resolve => {
        // draw img
        canvas.height = canvasN.height = img.height;
        canvas.width = canvasN.width = img.width;
        ctx.drawImage(img, 0, 0);
        resolve(img);
    }))
    .then(img => {
        // draw grid
        for(let x = 0; x * gridWidth < img.width; x++){
            for(let y = 0; y * gridWidth < img.height; y++){
                const preData = ctx.getImageData((x-1) * gridWidth, (y-1) * gridWidth, 1, 1).data;
                const imgData = ctx.getImageData(x * gridWidth, y * gridWidth, 1, 1).data;
                // 执行对应颜色算法
                if(type == "reliefTransfer"){
                    const color = func[type](imgData[0], imgData[1], imgData[2], preData[0], preData[1], preData[2])
                    ctxN.fillStyle = color;
                }else{
                    const color = func[type](imgData[0], imgData[1], imgData[2])
                    ctxN.fillStyle = color;
                }
                ctxN.fillRect(x * gridWidth - gridWidth / 2, y * gridWidth - gridWidth / 2, gridWidth, gridWidth);
            }
        }
        $('#loading').hide()
        document.querySelector('#canvas-container').appendChild(canvasN)
        flag = true;
    })
}

draw('origin')






