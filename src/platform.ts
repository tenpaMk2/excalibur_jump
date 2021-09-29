import { Actor, Body, Collider, CollisionType, Color, Shape } from "excalibur";

export class Platform extends Actor {
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
}
