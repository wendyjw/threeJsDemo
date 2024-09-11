/**
 * @Author: wenjwu
 * @Date: 2024-09-05 11:15:12
 * @LastEditors: wenjwu
 * @LastEditTime: 2024-09-05 11:42:23
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
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// 创建网格
const cube = new THREE.Mesh(geometry, material);
const parentCube = new THREE.Mesh(geometry, parentMaterial);

// 子元素添加在父元素中
parentCube.add(cube);

parentCube.position.set(-3, 0, 0);
cube.position.set(3, 0, 0); // x y z 是相对于父元素的位置，（局部坐标）
// cube.scale.set(2, 2, 2); // 相对于父元素局部缩放
parentCube.rotation.x = Math.PI / 4;
cube.rotation.x = Math.PI / 4; // 相对于父元素局部旋转
// 场景添加立方体
scene.add(parentCube);
// 设置相机位置
camera.position.z = 5;

// 设置相机朝向 原点（默认）
camera.lookAt(0, 0, 0);

// 添加坐标轴
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 开启阻尼
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.05;

function animate(params) {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  // 渲染
  renderer.render(scene, camera);
}

animate();
