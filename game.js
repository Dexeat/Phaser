var config = {

        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics : {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                debug: true
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
    var player2;
    var cursors;
}

function preload(){
    this.load.image('background','assets/fond.png');
    this.load.image('sol','assets/sol.png');
    this.load.spritesheet('perso','assets/32x32-bat-sprite.png',{frameWidth: 32, frameHeight: 32});

}
function create(){
    this.add.image(400,300,'background');
    platforms = this.physics.add.staticGroup();

    platforms.create(400,700,'sol');//.setScale(2).refreshBody();
    platforms.create(40,250,'sol').setScale(0.25).refreshBody();
    platforms.create(600,250,'sol').setScale(0.25).refreshBody();
    platforms.create(400,400,'sol').setScale(0.2).refreshBody();

    player = this.physics.add.sprite(100,0,'perso');
    player2 = this.physics.add.sprite(100,0,'perso');

    player.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

    this.physics.add.collider(player,platforms);
    this.physics.add.collider(player,player2);
    this.physics.add.collider(player2,platforms);

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


 
    cursors2 = this.cursors = this.input.keyboard.addKeys(
        {up:Phaser.Input.Keyboard.KeyCodes.Z,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.Q,
        right:Phaser.Input.Keyboard.KeyCodes.D});
    }


function update(){


    if(cursors.left.isDown){
        player.setVelocityX(-320);
        player.anims.play('gauche', true);
    } else if(cursors.right.isDown){
        player.anims.play('droite', true);
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
        player2.anims.play('gauche', true);
    } else if(cursors2.right.isDown){
        player2.setVelocityX(320);
        player2.anims.play('droite', true);
    } else {
        player2.setVelocityX(0);
        if(!player2.body.touching.down){player2.anims.play('fall', true);}
        else{player2.anims.play('idle', true);}
    }
    if(cursors2.up.isDown /*&& player2.body.touching.down*/){
        player2.setVelocityY(-500);
    }

}