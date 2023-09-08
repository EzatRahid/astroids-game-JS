// CANVAS //
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight




// PLAYER // ***************************


class Player {
    constructor({position,velocity}){
        this.position = position
        this.velocity = velocity
    }
    draw(){
        // c.fillStyle='green'
        // c.fillRect(this.position.x,this.position.y,100,100)
        c.arc(this.position.x,this.position.y, 5,0,Math.PI * 2,false)
        c.fillStyle = 'red'
        c.fill();
        c.beginPath()
        c.moveTo(this.position.x + 30,this.position.y)
        c.lineTo(this.position.x -10,this.position.y -10)
        c.lineTo(this.position.x -10,this.position.y +10)
        c.closePath();

        c.strokeStyle = 'white'
        c.stroke();
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const player = new Player({
    position: {x:canvas.width / 2, y:canvas.height / 2},
    velocity: {x:0, y:0}
})

player.draw();

// PLAYER MOVEMENT

const keys = {
    w:{
        pressed:false 
    },
}

const animate = () =>{
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update();

    if(keys.w.pressed) player.velocity.x = 1
    
}
animate();

window.addEventListener('keydown', (event) =>{
    switch(event.code){
        case 'KeyW':
            console.log('W was pressed')
            break
        case 'KeyA':
            console.log('A was pressed')
            break
        case 'KeyD':
            console.log('D was pressed')
            break
        
    }
    console.log(event)
})