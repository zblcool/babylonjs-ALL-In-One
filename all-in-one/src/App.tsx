import React from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, PointerDragBehavior } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";
import { Inspector } from '@babylonjs/inspector';

let box: any; // Define the box object which will be able to be accessed by other functions
let ground : any;

const onSceneReady = (scene : Scene) => {

  Inspector.Show(scene, {});
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
 // Our built-in 'ground' shape.
 ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

  var pointerDragBehavior = new PointerDragBehavior({dragPlaneNormal: new Vector3(0,1,0)});
    
  // Use drag plane in world space
  pointerDragBehavior.useObjectOrientationForDragging = false;

  // Listen to drag events
  pointerDragBehavior.onDragStartObservable.add((event)=>{
      console.log("dragStart");
      console.log(event);
  })
  pointerDragBehavior.onDragObservable.add((event)=>{
      console.log("drag");
      console.log(event);
  })
  pointerDragBehavior.onDragEndObservable.add((event)=>{
      console.log("dragEnd");
      console.log(event);
  })

  // If handling drag events manually is desired, set move attached to false
  // pointerDragBehavior.moveAttached = false;

  box.addBehavior(pointerDragBehavior);
  // Move the box upward 1/2 its height
  box.position.y = 1;

 
};


/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene : Scene) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

const App = () => (

  <div id="canvasWrapper">
    <SceneComponent antialias onSceneReady={onSceneReady} observeCanvasResize adaptToDeviceRatio onRender={onRender} id="my-canvas" />
  </div>
);
export default App;