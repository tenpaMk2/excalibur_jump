import { Scene, Engine, Actor, Vector, Color, UIActor } from "excalibur";

export class Level extends Scene {
  constructor(engine: Engine) {
    super(engine);
  }

  onInitialize = (engine: Engine) => {
    const hoge = new Actor({
      pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
      width: engine.halfDrawWidth,
      height: engine.halfDrawHeight,
      color: Color.Chartreuse,
    });
    engine.add(hoge);
    hoge.onPreUpdate = () => {
      hoge.width = engine.halfCanvasWidth;
    };

    const fuga = new UIActor({
      x: engine.drawWidth * 0.1,
      y: engine.drawHeight * 0.1,
      width: 10,
      height: 10,
      color: Color.Black,
    });
    engine.add(fuga);

    const piyo = new Actor({
      pos: Vector.Zero,
      anchor: Vector.Zero,
      width: 200,
      height: 5,
      color: Color.Blue,
    });
    fuga.add(piyo);

    engine.currentScene.camera.zoom(2, 1000);
  };
}
