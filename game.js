var config = {

        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics : {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                debug: false
            }
        },
        scene: {
            init: init,
            preload: preload,
            create: create,
            update: update
        }

}

var game = new Phaser.Game(config);

function init(){
    var platforms;
    var player;
    var cursors;
    var cursors2;
    var player2;
}

function preload(){
    this.load.image('background','assets/fond.png');
    this.load.image('sol','assets/sol.png');
    this.load.spritesheet('perso','assets/enemies-spritesheet.png',{frameWidth: 20, frameHeight: 20});
}
function create(){
    this.add.image(400,300,'background');
    platforms = this.physics.add.staticGroup();

    platforms.create(400,700,'sol');//.setScale(2).refreshBody();
    platforms.create(40,250,'sol').setScale(0.25).refreshBody();
    platforms.create(600,250,'sol').setScale(0.25).refreshBody();
    platforms.create(400,400,'sol').setScale(0.2).refreshBody();

    player = this.physics.add.sprite(100,0,'perso')/*.setScale(4).refreshBody()*/;
    player2 = this.physics.add.sprite(200,0,'perso');


    //-------------------------------------------------------------------------//
    player.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

    this.physics.add.collider(player,platforms);
    this.physics.add.collider(player2,platforms);
    this.physics.add.collider(player,player2);

    player.setBounce(0.25);
    player2.setBounce(0.25);
    //player.body.setGravityY(300);
    cursors = this.input.keyboard.createCursorKeys();
    cursors2 = this.cursors = this.input.keyboard.addKeys(
        {up:Phaser.Input.Keyboard.KeyCodes.Z,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.Q,
        right:Phaser.Input.Keyboard.KeyCodes.D});
}
function update(){
    if(cursors.left.isDown){
        player.setVelocityX(-320);
    } else if(cursors.right.isDown){
        player.setVelocityX(320);
    } else {
        player.setVelocityX(0);
    }
    if(cursors.up.isDown/* && player.body.touching.down*/){
        player.setVelocityY(-500);
    }

    if(cursors2.left.isDown){
        player2.setVelocityX(-320);
    } else if(cursors2.right.isDown){
        player2.setVelocityX(320);
    } else {
        player2.setVelocityX(0);
    }
    if(cursors2.up.isDown /*&& player2.body.touching.down*/){
        player2.setVelocityY(-500);
    }

}