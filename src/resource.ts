import { Texture, Loader } from "excalibur";

const Resources = {
  // dummy: new Texture("./assets/dummy.png"),
};

const loader = new Loader();

for (const res in Resources) {
  loader.addResource((Resources as any)[res]);
}

loader.suppressPlayButton = false;

export { Resources, loader };
