import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Engine,
  Shape,
  UIActor,
  Vector,
} from "excalibur";

export class UIArrow extends UIActor {
  public arrowStick: Actor;

  constructor(public endX: number, public endY: number) {
    super({
      x: endX,
      y: endY,
    });

    this.add(
      new Actor({
        pos: Vector.Zero,
        color: Color.Red,
        body: new Body({
          collider: new Collider({
            type: CollisionType.Active,
            shape: Shape.Circle(20),
          }),
        }),
      })
    );
  }

  onInitialize = (engine: Engine) => {
    this.arrowStick = new Actor({
      pos: Vector.Zero,
      color: Color.Vermilion,
      anchor: new Vector(0.5, 1),
      body: new Body({
        collider: new Collider({
          type: CollisionType.Active,
          shape: Shape.Box(500, 20, new Vector(1, 0.5)),
        }),
      }),
    });

    this.add(this.arrowStick);
  };

  setStartPoint = (startX: number, startY: number) => {
    const startPos = new Vector(startX, startY);
    const endPos = new Vector(this.endX, this.endY);
    const arrow = endPos.sub(startPos);

    this.arrowStick.body.rotation = arrow.toAngle();
    this.arrowStick.body.useBoxCollider(arrow.size, 20, new Vector(1, 0.5));
    // this.arrowStick.width = arrow.size;
  };
}
