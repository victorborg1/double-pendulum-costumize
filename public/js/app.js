const lengthOneSlider = document.getElementById('lengthOneSlider')
const lengthTwoSlider = document.getElementById('lengthTwoSlider')
const massOneSlider = document.getElementById('massOneSlider')
const massTwoSlider = document.getElementById('massTwoSlider')

lengthOneSlider.addEventListener('input', updateLengthOne)
lengthTwoSlider.addEventListener('input', updateLengthTwo)
massOneSlider.addEventListener('input', updateMassOne)
massTwoSlider.addEventListener('input', updateMassTwo)

function updateLengthOne() {
    let value = parseInt(lengthOneSlider.value);
    document.getElementById('currentLengthOne').innerText = value;
    d1 = value;
}


function updateLengthTwo() {
    let value = parseInt(lengthTwoSlider.value);
    document.getElementById('currentLengthTwo').innerText = value;
    d2 = value;
}

function updateMassOne() {
    let value = parseInt(massOneSlider.value);
    document.getElementById('currentMassOne').innerText = value;
    m1 = value;
}

function updateMassTwo() {
    let value = parseInt(massTwoSlider.value);
    document.getElementById('currentMassTwo').innerText = value;
    m2 = value;
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 750
canvas.height = 750

let d1 = 200
let d2 = 200
let g = 0.3 
let ang_v1 = 0
let ang_v2 = 0
let ox = canvas.width/2
let oy = canvas.height/6
let energy_loss_factor = 0.998
let m1 = 100
let m2 = 100
let ang1 = 3*(Math.PI)/2
let ang2 = (Math.PI)/2


function draw() {
    let ball_x1 = ox + d1*Math.sin(ang1)
    let ball_y1 = oy + d1*Math.cos(ang1)
    let ball_x2 = ball_x1 + d2*Math.sin(ang2)
    let ball_y2 = ball_y1 + d2*Math.cos(ang2)

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(ox, oy, 4, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = 'blue'
    ctx.beginPath()
    ctx.moveTo(ox, oy);
    ctx.lineTo(ball_x1, ball_y1);
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(ball_x1, ball_y1, 10, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(ball_x1, ball_y1);
    ctx.lineTo(ball_x2, ball_y2);
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(ball_x2, ball_y2, 10, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.stroke()

    update()    
}

function update() {
    //ang_a1
    let term1 = -g*(2*m1+m2)*Math.sin(ang1)
    let term2 = -m2*g*Math.sin(ang1-2*ang2)
    let term3 = -2*Math.sin(ang1-ang2)*m2*((ang_v2*ang_v2)*d2 + (ang_v1*ang_v1)*d1*Math.cos(ang1-ang2))
    let denom1 = d1*(2*m1 + m2 - m2*Math.cos(2*ang1 - 2*ang2))
    let ang_a1 = (term1+term2+term3)/denom1
    //ang_a2
    let term11 = 2*Math.sin(ang1-ang2)*((ang_v1*ang_v1)*d1*(m1 + m2)+g*(m1+m2)*Math.cos(ang1)+ang_v2*ang_v2*d2*m2*Math.cos(ang1-ang2))
    let denom2 = d2*(2*m1+m2-m2*Math.cos(2*ang1-2*ang2))
    let ang_a2 = (term11)/denom2

    ang1 += ang_v1
    ang2 += ang_v2
    ang_v1 += ang_a1
    ang_v2 += ang_a2
    ang_v1 *= energy_loss_factor
    ang_v2 *= energy_loss_factor

}

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    draw() 
}

animate()

