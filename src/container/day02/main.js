/**
 * @Author: wuwenjun
 * @Date: 2024-10-14 20:08:42
 * @LastEditors: wuwenjun
 * @LastEditTime: 2024-10-23 09:13:33
 * @Description: TODO
 */

import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // 视角，越大，看到东西越多
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面。相机最近能看到多少
  1000 // 远平面。相机最远能看到多少
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 添加坐标轴
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
let geometry = new THREE.BoxGeometry(1, 1, 100);
let mesh = new THREE.Mesh(geometry, material);
mesh.position.set(3, 0, 0); // x y z 是相对于父元素的位置，（局部坐标）
scene.add(mesh);
scene.fog = new THREE.Fog(0xc99999, 0.1, 50);
renderer.render(scene, camera);

const gui = new GUI();
