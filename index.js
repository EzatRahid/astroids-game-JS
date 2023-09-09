// CANVAS //
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight




// PLAYER // ***************************


class Player {
    constructor({position,velocity,rotation}){
        this.position = position
        this.velocity = velocity
        this.rotation = 0
    }
    draw(){
        c.save();
        c.translate(this.position.x , this.position.y)
        c.rotate(this.rotation)
        c.translate(-this.position.x, -this.position.y)
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
        c.restore();
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
    w :{
        pressed: false
    },
    a :{
        pressed: false
    },
    d :{
        pressed: false
    },
}

const animate = () => {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()

    if(keys.w.pressed){
        player.velocity.x = 1
    }else{
        player.velocity.x = 0
    }
    if(keys.d.pressed){
        player.rotation += 0.01
    }

}

animate();

window.addEventListener('keydown',(event) =>{
    console.log(event)
    
    switch(event.code){
        case 'KeyW':
      
        keys.w.pressed = true
        break
        case 'KeyA':
    
        keys.a.pressed = true
        break
        case 'KeyD':
     
        keys.d.pressed = true
        break

    }


})
window.addEventListener('keyup',(event) =>{
    console.log(event)
    
    switch(event.code){
        case 'KeyW':
      
        keys.w.pressed = false
        break
        case 'KeyA':
    
        keys.a.pressed = false
        break
        case 'KeyD':
     
        keys.d.pressed = false
        break

    }


})





