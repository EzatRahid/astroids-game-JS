// CANVAS //
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

c.fillStyle = 'black'
c.fillRect(0,0,canvas.width,canvas.height)


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

        c.moveTo(this.position.x + 30,this.position.y)
        c.lineTo(this.position.x -10,this.position.y -10)
        c.lineTo(this.position.x -10,this.position.y +10)
        c.closePath();

        c.strokeStyle = 'white'
        c.stroke();
    }
}

const player = new Player({
    position: {x:canvas.width / 2, y:canvas.height / 2},
    velocity: {x:0, y:0}
})

player.draw();
player.draw();
player.draw();
player.draw();
player.draw();
player.draw();
player.draw();
player.draw();
player.draw();
player.draw();

