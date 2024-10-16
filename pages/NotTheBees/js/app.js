let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let cursor_location = {x:this.x, y:this.y};
let game_on = true;
let honey= {'x': cursor_location.x, 'y':cursor_location.y};
honey.img = new Image();
honey.img.src = 'img/honey.png';
let bees = bring_in_the_bees();

function bring_in_the_bees() {
    let bee = {'x': 0, 'y': 0, 'speed': 3};
    bee.img = new Image();
    bee.img.src = 'img/bee_right.png';
    let bee2 = {...bee, 'y': 150, 'speed': 4};
    let bee3 = {...bee, 'y': 300, 'speed': 5};
    let bee4 = {...bee, 'y': 450, 'speed': 5};
    let bee5 = {...bee, 'y': 800, 'speed': 6};
    let bee6 = {...bee, 'x': 1900, 'y': 0, 'speed': 1};
    let bee7 = {...bee, 'x': 1900, 'y': 150, 'speed': 2};
    return [bee, bee2, bee3, bee4, bee5, bee6, bee7];
}
function handle_mouse_move( event ) {
    honey.x = event.x - (honey.img.width/2);
    honey.y = event.y - canvas.offsetTop - (honey.img.height/2);
}
function handle_move() {
    bees.forEach((bee) => {
        if (bee.x < honey.x) {
            bee.x += bee.speed;
            bee.img.src = 'img/bee_right.png';
        } else if (bee.x > honey.x) {
            bee.x -= bee.speed;
            bee.img.src = 'img/bee_left.png';
        }
        if (bee.y > honey.y) {
            bee.y -= bee.speed;
        } else if (bee.y < honey.y) {
            bee.y += bee.speed;
        }
        if (Math.abs(bee.x - honey.x) <= 50 && Math.abs(bee.y - honey.y) <= 50) {
            game_on = false;
        }
    });
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    bees.forEach((bee) => {
        context.drawImage(bee.img, bee.x, bee.y);
    });
    context.drawImage(honey.img, honey.x, honey.y);
}
function increase_speed() {
    bees.forEach((bee) => {
        bee.speed += 1;  // Increment speed for each bee
    });
    console.log('Increased speed:', bees.map(b => b.speed));  // Optional: Log new speeds
}
function main_game_loop() {
    if (!game_on) return;
    handle_move();
    draw();
    window.requestAnimationFrame(main_game_loop);
}

if (game_on) {
    main_game_loop();
    canvas.onmousemove = handle_mouse_move;
}
setInterval(increase_speed, 5000);