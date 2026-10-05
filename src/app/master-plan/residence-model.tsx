'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const residenceModels: Record<string, string> = {
  A: '/models/A101_beige_furnished_v3.glb',
  B: '/models/B81_website_ready.glb',
  C: '/models/C68_website_v3.glb',
};

export default function ResidenceModel({ src }: { src: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('3D загвар ачаалж байна…');

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    let disposed = false;
    let model: THREE.Object3D | undefined;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      const timer = window.setTimeout(() => setStatus('3D загварыг энэ төхөөрөмж дээр харуулах боломжгүй байна.'), 0);
      return () => window.clearTimeout(timer);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.setAttribute('aria-label', 'Сууцны 3D загвар');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f8fafc');
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb1a99b, 3));
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(10, 20, 10);
    scene.add(light);
    const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    function disposeModel(object: THREE.Object3D) {
      const textures = new Set<THREE.Texture>();
      object.traverse(child => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry.dispose();
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        for (const material of materials) {
          for (const value of Object.values(material)) {
            if (value instanceof THREE.Texture) textures.add(value);
          }
          material.dispose();
        }
      });
      textures.forEach(texture => texture.dispose());
    }
    new GLTFLoader().load(src, gltf => {
      if (disposed) {
        disposeModel(gltf.scene);
        return;
      }
      model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const center = bounds.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const size = bounds.getSize(new THREE.Vector3());
      const radius = Math.max(size.length() / 2, 0.1);
      const distance = radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)) * Math.max(1, 1 / camera.aspect) * 1.1;
      camera.near = radius / 100;
      camera.far = distance + radius * 20;
      camera.position.copy(new THREE.Vector3(1, 1.5, 1).normalize().multiplyScalar(distance));
      camera.updateProjectionMatrix();
      controls.minDistance = radius * 0.3;
      controls.maxDistance = distance * 3;
      controls.update();
      scene.add(model);
      setStatus('');
    }, undefined, () => {
      if (!disposed) setStatus('3D загварыг ачаалж чадсангүй. Хуудсаа дахин ачаална уу.');
    });
    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });
    return () => {
      disposed = true;
      observer.disconnect();
      renderer.setAnimationLoop(null);
      controls.dispose();
      if (model) disposeModel(model);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src]);

  return <div className="mt-4"><div className="relative"><div ref={container} className="h-[420px] w-full overflow-hidden rounded-lg min-[700px]:h-[560px]" />{status && <p role="status" className="absolute inset-0 grid place-items-center px-4 text-center text-sm text-slate-500">{status}</p>}</div><p className="mt-2 text-xs text-slate-500">Чирж эргүүлэх · Гүйлгэж ойртуулах, холдуулах</p></div>;
}
