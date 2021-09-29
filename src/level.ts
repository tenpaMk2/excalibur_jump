import { Scene, Engine, Actor, Vector, Color, UIActor } from "excalibur";
import { PointerDownEvent, PointerUpEvent } from "excalibur/dist/Input";
import { Platform } from "./platform";
import { Player } from "./player";

export class Level extends Scene {
  constructor(engine: Engine) {
    super(engine);
  }

  onInitialize = (engine: Engine) => {
    const player = new Player(
      engine.halfDrawWidth,
      engine.drawHeight * 0.8,
      engine.drawWidth * 0.1,
      engine.drawWidth * 0.1
    );
    engine.add(player);

    const platformHeight = engine.drawHeight * 0.02;

    const initialPlatform = new Platform(
      engine.halfDrawWidth,
      engine.drawHeight * 0.95,
      engine.drawWidth * 0.8,
      platformHeight
    );
    engine.add(initialPlatform);

    const platforms = [];
    platforms.push(
      new Platform(380, 590, engine.drawWidth * 0.8, platformHeight)
    );

    let dragStartPos: Vector;
    engine.input.pointers.primary.on("down", (event: PointerDownEvent) => {
      dragStartPos = event.pos.clone();
      console.log(event.pos);
    });
    engine.input.pointers.primary.on("up", (event: PointerUpEvent) => {
      const vel = event.pos.sub(dragStartPos).negate();
      player.vel = vel;
      console.log(event.pos);
    });
    // engine.input.pointers.primary.on("move", (event: PointerMoveEvent) => {
    //   console.log(event.pos);
    // });
    // engine.input.pointers.on("move", (event: PointerMoveEvent) => {
    //   console.log(`${event.pos}`);
    // });

    platforms.forEach((platform) => engine.add(platform));

    // const hoge = new Actor({
    //   pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
    //   width: engine.halfDrawWidth,
    //   height: engine.halfDrawHeight,
    //   color: Color.Chartreuse,
    // });
    // engine.add(hoge);
    // hoge.onPreUpdate = () => {
    //   hoge.width = engine.halfCanvasWidth;
    // };

    // const fuga = new UIActor({
    //   x: engine.drawWidth * 0.1,
    //   y: engine.drawHeight * 0.1,
    //   width: 10,
    //   height: 10,
    //   color: Color.Black,
    // });
    // engine.add(fuga);

    // const piyo = new Actor({
    //   pos: Vector.Zero,
    //   anchor: Vector.Zero,
    //   width: 200,
    //   height: 5,
    //   color: Color.Blue,
    // });
    // fuga.add(piyo);

    // engine.currentScene.camera.zoom(2, 1000);
  };
}
