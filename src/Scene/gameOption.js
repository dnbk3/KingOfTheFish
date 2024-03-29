import { Container, Sprite, TextStyle, Rectangle, Text, Texture } from "pixi.js";
import dataGame from "../../assets/jsondata/dataGame.json"
import { Game } from "../game";
import { GameRun } from "./gamerun";
import { GameRunLv2 } from "./gamerunlv2";
import { Bg } from "../model/bg";
import { manifest } from "../gameload/assets";
import { GameMenu } from "./gameMenu";
import { SoundManager } from "../helper/Sound";

export class GameOption extends Container {
    constructor() {
        super()
        this.x = 0
        this.y = 0

        this.exit = new Bg(0, 0, 'bgGameMenu')
        this.addChild(this.exit);


        var headTextStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 100,
            fontWeight: 'bold',
            fill: ['#00bfff', '#0066cc'],
            stroke: '#ffffff',
            strokeThickness: 6,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 10,
            dropShadowAngle: Math.PI / 4,
            dropShadowDistance: 6,
            fontStyle: 'italic', // Nghiêng chữ
        });

        this.headText = new Text('Option', headTextStyle);

        this.headText.x = dataGame.game.width / 2 - this.headText.width / 2;
        this.headText.y = dataGame.game.height / 2 - this.headText.height - 170;



        // Tạo một đối tượng TextStyle cho chữ "Level 1"
        var contentTextStyle = new TextStyle({
            fill: "#2b2a7e",
            fontFamily: "\"Times New Roman\", Times, serif",
            fontSize: 37,
            fontVariant: "small-caps",
            fontWeight: 200,
            letterSpacing: -1,
            stroke: "#3a28bd",
            wordWrap: true,
            wordWrapWidth: 440
        });

        // Tạo một đối tượng Text cho chữ "Level 1" với TextStyle tương ứng
        this.contentText = new Text("Choose the level you want!", contentTextStyle);

        // Đặt vị trí của chữ "Level"
        this.contentText.x = dataGame.game.width / 2 - this.contentText.width / 2;
        this.contentText.y = dataGame.game.height / 2 - this.contentText.height - 130;

        this.addChild(this.headText)
        this.addChild(this.contentText)

        const bgGameMenu = manifest.bundles.find(bundle => bundle.name === 'sprite');

        this.level1 = new Sprite(Texture.from(bgGameMenu.assets['btn_level1']))
        this.level1.scale.set(0.4)
        this.level1.anchor.set(0.5)
        this.level1.x = dataGame.game.width / 2
        this.level1.y = dataGame.game.height / 2
        this.addChild(this.level1)

        this.level1.interactive = true;
        this.level1.on('pointerover', this.onPointerOver.bind(this.level1));
        this.level1.on('pointerout', this.onPointerOut.bind(this.level1));
        this.level1.on('click', this.onClickStartLv1.bind(this.level1))

        this.level2 = new Sprite(Texture.from(bgGameMenu.assets['btn_level2']))
        this.level2.scale.set(0.4)
        this.level2.anchor.set(0.5)
        this.level2.x = dataGame.game.width / 2
        this.level2.y = dataGame.game.height / 2 + 90
        this.addChild(this.level2)

        this.level2.interactive = true;
        this.level2.on('pointerover', this.onPointerOver.bind(this.level2));
        this.level2.on('pointerout', this.onPointerOut.bind(this.level2));
        this.level2.on('click', this.onClickStartLv2.bind(this.level2))

        this.exit = new Sprite(Texture.from(bgGameMenu.assets['btn_exit']))
        this.exit.scale.set(0.4)
        this.exit.anchor.set(0.5)
        this.exit.x = dataGame.game.width / 2
        this.exit.y = dataGame.game.height / 2 + 180
        this.addChild(this.exit)

        this.exit.interactive = true;
        this.exit.on('pointerover', this.onPointerOver.bind(this.exit));
        this.exit.on('pointerout', this.onPointerOut.bind(this.exit));
        this.exit.on('click', this.onClickBack.bind(this.exit))

    }

    onPointerOver() {
        var scale_x = this.scale.x;
        var scale_y = this.scale.y;
        this.scale.set(scale_x + 0.05, scale_y + 0.05)
    }

    onPointerOut() {
        var scale_x = this.scale.x;
        var scale_y = this.scale.y;
        this.scale.set(scale_x - 0.05, scale_y - 0.05)
    }

    onClickStartLv1() {
        Game.resetTime()
        SoundManager.stop_home()
        Game.chanceScene(new GameRun(false))
    }

    onClickStartLv2() {
        Game.resetTime()
        SoundManager.stop_home()
        Game.chanceScene(new GameRunLv2())
    }

    onClickBack() {
        Game.chanceScene(new GameMenu())
    }

    destroy() {
        while (this.children.length > 0) {
            this.children[0].destroy()
            this.removeChild(this.children[0]);
        }
        super.destroy();
    }

}