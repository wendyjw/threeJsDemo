/**
 * @Author: wuwenjun
 * @Date: 2024-10-14 20:08:42
 * @LastEditors: wuwenjun
 * @LastEditTime: 2024-10-14 20:09:14
 * @Description: TODO
 */

import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { transpile } from "typescript";
// require("../../../public/imgs/img2.jpeg")
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, // 视角，越大，看到东西越多
  window.innerWidth / window.innerHeight, // 宽高比
  1, // 近平面。相机最近能看到多少
  500 // 远平面。相机最远能看到多少
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let textureLoader = new THREE.TextureLoader();

// 加载纹理贴图
let texture = textureLoader.load("./imgs/img1.jpg"); // 路径默认为public 下
let aoMap = textureLoader.load("./imgs/img2.jpeg");
let material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: texture,
  // transparent: true, // 透明
  // opacity: 0.9,
  aoMap: aoMap, // 设置环境贴图
});

let geometry = new THREE.BoxGeometry(30, 30, 30);
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

const gui = new GUI();
gui
  .add(material, "aoMapIntensity")
  .name("aoMapIntensity")
  .min(0)
  .max(1)
  .step(0.01);
