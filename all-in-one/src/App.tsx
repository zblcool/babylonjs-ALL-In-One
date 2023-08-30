import React from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, PointerDragBehavior, StandardMaterial, UniversalCamera, GamepadCamera, SceneLoader, ArcRotateCamera } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";
import { Inspector } from '@babylonjs/inspector';
import MeshBahaviour from "./component/Mesh/MeshBahaviour";
import heightMap from "./images/heatmap.png"
let box: any; // Define the box object which will be able to be accessed by other functions
let ground : any;
let sphere : any;
let heatmap : any;

const onSceneReady = async (scene : Scene) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (!isMobile) {
  Inspector.Show(scene, {});
}
 
  // This creates and positions a free camera (non-mesh)
  const camera = new ArcRotateCamera("camera1",0, 0.8, 100, new Vector3(15, 15, -20), scene);
  
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
  box.position = new Vector3(4.533, 1, -4.533);
 // Our built-in 'ground' shape.




 sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
 sphere.position = new Vector3(-4.533, 1, 4.533);
 // create a heatmap 
 // the heightMap should be imported first and then passed to the createGroundFromHeightMap function
 // instead of passing a string of URL.
  ground = MeshBuilder.CreateGroundFromHeightMap("gdhm", heightMap, {width:10, height :10, subdivisions: 15, maxHeight: 3},scene);
  ground.position = new Vector3(0, 0, 0);
  // If handling drag events manually is desired, set move attached to false
  // pointerDragBehavior.moveAttached = false;

  box.addBehavior(MeshBahaviour.addPointBehaviour());
  // Move the box upward 1/2 its height
  box.position.y = 1;

  const importPromise =  SceneLoader.ImportMeshAsync(null ,"./models/my_computer/", "scene.gltf", scene);
  importPromise.then((result) => {
    //// Result has meshes, particleSystems, skeletons, animationGroups and transformNodes
    // camera.setTarget(result.meshes[0]);
    result.meshes[0].position.y =3;
    result.meshes[0].addBehavior(MeshBahaviour.addPointBehaviour());
  });
  const importPromise2 =  SceneLoader.ImportMeshAsync(null ,"./models/", "standing_desk.glb", scene);
  importPromise2.then((result) => {
    //// Result has meshes, particleSystems, skeletons, animationGroups and transformNodes
    
    result.meshes[0].position = new Vector3(2, 2, -2);
    result.meshes[0].scaling = new Vector3(2, 2, 2);
    result.meshes[0].addBehavior(MeshBahaviour.addPointBehaviour());
  });
 
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