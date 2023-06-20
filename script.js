const socket = io();
socket.emit("he",{name:"poddar"})
kaboom({
    width: 1000,
    height: 500,
    font: "sans-serif",
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 0, ],
    burp:true,
})

const canvas= document.querySelector("canvas")
    const loadData = async ()=>{
        await loadSprite("tank1up", "assets/player1_tank_up.png")
        await loadSprite("tank1down", "assets/player1_tank_down.png")
        await loadSprite("tank1left", "assets/player1_tank_left.png")
        await loadSprite("tank1right", "assets/player1_tank_right.png")
        await loadSprite("tank2up", "assets/player2_tank_up.png")
        await loadSprite("tank2down", "assets/player2_tank_down.png")
        await loadSprite("tank2left", "assets/player2_tank_left.png")
        await loadSprite("tank2right", "assets/player2_tank_right.png")
        await loadSprite("breakbrick", "assets/break_brick.jpg")
        await loadSprite("solidbrick", "assets/solid_brick.jpg")
        await loadSprite("helth", "assets/helth.png")
        await loadSprite("Bullet","assets/enemy_bullet.png")
        await loadSound("shoot", "assets/laser-gun.mp3")
        await loadSound("engine", "assets/engine.mp3")
        await loadSound("helth", "assets/helth.mp3")
        await loadSound("pang", "assets/bulletPang.mp3")
        await loadSound("thud", "assets/thud.mp3")
        await loadSound("explosion", "assets/explosion.mp3")
        await loadSound("bricks", "assets/brick-falling.mp3")
        await loadSound("reload", "assets/reload.mp3")
    }
    loadData().then(()=>{
        start()
    })
    //win scene
    scene("win", ({ winner }) => {
        
        burp()
        add([
            text("Winner is "+ winner ),
            anchor("center"),
            pos(width() / 2, height() / 2),
        ])
        add([
            text("Press Enter to play again"),
            anchor("center"),
            pos(width() / 2, height()-50),
        ])
        onKeyDown("enter",()=>{
            
        start();
    })
    // wait(10,go("game"))
    
})
//game scene
scene("game", () => {
    // console.log(get("game"))
    // const objects = getObjects();
// console.log(objects);
add([
    text("Instructions\n\nMoves\n\nPlayer1\nmovement : up, down, left, right\nshooting: space bar\nreload: /\n\nPlayer2\nmovement : w, s, a, d\nshooting: k\nreload: r \n\nIt will take 3 seconds to reload.", { size: 20  }),
    pos(width() / 2, height() / 2),
    anchor("center"),
    z(100),
    lifespan(10),
    fixed(),
])
add([
    rect(width()/2,height()),
    pos(width() / 2, height() / 2),
        anchor("center"),
        z(99),
        color(9,23,45),
        lifespan(10),
        fixed(),
    ])
    let t1=0;
    let t2=1;
    const SPEED = 50
    const BULLET_SPEED = 500
    const breakHealth = 3
    const tank1Health = 20
    const tank2Health = 20
    
    const LEVELS = 
    [
        "=====================",
        "=   =  =+@  @  =   =",
        "=   =@@@@@@ @  =   =",
        "=    @   @# @@@@@@@=",
        "=    #   =@ @      =",
        "=    @   @= #      =",
        "=@@@@@@@ #@ @      =",
        "=   =  @ @@@@@@=   =",
        "=   =  @  @+=  =   =",
        "=====================",
        ]
        const level = addLevel(LEVELS, {
            tileWidth: 50,
            tileHeight: 50,
            pos: vec2(0, 0),
            tiles: {
                "@": () => [
                    sprite("breakbrick"),
                    area(),
                    body({isStatic:true}),
                    health(breakHealth),
                    "break"
                ],
                "+": () => [
                    sprite("helth"),
                    area(),
                    body({isStatic:true}),
                    health(breakHealth),
                    "helth"
                ],
                "#": () => [
                    rect(50,50),
                    area(),
                    body({mass:10}),
                    color(192,192,192),
                    "Iron"
                ],
                "=": () => [
                    sprite("solidbrick"),
                    area(),
                    body({ isStatic: true }),
                    "steel"
                ],
                
            },
        })
        // console.log(obj)
        let isSpacePressed = false;
        const player1 = add([
            sprite("tank1down"),
            pos(100, 80),
            rotate(0),
            area(),
            body({mass:100}),
            health(tank1Health),
            anchor("center"),
            "tank1",
            "tank"
        ])
        const player2 = add([
            sprite("tank2up"),   
            pos(width()-120,height()-80),     
            body({mass:100}),
            area(),
            rotate(0),        
            anchor("center"), 
            health(tank2Health),
            "tank2",
            "tank"
        ])
        socket.on("moving",(e)=>{
            player1.pos.x=e.axis.x
            player1.pos.y=e.axis.y
        })
        socket.on("moving1",(e)=>{
            player2.pos.x=e.axis.x
            player2.pos.y=e.axis.y
        })
        // player 1 movement
        onKeyDown("left", () => {
            socket.emit("left",{tank:'tank1left',x:SPEED,y:0,t1:3})
            // player1.use(sprite('tank1left'))
            // t1=3
        })
        onKeyRelease("left",()=>{
            let e= get("tank1")[0]
            socket.emit("moving",{axis:e.pos})
        })
        onKeyRelease("right",()=>{
            let e= get("tank1")[0]
            socket.emit("moving",{axis:e.pos})
        })
        onKeyRelease("up",()=>{
            let e= get("tank1")[0]
            socket.emit("moving",{axis:e.pos})
        })
        onKeyRelease("down",()=>{
            let e= get("tank1")[0]
            socket.emit("moving",{axis:e.pos})
        })
        onKeyRelease("w",()=>{
            let e= get("tank2")[0]
            socket.emit("moving1",{axis:e.pos})
        })
        onKeyRelease("a",()=>{
            let e= get("tank2")[0]
            socket.emit("moving1",{axis:e.pos})
        })
        onKeyRelease("s",()=>{
            let e= get("tank2")[0]
            socket.emit("moving1",{axis:e.pos})
        })
        onKeyRelease("d",()=>{
            let e= get("tank2")[0]
            socket.emit("moving1",{axis:e.pos})
        })
        socket.on("left",(e)=>{
            player1.use(sprite(e.tank))
            player1.move(-e.x, e.y)
            t1=e.t1
        })
        onKeyDown("right", () => {
            socket.emit("right",{tank:'tank1right',x:SPEED,y:0,t1:2})
        })
        socket.on("right",(e)=>{
            player1.use(sprite(e.tank))
            player1.move(e.x, e.y)
            t1=e.t1
        })
        onKeyDown("up", () => {
            socket.emit("up",{tank:'tank1up',y:SPEED,x:0,t1:1})
        })      
        socket.on("up",(e)=>{
            player1.use(sprite(e.tank))
            player1.move(e.x,-e.y)
            t1=e.t1
        })
        onKeyDown("down", () => {
            socket.emit("down",{tank:'tank1down',y:SPEED,x:0,t1:0})
        })
        socket.on("down",(e)=>{
            player1.use(sprite(e.tank))
            player1.move(e.x, e.y)
            t1=e.t1
        })
        // player 2 movement
        onKeyDown("a", () => {
            socket.emit("a",{tank:'tank2left',x:SPEED,y:0,t2:3})
        })
        socket.on("a",(e)=>{
            player2.use(sprite(e.tank))
            player2.move(-e.x, e.y)
            t2=e.t2
        })
        onKeyDown("d", () => {
            socket.emit("d",{tank:'tank2right',x:SPEED,y:0,t2:2})
        })
        socket.on("d",(e)=>{
            player2.use(sprite(e.tank))
            player2.move(e.x, e.y)
            t2=e.t2
        })
        onKeyDown("w", () => {
            socket.emit("w",{tank:'tank2up',y:SPEED,x:0,t2:1})
        })
        socket.on("w",(e)=>{
            player2.use(sprite(e.tank))
            player2.move(e.x,-e.y)
            t2=e.t2
        })
        onKeyDown("s", () => {
            socket.emit("s",{tank:'tank2down',y:SPEED,x:0,t2:0})
        })
        socket.on("s",(e)=>{
            player2.use(sprite(e.tank))
            player2.move(e.x,e.y)
            t2=e.t2
        })
        //player 1 bullet
        function spawnBullet(p,q) {
            if(q===0)
            add([
                sprite("Bullet"),
                area(),
                pos(p),
                anchor("center"),
                move(DOWN, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet",
                
            ])
            else if(q===1)
            add([
                sprite("Bullet"),
                area(),
                pos(p),
                anchor("center"),
                move(UP, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet",
            ])
            else if(q===2)
            add([
                sprite("Bullet"),
                area(),
                pos(p),
                anchor("center"),
                move(RIGHT, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet",
            ])
            else
            add([
                sprite("Bullet"),
                area(),
                pos(p),
                anchor("center"),
                move(LEFT, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet",
            ])
        }
        //player 2 bullet
        function spawnBullet1(p,q) {
            if(q===0)
            add([
                sprite("Bullet"),
                area(),
                pos(p),
                anchor("center"),
                move(DOWN, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet1",
            ])
            else if(q===1)
            add([
                sprite("Bullet"),
                area(),
                pos(p),
                anchor("center"),
                move(UP, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet1",
            ])
            else if(q===2)
            add([
                sprite("Bullet"),
                area(),
                pos(p),
                anchor("center"),
                move(RIGHT, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet1",
            ])
            else
            add([
                sprite("Bullet"),
                area(),
                pos(p),
                anchor("center"),
                move(LEFT, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet1",
            ])
        }
        // const breakElements = get("break");
        //bullet collision with bricks
        onCollide("bullet", "break", (b, d) => {
            socket.emit("bulletbreak",{bulletId:b.id,brickId:d.id})
        })
        socket.on("bulletbreak",(e)=>{
            const brick=get("*", { recursive: true }).find(o => o.id === e.brickId)
            const bullet=get("*", { recursive: true }).find(o => o.id === e.bulletId)
            console.log(brick)
            console.log(bullet)
            brick && brick.hurt(1);
            if(brick && brick.hp()==0)
            {
                brick && destroy(brick);
                play("bricks")
            }
            bullet && destroy(bullet);
        })
        onCollide("bullet1", "break", (b, d) => {
            socket.emit("bullet1break",{bulletId:b.id,brickId:d.id})
        })
        socket.on("bullet1break",(e)=>{
            const brick=get("*", { recursive: true }).find(o => o.id === e.brickId)
            const bullet=get("*", { recursive: true }).find(o => o.id === e.bulletId)
            console.log(brick)
            console.log(bullet)
            brick && brick.hurt(1);
            if(brick && brick.hp()==0)
            {
                brick && destroy(brick);
                play("bricks")
            }
            bullet && destroy(bullet);
        })
        
        onCollide("bullet1", "break", (b, e) => {
            e.hurt(1)
            if(e.hp()==0){
                destroy(e);
                play("bricks")
            }
            console.log(e.hp())
            destroy(b)
        })
        //bullet collision with tanks
        onCollide("bullet", "tank2", (b, e) => {
            e.hurt(1)
            if(e.hp()==0)
            socket.emit("tank2death",{})
            // destroy(e);
            destroy(b)
        })
        socket.on("tank2death",()=>{
            destroy(get("tank2"));
        })
        onCollide("bullet1", "tank1", (b, e) => {
            e.hurt(1)
            if(e.hp()==0)
            socket.emit("tank1death",{})
            // destroy(e);
            destroy(b)
        })
        socket.on("tank1death",()=>{
            destroy(get("tank1"));
        })
        //tanks when hurt
        on("hurt", "tank", (e) => {
            shake(1)
            play("thud")
        })
        //tanks on death
        on("death", "tank", (e) => {
            shake(3)
            play("explosion")
            addKaboom(e.pos)
        })
        //tanks collision
        onCollide("tank1","tank2",()=>{
            play("thud")
            shake(2)
        })
        //tanks powerup
        onCollide("helth","tank",(h,e)=>{
            e.heal(20-e.hp())
            play("helth")
            h.destroy()
        })
        onCollide("bullet", "steel", (b, e) => {
            destroy(b)
        })
        onCollide("bullet1", "steel", (b, e) => {
            destroy(b)
        })
        //bullet on steel
        onCollide("bullet", "Iron", (b, e) => {
            play("pang")
            destroy(b)
        })
        
        onCollide("bullet1", "Iron", (b, e) => {
            play("pang")
            destroy(b)
        })
        onCollideEnd("tank","Iron", (b,e)=>{
            console.log(b)
            console.log(e)
            socket.emit("tankIron",{id:e.id})
        })
        socket.on("tankIron",(e)=>{
            const tank=get("*", { recursive: true }).find(o => o.id === e.id)
            // console.log(tank)
            tank && tank.move(tank.dir)
        })
        //player1 shooting and reloading
        onKeyPress("space", () => {
            socket.emit("space",{})
        })
        socket.on("space",()=>{
            if(score1.value<=0)return
            spawnBullet(player1.pos.sub(0, 0),t1)
            score1.value-=1;
            score1.text = "Bullets Left:" + score1.value
            // burp()
            play("shoot", {
                volume: 0.3,
                detune: rand(-1200, 1200),
            })
        })
        onKeyPress("/",()=>{
            socket.emit("/",{})
        })
        socket.on("/",async()=>{
            play("reload")
            await wait(3)
            score1.value=20;
            score1.text = "Bullets Left:" + score1.value
        })
        //player2 shooting and reloading
        onKeyPress("k", () => {
            socket.emit("k",{})
        })
        socket.on("k",()=>{
            if(score2.value<=0)return
            spawnBullet1(player2.pos.sub(0, 0),t2)
            score2.value-=1;
            score2.text = "Bullets Left:" + score2.value
            play("shoot", {
                volume: 0.3,
                detune: rand(-1200, 1200),
            })
        })
        onKeyPress("r",()=>{
            socket.emit("r",{})
        })
        socket.on("r",async()=>{
            play("reload")
            await wait(3)
            score2.value=20;
            score2.text = "Bullets Left:" + score2.value
        })
        //Healthbars
        const healthbar = add([
            rect(width()/2, 20),
            pos(0, 0),
            color(107, 201, 108),
            fixed(),
            {
                max: 20,
                set(hp) {
                    this.width = width()/2 * hp / this.max
                    this.flash = true
                },
            },
        ])
        const healthbar2 = add([
            rect(width()/2, 20),
            pos(width()/2, 0),
            color(107, 201, 108),
            fixed(),
            {
                max: 20,
                set(hp) {
                    this.width = width()/2 * hp / this.max
                    this.flash = true
                },
            },
        ])
        //hurt and heal
        player1.onHurt(() => {
            healthbar.set(player1.hp())
        })
        player1.onHeal(() => {
            healthbar.set(20)
        })
        player2.onHeal(() => {
            healthbar2.set(20)
        })
        player2.onHurt(() => {
            healthbar2.set(player2.hp())
        })
        //healthbar update
        healthbar.onUpdate(() => {
            if (healthbar.flash) {
                healthbar.color = rgb(255, 255, 255)
                healthbar.flash = false
            } else {
                healthbar.color = rgb(127, 255, 127)
            }
        })
        healthbar2.onUpdate(() => {
            if (healthbar2.flash) {
                healthbar2.color = rgb(255, 0, 0)
                healthbar2.flash = false
            } else {
                healthbar2.color = rgb(255, 120, 127)
            }
        })
        //after death
        player1.onDeath(() => {
            wait(3,go("win", { winner: "tank2" ,}))
        })
        player2.onDeath(() => {
                wait(3,go("win", {winner: "tank1" }))
            })

            //bullet count
            const score1 = add([
                text("Bullets left: 20"),
                scale(0.5),
                pos(10, 24),
                z(10),
                { value: 20 },
            ])
            
            const score2 = add([
                text("Bullets left: 20"),
                scale(0.5),
                z(10),
                pos(width()-120, 24),
                { value: 20 },
            ])
            add([
                rect(190,24),
                pos(30, 30),
                anchor("center"),
                z(5),
                color(9,23,45),
                fixed(),
            ])
            add([
                rect(180,24),
                pos(width()-30, 30),
                anchor("center"),
                z(5),
                color(9,23,45),
                fixed(),
            ])
            
})
//start function
function start() {
    // Start with the "game" scene, with initial parameters
    go("game")
}