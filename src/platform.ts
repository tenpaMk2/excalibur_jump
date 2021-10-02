import {
  Actor,
  Body,
  Collider,
  CollisionEndEvent,
  CollisionType,
  Color,
  Engine,
  PreCollisionEvent,
  Shape,
} from "excalibur";
import { ColliderChangable } from "./player";

export class Platform extends Actor {
  public colliderChangable: ColliderChangable[] = [];

  constructor(x: number = 0, y: number = 0, width: number, height: number) {
    super({
      x: x,
      y: y,
      color: Color.DarkGray,
      body: new Body({
        collider: new Collider({
          type: CollisionType.Fixed,
          shape: Shape.Box(width, height),
        }),
      }),
    });
  }

  addColliderChangable = (target: ColliderChangable) => {
    this.colliderChangable.push(target);
  };

  onInitialize = (engine: Engine) => {
    this.on("precollision", (event: PreCollisionEvent) => {
      if (event.side === "Bottom") {
        if (this.colliderChangable.indexOf(event.other as any) > -1) {
          event.other.body.collider.type = CollisionType.Passive;
        }
      }
    });
    this.on("collisionend", (event: CollisionEndEvent) => {
      if (this.colliderChangable.indexOf(event.other as any) > -1) {
        event.other.body.collider.type = CollisionType.Active;
      }
    });
  };
}
