// const canvas = document.getElementById("game");
// const ctx = canvas.getContext("2d");

// let scene = "map";
// let time = 0;

// // ===== 图片 =====
// const mapImg = new Image();
// mapImg.src = "map.png";

// const springImg = new Image();
// springImg.src = "spring.png";

// const summerImg = new Image();
// summerImg.src = "summer.png";

// const autumnImg = new Image();
// autumnImg.src = "autumn.png";

// const winterImg = new Image();
// winterImg.src = "winter.png";


// // ===== 春 =====
// const springPolygon = [
// [10,39],[27,20],[81,0],[135,8],[158,13],[177,17],[206,8],[228,14],[239,14],[259,14],[280,25],[300,20],[340,38],[366,28],[383,24],[418,13],[439,9],[470,14],[491,10],[511,12],[535,15],[559,24],[582,30],
// [576,49],[552,63],[531,78],[519,109],[504,132],[497,135],[490,146],[486,154],[489,165],[480,179],[474,185],[485,198],[488,214],[486,220],[476,228],[469,246],[473,254],[476,270],[470,278],[464,284],[458,296],[458,302],
// [485,315],[501,321],[513,326],[521,340],[526,353],[529,363],[521,370],[505,358],[484,355],[468,358],[450,361],[425,361],[397,360],[373,354],[351,344],[319,338],[296,326],[257,326],[242,323],[219,332],[202,332],
// [172,324],[153,324],[122,328],[92,331],[69,335],[47,345],[20,351],[1,347],[0,45]
// ];

// // ===== 夏 =====
// const summerPolygon = [
// [578,26],[563,52],[544,66],[527,84],[517,118],[498,138],[483,151],[484,171],[473,185],[482,204],[483,216],[471,230],[470,240],[475,259],[467,278],[458,301],[467,306],[477,308],[505,319],[513,336],
// [525,347],[533,363],[550,360],[577,360],[603,364],[622,354],[642,346],[666,344],[682,346],[704,350],[722,360],[745,363],[772,371],[799,368],[821,371],[845,380],[865,387],[891,393],[912,405],[930,415],
// [957,415],[988,420],[996,402],[992,393],[995,381],[996,99],[978,83],[963,79],[948,84],[931,87],[914,82],[887,69],[876,57],[867,42],[853,32],[844,34],[836,36],[818,28],[803,24],[791,24],
// [766,18],[749,18],[739,23],[723,23],[710,14],[702,14],[679,15],[653,15],[626,17],[600,18],[578,20]
// ];

// // ===== 冬 =====
// const winterPolygon = [
// [553,358],[598,361],[631,353],[662,340],[687,342],[703,347],[720,354],[735,361],[749,364],[771,367],[784,368],[802,367],[817,364],[831,373],[850,382],[879,389],[898,397],[926,411],[949,414],[977,424],
// [991,444],[995,451],[994,534],[996,551],[994,567],[991,579],[994,588],[989,602],[980,610],[976,620],[979,638],[976,652],[958,662],[933,668],[919,672],[903,681],[886,687],[872,689],[861,691],[857,693],
// [835,695],[820,693],[800,686],[779,681],[760,679],[736,679],[714,684],[694,686],[674,685],[654,689],[639,691],[628,693],[608,693],[587,694],[571,692],[558,690],[542,690],[525,683],[512,682],[489,677],
// [478,677],[466,681],[445,681],[424,672],[432,660],[445,650],[460,640],[468,622],[476,602],[479,587],[473,570],[477,556],[488,544],[491,539],[491,531],[496,515],[502,494],[491,468],[510,446],[519,425],
// [534,395],[532,382],[539,366],[545,358]
// ];

// // ===== 秋=====
// const autumnPolygon = [
// [2,350],[15,352],[42,345],[66,334],[92,331],[118,327],[142,323],[162,324],[193,330],[218,330],[240,323],[261,325],[286,325],[310,330],[346,342],[367,356],[393,363],[414,360],[449,363],[483,358],
// [506,366],[526,377],[529,395],[515,430],[513,443],[489,462],[497,483],[492,524],[489,543],[469,565],[473,590],[464,615],[456,633],[438,645],[418,658],[404,649],[391,684],[371,680],[344,683],[317,680],
// [306,670],[283,672],[267,683],[242,682],[222,673],[195,673],[170,684],[157,674],[152,664],[150,581],[23,579],[20,619],[6,598],[1,550],[0,350]
// ];

// // ===== hover状态 =====
// let hSpring=false,hSummer=false,hAutumn=false,hWinter=false;

// // ===== 多边形检测 =====
// function pointInPolygon(x, y, polygon) {
//     let inside = false;
//     for (let i=0,j=polygon.length-1;i<polygon.length;j=i++) {
//         let xi=polygon[i][0], yi=polygon[i][1];
//         let xj=polygon[j][0], yj=polygon[j][1];

//         let intersect = ((yi>y)!=(yj>y)) &&
//             (x<(xj-xi)*(y-yi)/(yj-yi)+xi);

//         if (intersect) inside=!inside;
//     }
//     return inside;
// }

// // ===== 鼠标移动 =====
// canvas.onmousemove = function(e){
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     if(scene==="map"){
//         hSpring = pointInPolygon(x,y,springPolygon);
//         hSummer = pointInPolygon(x,y,summerPolygon);
//         hAutumn = pointInPolygon(x,y,autumnPolygon);
//         hWinter = pointInPolygon(x,y,winterPolygon);

//         canvas.style.cursor = (hSpring||hSummer||hAutumn||hWinter)?"pointer":"default";
//     }
// };

// // ===== 点击 =====
// canvas.onclick = function(){
//     if(scene==="map"){
//         if(hSpring) scene="spring";
//         else if(hSummer) scene="summer";
//         else if(hAutumn) scene="autumn";
//         else if(hWinter) scene="winter";
//     } else {
//         scene="map";
//     }
// };

// // ===== 画多边形 =====
// function drawPolygon(p){
//     ctx.beginPath();
//     p.forEach((pt,i)=>{
//         if(i===0) ctx.moveTo(pt[0],pt[1]);
//         else ctx.lineTo(pt[0],pt[1]);
//     });
//     ctx.closePath();
// }

// // ===== 发光效果 =====
// function glow(p,color){
//     let g=(Math.sin(time)+1)/2;

//     ctx.fillStyle=`${color.replace("1)",`${0.2+g*0.2})`)}`;
//     drawPolygon(p);
//     ctx.fill();

//     ctx.shadowColor=color;
//     ctx.shadowBlur=40+g*20;
//     ctx.strokeStyle=color.replace("1)","0.3)");
//     ctx.lineWidth=12;
//     drawPolygon(p);
//     ctx.stroke();

//     ctx.shadowBlur=20;
//     ctx.strokeStyle=color.replace("1)","0.7)");
//     ctx.lineWidth=6;
//     drawPolygon(p);
//     ctx.stroke();

//     ctx.shadowBlur=5;
//     ctx.strokeStyle=color;
//     ctx.lineWidth=3;
//     drawPolygon(p);
//     ctx.stroke();

//     ctx.shadowBlur=0;
// }

// // ===== 渲染 =====
// function draw(){
//     ctx.clearRect(0,0,1000,700);
//     time+=0.05;

//     if(scene==="map"){
//         if(mapImg.complete)
//             ctx.drawImage(mapImg,0,0,1000,700);

//         if(hSpring) glow(springPolygon,"rgba(255,215,0,1)");
//         if(hSummer) glow(summerPolygon,"rgba(255,180,0,1)");
//         if(hAutumn) glow(autumnPolygon,"rgba(255,100,0,1)");
//         if(hWinter) glow(winterPolygon,"rgba(150,200,255,1)");
//     }

//     else if(scene==="spring") ctx.drawImage(springImg,0,0,1000,700);
//     else if(scene==="summer") ctx.drawImage(summerImg,0,0,1000,700);
//     else if(scene==="autumn") ctx.drawImage(autumnImg,0,0,1000,700);
//     else if(scene==="winter") ctx.drawImage(winterImg,0,0,1000,700);

//     if(scene!=="map"){
//         ctx.fillStyle="white";
//         ctx.font="24px Arial";
//         ctx.fillText("点击任意位置返回",350,650);
//     }

//     requestAnimationFrame(draw);
// }

// draw();


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let scene = "map";
let time = 0;

// ===== 图片 =====
const mapImg = new Image(); mapImg.src = "map.png";
const springImg = new Image(); springImg.src = "spring.png";
const summerImg = new Image(); summerImg.src = "summer.png";
const autumnImg = new Image(); autumnImg.src = "autumn.png";
const winterImg = new Image(); winterImg.src = "winter.png";

// 自适应屏幕
let cw, ch;
const BASE_W = 1000;
const BASE_H = 700;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cw = canvas.width;
    ch = canvas.height;
}

window.onresize = resizeCanvas;
resizeCanvas();

// ===== 四季坐标（用你的完整数据替换）=====
// ===== 春 =====
const springPolygon = [
[10,39],[27,20],[81,0],[135,8],[158,13],[177,17],[206,8],[228,14],[239,14],[259,14],[280,25],[300,20],[340,38],[366,28],[383,24],[418,13],[439,9],[470,14],[491,10],[511,12],[535,15],[559,24],[582,30],
[576,49],[552,63],[531,78],[519,109],[504,132],[497,135],[490,146],[486,154],[489,165],[480,179],[474,185],[485,198],[488,214],[486,220],[476,228],[469,246],[473,254],[476,270],[470,278],[464,284],[458,296],[458,302],
[485,315],[501,321],[513,326],[521,340],[526,353],[529,363],[521,370],[505,358],[484,355],[468,358],[450,361],[425,361],[397,360],[373,354],[351,344],[319,338],[296,326],[257,326],[242,323],[219,332],[202,332],
[172,324],[153,324],[122,328],[92,331],[69,335],[47,345],[20,351],[1,347],[0,45]
];

// ===== 夏 =====
const summerPolygon = [
[578,26],[563,52],[544,66],[527,84],[517,118],[498,138],[483,151],[484,171],[473,185],[482,204],[483,216],[471,230],[470,240],[475,259],[467,278],[458,301],[467,306],[477,308],[505,319],[513,336],
[525,347],[533,363],[550,360],[577,360],[603,364],[622,354],[642,346],[666,344],[682,346],[704,350],[722,360],[745,363],[772,371],[799,368],[821,371],[845,380],[865,387],[891,393],[912,405],[930,415],
[957,415],[988,420],[996,402],[992,393],[995,381],[996,99],[978,83],[963,79],[948,84],[931,87],[914,82],[887,69],[876,57],[867,42],[853,32],[844,34],[836,36],[818,28],[803,24],[791,24],
[766,18],[749,18],[739,23],[723,23],[710,14],[702,14],[679,15],[653,15],[626,17],[600,18],[578,20]
];

// ===== 冬 =====
const winterPolygon = [
[553,358],[598,361],[631,353],[662,340],[687,342],[703,347],[720,354],[735,361],[749,364],[771,367],[784,368],[802,367],[817,364],[831,373],[850,382],[879,389],[898,397],[926,411],[949,414],[977,424],
[991,444],[995,451],[994,534],[996,551],[994,567],[991,579],[994,588],[989,602],[980,610],[976,620],[979,638],[976,652],[958,662],[933,668],[919,672],[903,681],[886,687],[872,689],[861,691],[857,693],
[835,695],[820,693],[800,686],[779,681],[760,679],[736,679],[714,684],[694,686],[674,685],[654,689],[639,691],[628,693],[608,693],[587,694],[571,692],[558,690],[542,690],[525,683],[512,682],[489,677],
[478,677],[466,681],[445,681],[424,672],[432,660],[445,650],[460,640],[468,622],[476,602],[479,587],[473,570],[477,556],[488,544],[491,539],[491,531],[496,515],[502,494],[491,468],[510,446],[519,425],
[534,395],[532,382],[539,366],[545,358]
];

// ===== 秋=====
const autumnPolygon = [
[2,350],[15,352],[42,345],[66,334],[92,331],[118,327],[142,323],[162,324],[193,330],[218,330],[240,323],[261,325],[286,325],[310,330],[346,342],[367,356],[393,363],[414,360],[449,363],[483,358],
[506,366],[526,377],[529,395],[515,430],[513,443],[489,462],[497,483],[492,524],[489,543],[469,565],[473,590],[464,615],[456,633],[438,645],[418,658],[404,649],[391,684],[371,680],[344,683],[317,680],
[306,670],[283,672],[267,683],[242,682],[222,673],[195,673],[170,684],[157,674],[152,664],[150,581],[23,579],[20,619],[6,598],[1,550],[0,350]
];
// ===== hover =====
let hover = {spring:false,summer:false,autumn:false,winter:false};

// 当前变换（由 drawFull 返回并在 draw 中保存）
let transform = {scale:1, offsetX:0, offsetY:0};

// ===== 多边形检测 =====
function pointInPolygon(x, y, poly) {
    let inside = false;
    for (let i=0,j=poly.length-1;i<poly.length;j=i++){
        let xi=poly[i][0], yi=poly[i][1];
        let xj=poly[j][0], yj=poly[j][1];

        let intersect = ((yi>y)!=(yj>y)) &&
            (x<(xj-xi)*(y-yi)/(yj-yi)+xi);

        if(intersect) inside=!inside;
    }
    return inside;
}

// ===== 鼠标 =====
canvas.onmousemove = function(e){
    // 将屏幕坐标反算回设计坐标
    const x = (e.clientX - transform.offsetX) / transform.scale;
    const y = (e.clientY - transform.offsetY) / transform.scale;

    hover.spring = pointInPolygon(x,y,springPolygon);
    hover.summer = pointInPolygon(x,y,summerPolygon);
    hover.autumn = pointInPolygon(x,y,autumnPolygon);
    hover.winter = pointInPolygon(x,y,winterPolygon);

    canvas.style.cursor = (hover.spring||hover.summer||hover.autumn||hover.winter) ? "pointer" : "default";
};

// ===== 点击 =====
canvas.addEventListener('click', function(e){
    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const x = (screenX - transform.offsetX) / transform.scale;
    const y = (screenY - transform.offsetY) / transform.scale;

    // 检测返回按钮（屏幕坐标，所有场景都可以返回）
    if(screenX >= cw - 120 && screenX <= cw - 10 && screenY >= 10 && screenY <= 60){
        window.location.href = "home.html";
        return;
    }

    if(scene==="map"){
        if(pointInPolygon(x,y,springPolygon)){ scene="spring"; return; }
        if(pointInPolygon(x,y,summerPolygon)){ scene="summer"; return; }
        if(pointInPolygon(x,y,autumnPolygon)){ scene="autumn"; return; }
        if(pointInPolygon(x,y,winterPolygon)){ scene="winter"; return; }
    } else {
        scene="map";
    }
});

// ===== 画多边形 =====
function drawPoly(poly){
    ctx.beginPath();
    poly.forEach((p,i)=>{
        if(i===0) ctx.moveTo(p[0],p[1]);
        else ctx.lineTo(p[0],p[1]);
    });
    ctx.closePath();
}

// ===== ⭐ 修复版发光函数 =====
function glow(poly, main, deep){

    let g = (Math.sin(time*1.2)+1)/2;

    // 👉 内部填充（颜色明显区分关键）
    ctx.fillStyle = `rgba(${main}, ${0.25 + g*0.25})`;
    drawPoly(poly);
    ctx.fill();

    // 👉 外层柔光（扩散）
    ctx.shadowColor = `rgba(${main},0.9)`;
    ctx.shadowBlur = 50 + g*25;

    ctx.strokeStyle = `rgba(${main},0.3)`;
    ctx.lineWidth = 18;
    drawPoly(poly);
    ctx.stroke();

    // 👉 中层
    ctx.shadowBlur = 25 + g*10;
    ctx.strokeStyle = `rgba(${main},0.8)`;
    ctx.lineWidth = 8;
    drawPoly(poly);
    ctx.stroke();

    // 👉 内层清晰边界（深色）
    ctx.shadowBlur = 5;
    ctx.strokeStyle = `rgba(${deep},1)`;
    ctx.lineWidth = 3;
    drawPoly(poly);
    ctx.stroke();

    ctx.shadowBlur = 0;
}

// ===== 绘制并返回缩放参数 =====
function drawFull(img){
    // 背景（黑边）
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cw,ch);

    // 等比例缩放并居中
    let scale = Math.min(cw/BASE_W, ch/BASE_H);
    let w = BASE_W * scale;
    let h = BASE_H * scale;
    let offsetX = (cw - w) / 2;
    let offsetY = (ch - h) / 2;

    if(img && img.complete) ctx.drawImage(img, offsetX, offsetY, w, h);

    return {scale, offsetX, offsetY};
}

// ===== 渲染 =====
function draw(){
    // 清屏为画布尺寸
    ctx.clearRect(0,0,cw,ch);
    time += 0.05;

    // 先画当前场景的底图并获取变换参数
    if(scene==="map"){
        transform = drawFull(mapImg);

        // 发光在缩放变换下绘制
        ctx.save();
        ctx.translate(transform.offsetX, transform.offsetY);
        ctx.scale(transform.scale, transform.scale);

        if(hover.spring) glow(springPolygon,"255,170,200","200,80,140");
        if(hover.summer) glow(summerPolygon,"120,255,150","40,150,80");
        if(hover.autumn) glow(autumnPolygon,"255,200,80","180,120,40");
        if(hover.winter) glow(winterPolygon,"120,180,255","50,90,180");

        ctx.restore();
    }
    else {
        // 其它场景同样使用 drawFull 绘制，保持缩放一致
        if(scene==="spring") transform = drawFull(springImg);
        else if(scene==="summer") transform = drawFull(summerImg);
        else if(scene==="autumn") transform = drawFull(autumnImg);
        else if(scene==="winter") transform = drawFull(winterImg);

        // 场景文字提示（基于原始坐标，需反算至画布）
        ctx.save();
        ctx.translate(transform.offsetX, transform.offsetY);
        ctx.scale(transform.scale, transform.scale);
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("点击任意位置返回", 350, 650);
        ctx.restore();
    }

    // 右上角返回按钮（屏幕坐标，所有场景都显示）
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(255,100,100,0.9)";
    ctx.fillRect(cw - 120, 10, 110, 50);
    ctx.strokeRect(cw - 120, 10, 110, 50);
    
    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("返回", cw - 65, 40);
    ctx.textAlign = "left";

    requestAnimationFrame(draw);
}

draw();