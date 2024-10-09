/**
 * @Author: wuwenjun
 * @Date: 2024-09-30 16:55:16
 * @LastEditors: wuwenjun
 * @LastEditTime: 2024-09-30 16:55:17
 * @Description: TODO
 */
import * as THREE from "three";
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

// 创建材质
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
// 场景添加线
scene.add(line);

// 渲染
renderer.render(scene, camera);
