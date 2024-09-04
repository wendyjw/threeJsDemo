import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import * as THREE from "three";

import "./App.css";

function App() {
  useEffect(() => {
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
    // 场景添加立方体
    scene.add(cube);
    // 设置相机位置
    camera.position.z = 5;
    // 设置相机朝向 原点（默认）
    camera.lookAt(0, 0, 0);

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // 渲染
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <div className="App"></div>;
}

export default App;
