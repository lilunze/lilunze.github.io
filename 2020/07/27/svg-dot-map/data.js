var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var geomData = [];

new Promise(resolve => {
    let img = new Image();
    img.src = 'map.jpg';
    img.onload = () => {
        resolve(img);
    }
}).then(img => new Promise(resolve => {
    // draw img
    canvas.height = img.height;
    canvas.width = img.width;
    // console.log(img.width,img.height)
    canvas.style.width = `700px`;
    canvas.style.height = `600px`;
    ctx.drawImage(img, 0, 0);
    resolve(img);
}))
.then(img => {
    const gridWidth = 14
    // draw grid
    for(let x = 0; x * gridWidth < img.width; x++){
        geomData[x] = geomData[x] || [];
        for(let y = 0; y * gridWidth < img.height; y++){
            const imgData = ctx.getImageData(x * gridWidth, y * gridWidth, 1, 1).data;
            if (imgData[0] !== 255 || imgData[1] !== 255 || imgData[2] !== 255) {
                geomData[x].push(y);
                ctx.fillRect(x * gridWidth - gridWidth / 4, y * gridWidth - gridWidth / 4, gridWidth / 2, gridWidth / 2);
              };
        }
    }
    // document.getElementById('data').innerHTML = JSON.stringify(geomData);
})