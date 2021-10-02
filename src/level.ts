import { Scene, Engine, Vector } from "excalibur";
import {
  PointerDownEvent,
  PointerMoveEvent,
  PointerUpEvent,
} from "excalibur/dist/Input";
import { Platform } from "./platform";
import { Player } from "./player";
import { UIArrow } from "./ui_arrow";

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

    const platforms: Platform[] = [];
    platforms.push(
      new Platform(380, 590, engine.drawWidth * 0.8, platformHeight)
    );
    platforms.forEach((platform) => {
      engine.add(platform);
      platform.addColliderChangable(player);
    });

    let dragStartPos: Vector;
    let arrow: UIArrow;
    engine.input.pointers.primary.on("down", (event: PointerDownEvent) => {
      dragStartPos = event.pos.clone();
      console.log(event.pos);

      arrow = new UIArrow(event.pos.x, event.pos.y);
      engine.add(arrow);
    });
    engine.input.pointers.primary.on("move", (event: PointerMoveEvent) => {
      arrow?.setStartPoint(event.pos.x, event.pos.y);
      // console.log(event);
    });
    engine.input.pointers.primary.on("up", (event: PointerUpEvent) => {
      const vel = dragStartPos.sub(event.pos);
      vel.y = -Math.sqrt(Math.abs(vel.y * 980 * 1.5));
      player.vel = vel;

      arrow.kill();
      arrow = undefined;
    });
    // engine.input.pointers.primary.on("move", (event: PointerMoveEvent) => {
    //   console.log(event.pos);
    // });
    // engine.input.pointers.on("move", (event: PointerMoveEvent) => {
    //   console.log(`${event.pos}`);
    // });
  };
}
