import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const initialRotation = useRef({ y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      // Enable shadow maps in the renderer
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Add ambient light with lower intensity
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);

      // Add directional light with shadows
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);
      directionalLightRef.current = directionalLight;

      // Create cube geometry and material
      const geometry = new THREE.BoxGeometry(3, 5, 0.02);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      cube.receiveShadow = true;
      cubeRef.current = cube;
      scene.add(cube);

      // Set the target of the directional light to the cube
      const lightTarget = new THREE.Object3D();
      lightTarget.position.copy(cube.position);
      scene.add(lightTarget);
      directionalLight.target = lightTarget;

      const handleMouseDown = (event: MouseEvent) => {
        if (event.button === 0) { // Left mouse button
          isDragging.current = true;
          dragStart.current = { x: event.clientX, y: event.clientY };
          initialRotation.current = { y: cube.rotation.y };
        }
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (isDragging.current && cubeRef.current) {
          const deltaY = (event.clientX - dragStart.current.x) * 0.01;
          cubeRef.current.rotation.y = initialRotation.current.y + deltaY;
        }
        if (directionalLightRef.current) {
          const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
          directionalLightRef.current.position.set(mouseX * 5, mouseY * 5, 5);
          directionalLightRef.current.lookAt(cube.position);
        }
      };

      const handleMouseUp = (event: MouseEvent) => {
        if (event.button === 0) { // Left mouse button
          isDragging.current = false;
        }
      };

      const handleTouchStart = (event: TouchEvent) => {
        isDragging.current = true;
        dragStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        initialRotation.current = { y: cube.rotation.y };
      };

      const handleTouchMove = (event: TouchEvent) => {
        if (isDragging.current && cubeRef.current) {
          const deltaY = (event.touches[0].clientX - dragStart.current.x) * 0.01;
          cubeRef.current.rotation.y = initialRotation.current.y + deltaY;
        }
        if (directionalLightRef.current) {
          const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
          const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
          directionalLightRef.current.position.set(mouseX * 5, mouseY * 5, 5);
          directionalLightRef.current.lookAt(cube.position);
        }
      };

      const handleTouchEnd = () => {
        isDragging.current = false;
      };

      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      const renderScene = () => {
        if (!isDragging.current && cubeRef.current) {
          cubeRef.current.rotation.y += (0 - cubeRef.current.rotation.y) * 0.05;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };
      renderScene();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);

  return <div className='absolute pointer-events-none	' ref={containerRef} />;
};

export default ThreeScene;
