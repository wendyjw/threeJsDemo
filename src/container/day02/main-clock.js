/**
 * @Author: wuwenjun
 * @Date: 2024-09-12 10:19:08
 * @LastEditors: wuwenjun
 * @LastEditTime: 2024-09-12 10:24:47
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
// 旋转
cube.rotation.set(Math.PI / 4, 0, 0, "XZY");
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

//  初始化时钟
const clock = new THREE.Clock();

function render() {
  // 获取时钟运行的总时长
  let time = clock.getElapsedTime();
  let t = time % 5;
  cube.position.x = t * 1;
  // // 获取2帧之间的时间间隔
  // let deltaTime = clock.getElapsedTime();
  // console.log("2帧之间的时间间隔：", deltaTime);
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();
