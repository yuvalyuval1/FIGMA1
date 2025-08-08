import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

interface CodeLaptopProps {
  className?: string;
}

const CodeLaptop: React.FC<CodeLaptopProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    composer: EffectComposer;
    laptop: THREE.Group;
    particles: THREE.Points;
    codeCanvas: HTMLCanvasElement;
    codeTexture: THREE.CanvasTexture;
    animation: {
      frameId: number | null;
      rotation: { x: number; y: number };
      target: { x: number; y: number };
      momentum: { x: number; y: number };
    };
  } | null>(null);

  // Code animation state
  const codeLines = useMemo(() => [
    'const websiteBuilder = () => {',
    '  const [innovation, setInnovation] = useState(true);',
    '  const [performance, setPerformance] = useState("high");',
    '  ',
    '  useEffect(() => {',
    '    createAmazingWebsites();',
    '    optimizeUserExperience();',
    '  }, []);',
    '  ',
    '  return (',
    '    <div className="modern-website">',
    '      <Header responsive={true} />',
    '      <Content interactive={true} />',
    '      <Footer elegant={true} />',
    '    </div>',
    '  );',
    '};'
  ], []);

  const initializeScene = () => {
    if (!containerRef.current) return null;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0118, 10, 50);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x8b5cf6, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Neon point lights
    const pointLight1 = new THREE.PointLight(0x8b5cf6, 1, 20);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 1, 20);
    pointLight2.position.set(5, 5, 5);
    scene.add(pointLight2);

    // Create laptop geometry
    const laptop = new THREE.Group();

    // Laptop base
    const baseGeometry = new THREE.BoxGeometry(6, 0.3, 4);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2a2a2a,
      shininess: 100
    });
    const laptopBase = new THREE.Mesh(baseGeometry, baseMaterial);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    laptop.add(laptopBase);

    // Screen
    const screenGeometry = new THREE.BoxGeometry(5.5, 3.5, 0.1);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 2, -1.8);
    screen.rotation.x = -0.1;
    laptop.add(screen);

    // Code canvas for screen
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 1024;
    codeCanvas.height = 768;
    const codeCtx = codeCanvas.getContext('2d');
    if (codeCtx) {
      codeCtx.fillStyle = '#0a0118';
      codeCtx.fillRect(0, 0, 1024, 768);
    }

    const codeTexture = new THREE.CanvasTexture(codeCanvas);
    codeTexture.minFilter = THREE.LinearFilter;
    codeTexture.magFilter = THREE.LinearFilter;

    const screenDisplayGeometry = new THREE.PlaneGeometry(5.3, 3.3);
    const screenDisplayMaterial = new THREE.MeshBasicMaterial({ 
      map: codeTexture,
      transparent: true
    });
    const screenDisplay = new THREE.Mesh(screenDisplayGeometry, screenDisplayMaterial);
    screenDisplay.position.set(0, 2, -1.75);
    screenDisplay.rotation.x = -0.1;
    laptop.add(screenDisplay);

    // Keyboard keys
    const keyGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.3);
    const keyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.1
    });

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        const key = new THREE.Mesh(keyGeometry, keyMaterial.clone());
        key.position.set(
          (col - 5.5) * 0.4,
          0.2,
          (row - 1.5) * 0.4
        );
        laptop.add(key);
      }
    }

    // Trackpad
    const trackpadGeometry = new THREE.BoxGeometry(2, 0.02, 1.5);
    const trackpadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x444444,
      shininess: 100
    });
    const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
    trackpad.position.set(0, 0.18, 1);
    laptop.add(trackpad);

    // Neon rings decoration
    const ringGeometry = new THREE.TorusGeometry(0.8, 0.02, 8, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6
    });
    
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial.clone());
      ring.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 8,
        Math.sin(i * Math.PI * 2 / 3) * 2 + 2,
        Math.sin(i * Math.PI * 2 / 3) * 8
      );
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      scene.add(ring);
    }

    // Floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;     // x
      positions[i + 1] = (Math.random() - 0.5) * 20; // y
      positions[i + 2] = (Math.random() - 0.5) * 20; // z
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    scene.add(laptop);

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    composer.addPass(bloomPass);

    return {
      scene,
      camera,
      renderer,
      composer,
      laptop,
      particles,
      codeCanvas,
      codeTexture,
      animation: {
        frameId: null,
        rotation: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        momentum: { x: 0, y: 0 }
      }
    };
  };

  const updateCodeAnimation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Clear canvas
    ctx.fillStyle = '#0a0118';
    ctx.fillRect(0, 0, 1024, 768);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 1024, 768);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 768);

    // Draw matrix rain effect
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    for (let i = 0; i < 20; i++) {
      const x = (i * 50) % 1024;
      const y = (time * 0.1 + i * 100) % 768;
      ctx.fillRect(x, y, 2, 20);
    }

    // Draw ASCII frame
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, 924, 668);

    // Draw code lines
    ctx.font = '24px monospace';
    ctx.fillStyle = '#ffffff';
    
    const visibleLines = Math.floor((time * 0.001) % (codeLines.length + 2));
    
    codeLines.slice(0, visibleLines).forEach((line, index) => {
      ctx.fillStyle = line.includes('const') || line.includes('return') ? '#ec4899' : 
                     line.includes('useEffect') || line.includes('useState') ? '#8b5cf6' :
                     line.includes('//') ? '#666666' : '#ffffff';
      ctx.fillText(line, 80, 100 + index * 35);
    });

    // Blinking cursor
    if (Math.floor(time * 0.002) % 2 === 0) {
      const cursorY = 100 + visibleLines * 35;
      ctx.fillStyle = '#8b5cf6';
      ctx.fillRect(80 + (visibleLines < codeLines.length ? codeLines[visibleLines]?.length * 14 : 0) || 80, cursorY - 20, 12, 25);
    }
  };

  const animate = (time: number) => {
    const sceneData = sceneRef.current;
    if (!sceneData) return;

    const { scene, camera, composer, laptop, particles, codeCanvas, codeTexture, animation } = sceneData;

    // Update code animation
    const ctx = codeCanvas.getContext('2d');
    if (ctx) {
      updateCodeAnimation(ctx, time);
      codeTexture.needsUpdate = true;
    }

    // Smooth rotation with momentum
    animation.momentum.x += (animation.target.x - animation.rotation.x) * 0.02;
    animation.momentum.y += (animation.target.y - animation.rotation.y) * 0.02;
    
    animation.momentum.x *= 0.95;
    animation.momentum.y *= 0.95;
    
    animation.rotation.x += animation.momentum.x;
    animation.rotation.y += animation.momentum.y;
    
    laptop.rotation.x = animation.rotation.x;
    laptop.rotation.y = animation.rotation.y;

    // Animate particles
    const positions = particles.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time * 0.001 + positions[i] * 0.01) * 0.01;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y = time * 0.0005;

    // Animate keyboard key glow
    laptop.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry && child.geometry.parameters.height < 0.1) {
        const material = child.material as THREE.MeshPhongMaterial;
        if (material.emissive) {
          material.emissiveIntensity = 0.1 + Math.sin(time * 0.003 + index * 0.1) * 0.05;
        }
      }
    });

    composer.render();

    animation.frameId = requestAnimationFrame(animate);
  };

  const handlePointerEvent = (clientX: number, clientY: number, isDown: boolean) => {
    const sceneData = sceneRef.current;
    if (!sceneData || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    if (isDown) {
      sceneData.animation.target.x = Math.max(-0.5, Math.min(0.5, y * 0.5));
      sceneData.animation.target.y = Math.max(-1, Math.min(1, x * 1));
    }
  };

  useEffect(() => {
    const sceneData = initializeScene();
    if (!sceneData) return;

    sceneRef.current = sceneData;

    // Start animation
    sceneData.animation.frameId = requestAnimationFrame(animate);

    // Event listeners
    const handleResize = () => {
      if (!containerRef.current || !sceneData) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      sceneData.camera.aspect = width / height;
      sceneData.camera.updateProjectionMatrix();
      sceneData.renderer.setSize(width, height);
      sceneData.composer.setSize(width, height);
    };

    const handlePointerDown = (e: PointerEvent) => {
      handlePointerEvent(e.clientX, e.clientY, true);
      containerRef.current?.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.buttons > 0) {
        handlePointerEvent(e.clientX, e.clientY, true);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      containerRef.current?.releasePointerCapture(e.pointerId);
    };

    // Fallback for older browsers
    const handleMouseDown = (e: MouseEvent) => handlePointerEvent(e.clientX, e.clientY, true);
    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons > 0) handlePointerEvent(e.clientX, e.clientY, true);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerEvent(touch.clientX, touch.clientY, true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerEvent(touch.clientX, touch.clientY, true);
      }
    };

    window.addEventListener('resize', handleResize);
    
    if (containerRef.current) {
      const container = containerRef.current;
      // Try pointer events first
      container.addEventListener('pointerdown', handlePointerDown);
      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('pointerup', handlePointerUp);
      
      // Fallback to mouse and touch events
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      if (sceneData.animation.frameId) {
        cancelAnimationFrame(sceneData.animation.frameId);
      }
      
      if (containerRef.current) {
        containerRef.current.removeChild(sceneData.renderer.domElement);
      }

      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current) {
        const container = containerRef.current;
        container.removeEventListener('pointerdown', handlePointerDown);
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerup', handlePointerUp);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
      }

      sceneData.renderer.dispose();
    };
  }, [codeLines]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
};

export default CodeLaptop;