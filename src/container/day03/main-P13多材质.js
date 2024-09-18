/**
 * @Author: wuwenjun
 * @Date: 2024-09-18 20:00:27
 * @LastEditors: wuwenjun
 * @LastEditTime: 2024-09-18 20:23:50
 * @Description: TODO
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // 视角，越大，看到东西越多
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面。相机最近能看到多少
  1000 // 远平面。相机最远能看到多少
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material0 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material1 = new THREE.MeshBasicMaterial({ color: 0xff00 });
const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const material3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const material4 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const material5 = new THREE.MeshBasicMaterial({ color: 0x00ffff });

const cubeMaterials = [
  material0,
  material1,
  material2,
  material3,
  material4,
  material5,
];

// 创建网格
const cube = new THREE.Mesh(geometry, cubeMaterials);
// 场景添加立方体

scene.add(cube);

camera.position.z = 5;
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function render() {
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();
