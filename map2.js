const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const BASE_W = 1000;
const BASE_H = 700;

const mapImg = new Image();
mapImg.src = "map2.jpg";

const cloudLeftImg = new Image();
cloudLeftImg.src = "auspicious_cloud_4.png";

const cloudRightImg = new Image();
cloudRightImg.src = "auspicious_cloud_4.png";

let scene = "map";
let hoverArea = null;
let currentArea = null;
let loaded = true;
let cw = 0;
let ch = 0;
let dpr = 1;
let transform = { scale: 1, offsetX: 0, offsetY: 0 };
let time = 0;
let hoverScale = 1;
let targetScale = 1;
let transition = 0;
let transitioning = false;
let nextScene = "map";
let flowOffset = 0;
let transitionDir = 1;
let switchedDuringTransition = false;

// 区域坐标（直接嵌入）
const areas = [
    {
        imageSrc: "heaven_dream.jpg",
        poly: [[80,270],[67,290],[78,309],[176,310],[188,290],[178,269],[79,270]]
    },
    {
        imageSrc: "sand_water_home.jpg",
        poly: [[90,572],[77,574],[72,592],[78,611],[84,608],[87,614],[183,615],[195,593],[184,574],[92,572]]
    },
    {
        imageSrc: "apricot_grove.jpg",
        poly: [[306,576],[295,596],[307,616],[420,616],[422,608],[428,609],[437,573],[424,566],[422,570],[421,572],[307,574]]
    },
    {
        imageSrc: "heaven_academy.jpg",
        poly: [[500,561],[489,581],[501,601],[601,602],[613,579],[600,561],[502,561]]
    },
    {
        imageSrc: "bee_studio.jpg",
        poly: [[266,406],[256,418],[262,425],[328,426],[335,416],[328,408],[268,407]]
    },
    {
        imageSrc: "peach_market.jpg",
        poly: [[831,467],[818,487],[832,507],[950,508],[960,484],[951,466],[832,465]]
    },
    {
        imageSrc: "peach_award_stage.jpg",
        poly: [[844,234],[835,244],[832,235],[828,243],[826,248],[822,242],[821,249],[813,242],[815,256],[820,266],[841,268],[843,274],[943,276],[944,269],[955,271],[969,263],[962,260],[967,254],[962,253],[960,246],[950,234],[943,236],[940,234],[847,233]]
    },
    {
        imageSrc: "mushroom_symbiosis.jpg",
        poly: [[666,387],[652,392],[646,398],[644,406],[647,410],[656,405],[655,411],[659,421],[666,427],[665,430],[762,433],[772,424],[779,422],[779,417],[786,410],[780,401],[777,395],[771,389],[763,390],[671,391],[666,386]]
    },
    {
        imageSrc: "flowing_egg.jpg",
        poly: [[672,603],[666,594],[664,604],[659,600],[657,610],[652,599],[650,621],[668,629],[760,629],[766,613],[760,600],[676,600]]
    }
];

for (const area of areas) {
    area.image = new Image();
    area.image.src = area.imageSrc;
}

function pointInPolygon(x, y, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i][0], yi = poly[i][1];
        const xj = poly[j][0], yj = poly[j][1];
        const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function drawPoly(poly) {
    ctx.beginPath();
    poly.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt[0], pt[1]);
        else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.closePath();
}

function getPolygonCenter(poly) {
    let cx = 0;
    let cy = 0;
    poly.forEach(pt => {
        cx += pt[0];
        cy += pt[1];
    });
    return {
        cx: cx / poly.length,
        cy: cy / poly.length
    };
}

function drawPolygonScaled(poly, scale) {
    const center = getPolygonCenter(poly);

    ctx.beginPath();
    poly.forEach((pt, i) => {
        const x = center.cx + (pt[0] - center.cx) * scale;
        const y = center.cy + (pt[1] - center.cy) * scale;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.closePath();
}

function glowFlow(poly, color, scale = 1) {
    const pulse = (Math.sin(time * 1.2) + 1) / 2;
    flowOffset += 3;

    ctx.fillStyle = `rgba(255,215,0,${0.15 + pulse * 0.15})`;
    drawPolygonScaled(poly, scale);
    ctx.fill();

    // 实线渐变边框：用流动渐变替代虚线旋转
    const shift = (flowOffset % 600) - 300;
    const lineGrad = ctx.createLinearGradient(shift, 0, shift + 600, 0);
    lineGrad.addColorStop(0, "rgba(255,215,0,0.15)");
    lineGrad.addColorStop(0.35, "rgba(255,245,185,0.95)");
    lineGrad.addColorStop(0.7, "rgba(255,215,0,0.2)");
    lineGrad.addColorStop(1, "rgba(255,215,0,0.15)");

    ctx.save();
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 6;
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    drawPolygonScaled(poly, scale);
    ctx.stroke();
    ctx.restore();

    // 在区域内加一层轻微扫光，形成流动感
    ctx.save();
    drawPolygonScaled(poly, scale);
    ctx.clip();
    const sheenGrad = ctx.createLinearGradient(shift - 120, 0, shift + 120, 0);
    sheenGrad.addColorStop(0, "rgba(255,255,255,0)");
    sheenGrad.addColorStop(0.5, "rgba(255,255,230,0.18)");
    sheenGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, BASE_W, BASE_H);
    ctx.restore();

    ctx.shadowBlur = 30;
    ctx.strokeStyle = "rgba(255,215,0,0.3)";
    ctx.lineWidth = 12;
    drawPolygonScaled(poly, scale);
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function resizeCanvas() {
    cw = canvas.clientWidth || window.innerWidth;
    ch = canvas.clientHeight || window.innerHeight;
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const scale = Math.min(cw / BASE_W, ch / BASE_H);
    transform = {
        scale,
        offsetX: (cw - BASE_W * scale) / 2,
        offsetY: (ch - BASE_H * scale) / 2
    };
}

function screenToBase(x, y) {
    return {
        x: (x - transform.offsetX) / transform.scale,
        y: (y - transform.offsetY) / transform.scale
    };
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

canvas.onmousemove = function(e) {
    if (scene !== "map" || transitioning) {
        hoverArea = null;
        targetScale = 1;
        canvas.style.cursor = "default";
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const pos = screenToBase(e.clientX - rect.left, e.clientY - rect.top);
    const x = pos.x;
    const y = pos.y;

    hoverArea = null;
    for (const area of areas) {
        if (area.poly && area.poly.length && pointInPolygon(x, y, area.poly)) {
            hoverArea = area;
            break;
        }
    }

    targetScale = hoverArea ? 1.03 : 1;
    canvas.style.cursor = hoverArea ? "pointer" : "default";
};

canvas.addEventListener('click', function(e) {
    if (transitioning) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const pos = screenToBase(screenX, screenY);
    const x = pos.x;
    const y = pos.y;

    // 检测返回按钮（屏幕坐标，所有场景都可以返回）
    if (screenX >= cw - 120 && screenX <= cw - 10 && screenY >= 10 && screenY <= 60) {
        window.location.href = "home.html";
        return;
    }

    if (scene === "map") {
        for (const area of areas) {
            if (area.poly && area.poly.length && pointInPolygon(x, y, area.poly)) {
                currentArea = area;
                nextScene = "detail";
                transitioning = true;
                transition = 0;
                transitionDir = 1;
                switchedDuringTransition = false;
                return;
            }
        }
    } else {
        nextScene = "map";
        transitioning = true;
        transition = 0;
        transitionDir = 1;
        switchedDuringTransition = false;
    }
});

function drawContain(img) {
    const scale = Math.min(BASE_W / img.width, BASE_H / img.height);
    const width = img.width * scale;
    const height = img.height * scale;
    const x = (BASE_W - width) / 2;
    const y = (BASE_H - height) / 2;
    ctx.drawImage(img, x, y, width, height);
}

function drawCloudTransition(progress) {
    const halfW = BASE_W / 2;
    const overlap = 30;

    const leftX = -halfW + (halfW + overlap) * progress;
    const rightX = BASE_W - (halfW + overlap) * progress;

    if (cloudLeftImg.complete && cloudLeftImg.width > 0) {
        ctx.drawImage(cloudLeftImg, leftX, 0, halfW, BASE_H);
    }

    if (cloudRightImg.complete && cloudRightImg.width > 0) {
        ctx.drawImage(cloudRightImg, rightX, 0, halfW, BASE_H);
    }
}

function draw() {
    time += 0.05;
    hoverScale += (targetScale - hoverScale) * 0.1;

    if (transitioning) {
        transition += transitionDir * 0.035;

        if (transition >= 1 && !switchedDuringTransition) {
            transition = 1;
            scene = nextScene;
            switchedDuringTransition = true;
            if (scene === "map") {
                currentArea = null;
                hoverArea = null;
            }
            transitionDir = -1;
        }

        if (transition <= 0 && switchedDuringTransition) {
            transition = 0;
            transitioning = false;
            transitionDir = 1;
            switchedDuringTransition = false;
        }
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);

    if (!loaded) {
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("正在加载区域坐标...", Math.max(20, cw / 2 - 100), Math.max(40, ch / 2));
        requestAnimationFrame(draw);
        return;
    }

    ctx.save();
    ctx.translate(transform.offsetX, transform.offsetY);
    ctx.scale(transform.scale, transform.scale);

    if (scene === "map") {
        ctx.drawImage(mapImg, 0, 0, BASE_W, BASE_H);

        if (hoverArea) {
            glowFlow(hoverArea.poly, "rgba(255,215,0,1)", hoverScale);
        }
    } else if (scene === "detail" && currentArea) {
        if (currentArea.image.complete && currentArea.image.width > 0) {
            drawContain(currentArea.image);
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, BASE_W, BASE_H);
            ctx.fillStyle = "white";
            ctx.font = "28px Arial";
            ctx.fillText("图片加载中...", 420, 350);
        }

        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("点击任意位置返回", 350, 650);
    }

    if (transitioning) {
        drawCloudTransition(transition);
    }

    ctx.restore();

    // 右上角返回按钮（所有场景都显示）
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