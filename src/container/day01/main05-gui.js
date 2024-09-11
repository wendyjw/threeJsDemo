/**
 * @Author: wenjwu
 * @Date: 2024-09-05 11:15:12
 * @LastEditors: wuwenjun
 * @LastEditTime: 2024-09-11 10:31:48
 * @Description: TODO
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
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
// 设置父元素材质为线框
parentMaterial.wireframe = true;
// 创建网格
const cube = new THREE.Mesh(geometry, material);
const parentCube = new THREE.Mesh(geometry, parentMaterial);

// 子元素添加在父元素中
parentCube.add(cube);

parentCube.position.set(-3, 0, 0);
cube.position.set(3, 0, 0); // x y z 是相对于父元素的位置，（局部坐标）

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

window.addEventListener("resize", () => {
  // 更新渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 更新摄像头宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  // 设置渲染器的像素比
  // renderer.setPixelRatio(window.devicePixelRatio);
});

const gui = new GUI();

const myObject = {
  myBoolean: true,
  myString: "lil-gui",
  myNumber: 1,
  color: "#AA00FF",

  Fullscreen: function () {
    console.log("全屏");
    renderer.domElement.requestFullscreen();
  },
  ExitFullscreen: function () {
    console.log("退出全屏");
    renderer.domElement.ExitFullscreen();
  },
};
gui.add(myObject, "title");
gui.add(myObject, "myBoolean"); // Checkbox
gui.add(myObject, "myString");
gui.add(myObject, "myNumber", 1, 100, 10);
gui.add(myObject, "Fullscreen");

const obj = {
  scale: 0.5,
  x: 0,
  y: 0,
  z: 0,
};
gui.add(obj, "scale", 0, 1);
const folder = gui.addFolder("Position");
folder.add(obj, "x").onChange((value) => {
  camera.position.x = value;
});
folder.add(cube.position, "y", -5, 5, 1).name("立方体Y位置"); // object property min max step
folder.add(cube.position, "z").min(-10).max(10).step(1).name("立方体Z位置");

gui.add(parentMaterial, "wireframe").name("父元素材质");

const colorParams = {
  cubeColor: "#AA00FF",
};
gui
  .addColor(colorParams, "cubeColor")
  .name("子元素颜色")
  .onChange((value) => {
    cube.material.color.set(value);
  });
