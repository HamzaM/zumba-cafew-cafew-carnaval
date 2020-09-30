var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }
}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
    player_shooting();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }
}

function player_shooting()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) - Math.abs(player2.graphic.position.x) < 0.05 &&
            Math.abs(player1.bullets[i].position.y) - Math.abs(player2.graphic.position.y) < 0.05)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
            player2.dead();
        }
    }
}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH || y > HEIGHT || y < 0 || x < 0)
        player1.turnLeft(Math.PI);
}

function player_meet()
{
    //collision between player and walls
    var x1 = player1.graphic.position.x + WIDTH / 2;
    var y1 = player1.graphic.position.y + HEIGHT / 2;

    var x2 = player2.graphic.position.x + WIDTH / 2;
    var y2 = player2.graphic.position.y + HEIGHT / 2;

    if ((Math.abs(x1) - Math.abs(x2)) < 1 && (Math.abs(x1) - Math.abs(x2)) < 1)
        player1.decreaseLife();
    if(player1.life <= 0)
        player1.dead();
}

function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;
    var length = noGround.length;
    var element = null;

    for (var i = 0; i < length; i++) {
        element = noGround[i];

        if (element) {
            var tileX = (element[0]);
            var tileY = (element[1]);
            var mtileX = (element[0] + sizeOfTileX);
            var mtileY = (element[1] + sizeOfTileY);
        }

        else {
            var tileX = 0;
            var tileY = 0;
            var mtileX = 0;
            var mtileY = 0;
        }
        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
           player1.decreaseLife();
           if(player1.life <= 0)
            player1.dead();
        }
    }

}
