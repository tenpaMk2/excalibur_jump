import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Shape,
  Vector,
} from "excalibur";

export type ColliderChangable = {
  bePassive: () => void;
  beActive: () => void;
};

export class Player extends Actor implements ColliderChangable {
  constructor(x: number = 0, y: number = 0, width: number, height: number) {
    super({
      x: x,
      y: y,
      color: Color.Green,
      acc: new Vector(0, 980),
      body: new Body({
        collider: new Collider({
          type: CollisionType.Active,
          shape: Shape.Box(width, height),
        }),
      }),
    });
  }

  bePassive = () => {
    this.body.collider.type = CollisionType.Passive;
  };

  beActive = () => {
    this.body.collider.type = CollisionType.Active;
  };
}
