import { PointerDragBehavior, Vector3 } from "@babylonjs/core";

const MeshBahaviour = {
  addPointBehaviour: () => {
    var pointerDragBehavior = new PointerDragBehavior({
      dragPlaneNormal: new Vector3(0, 1, 0),
    });

    // Use drag plane in world space
    pointerDragBehavior.useObjectOrientationForDragging = false;

    // Listen to drag events
    pointerDragBehavior.onDragStartObservable.add((event) => {
      console.log("dragStart");
      console.log(event);
    });
    pointerDragBehavior.onDragObservable.add((event) => {
      console.log("drag");
      console.log(event);
    });
    pointerDragBehavior.onDragEndObservable.add((event) => {
      console.log("dragEnd");
      console.log(event);
    });

    return pointerDragBehavior;
  },
};

export default MeshBahaviour;
