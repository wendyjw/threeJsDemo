/**
 * @Author: wuwenjun
 * @Date: 2024-09-14 17:10:22
 * @LastEditors: wuwenjun
 * @LastEditTime: 2024-09-18 19:58:17
 * @Description: TODO
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
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
const gem = new THREE.BufferGeometry();
const vertices = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);
gem.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});

const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
gem.setIndex(new THREE.BufferAttribute(indices, 1));

const plane = new THREE.Mesh(gem, material);
scene.add(plane);

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
