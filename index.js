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

class Projectile {
    constructor({ position, velocity }) {
      this.position = position
      this.velocity = velocity
      this.radius = 5
    }
  
    draw() {
      c.beginPath()
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
      c.closePath()
      c.fillStyle = 'white'
      c.fill()
    }
  
    update() {
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

const SPEED = 3
const ROTSPEED = 0.05
const PROJECTILE_SPEED = 3


const projectiles = []


const animate = () => {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    
    for( let i = projectiles.length - 1; i >=0; i--){
        const projectile = projectiles[i]
        projectile.update()
        // garbage collector
        if(projectile.position.x + projectile.radius < 0 
            || projectile.position.x - projectile.radius > canvas.width 
            || projectile.position.y - projectile.radius > canvas.height 
            || projectile.position.y + projectile.radius < 0){
            projectiles.splice(i,1)
        }
    }


    if(keys.w.pressed){
        player.velocity.x = Math.cos(player.rotation) * SPEED
        player.velocity.y = Math.sin(player.rotation) * SPEED

    }else if(!keys.w.pressed){
        player.velocity.x *= 0.97
        player.velocity.y *= 0.97
    }
    else{
        player.velocity.x = 0
    }

    if(keys.d.pressed){
        player.rotation += ROTSPEED
    }
    if(keys.a.pressed){
        player.rotation -= ROTSPEED
    }

}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event);
    
    switch (event.code) {
        case 'KeyW':
            keys.w.pressed = true;
            break;
        case 'KeyA':
            keys.a.pressed = true;
            break;
        case 'KeyD':
            keys.d.pressed = true;
            break;
        case 'Space': // Corrected key code for Space
            projectiles.push(
                new Projectile({
                    position: {
                        x: player.position.x + Math.cos(player.rotation) * 30,
                        y: player.position.y + Math.sin(player.rotation) * 30,
                    },
                    velocity: {
                        x: Math.cos(player.rotation) * PROJECTILE_SPEED,
                        y: Math.sin(player.rotation) * PROJECTILE_SPEED,
                    },
                })
            );
            console.log(projectiles)
            break;
    }
});

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






