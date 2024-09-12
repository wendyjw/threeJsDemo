/**
 * @Author: wenjwu
 * @Date: 2024-09-05 11:15:12
 * @LastEditors: wuwenjun
 * @LastEditTime: 2024-09-12 10:14:36
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

// 创建网格
const cube = new THREE.Mesh(geometry, material);
cube.position.set(1, 0, 0);
// 场景添加立方体
scene.add(cube);
// 设置相机位置
camera.position.z = 5;

// 设置相机朝向 原点（默认）
camera.lookAt(0, 0, 0);

// 添加坐标轴,x,y,z的默认尺寸都是5
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

  // 渲染
  renderer.render(scene, camera);
}

animate();

// Vector3 该类表示的是一个三维向量，基于箭头原点的方向. 必须为单位向量.
const dir = new THREE.Vector3(1, 2, 0);

// 将dir向量转换为单位向量。单位向量是长度为1的向量，但保持原始向量的方向。这是通过将向量的每个分量除以向量的长度来实现的。
dir.normalize();

// 箭头的原点
const origin = new THREE.Vector3(0, 0, 0);
// 箭头的长度;
const length = 2;
// 颜色
const hex = 0xffff00;

const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
scene.add(arrowHelper);
