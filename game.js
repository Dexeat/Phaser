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
}

function preload(){
    this.load.image('background','assets/fond.png');
    this.load.image('sol','assets/sol.png');
    this.load.spritesheet('perso','assets/32x32-bat-sprite.png',{frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('piece','assets/piece.png',{frameWidth: 16, frameHeight: 16});
}
function create(){
    this.add.image(400,300,'background');
    platforms = this.physics.add.staticGroup();

    platforms.create(400,700,'sol');//.setScale(2).refreshBody();
    platforms.create(40,250,'sol').setScale(0.25).refreshBody();
    platforms.create(600,250,'sol').setScale(0.25).refreshBody();
    platforms.create(400,400,'sol').setScale(0.2).refreshBody();

    player = this.physics.add.sprite(100,0,'perso');

    player.setCollideWorldBounds(true);
    this.physics.add.collider(player,platforms);
    player.setBounce(0.25);
    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
        key: 'gauche',
        frames: this.anims.generateFrameNumbers('perso', {start: 13,end: 15}),
        frameRate:10
    });

    this.anims.create({
        key: 'droite',
        frames: this.anims.generateFrameNumbers('perso', {start: 5,end: 7}),
        frameRate:10
    });
    
    this.anims.create({
        key: 'idle',
        frames: [{key: 'perso', frame:0}],
        frameRate:20
    });

    this.anims.create({
        key: 'fall',
        frames: [{key: 'perso', frame:1}],
        frameRate:20
    });

    piece = this.add.group();

    //  Now let's add 50 coins into it
    for (var i = 0; i < 50; i++)
    {
        piece.create(this.world.randomX, this.world.randomY, 'piece', 0);
    }


    this.physics.add.collider(piece,platforms);
    this.physics.add.overlap(player,piece,collectPiece,null,this);


    //  Now using the power of callAll we can add the same animation to all coins in the group:
    piece.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3], 10, true);

    //  And play them
    coins.callAll('animations.play', 'animations', 'spin');



    cursors2 = this.cursors = this.input.keyboard.addKeys(
        {up:Phaser.Input.Keyboard.KeyCodes.Z,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.Q,
        right:Phaser.Input.Keyboard.KeyCodes.D});
}

function collectPiece(player, piece){
    piece.disableBody(true,true);
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
        if(!player.body.touching.down){player.anims.play('fall', true);}
        else{player.anims.play('idle', true);}
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