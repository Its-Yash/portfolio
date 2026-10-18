"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

interface DesignLab3DCanvasProps {
  styleId: string;
  styleName: string;
  category: string;
  className?: string;
}

export function DesignLab3DCanvas({
  styleId,
  styleName,
  category,
  className = "",
}: DesignLab3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [cameraAngle, setCameraAngle] = useState({ yaw: 0, pitch: 0 });

  // Refs for animation loop and Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const currentObjectRef = useRef<THREE.Object3D | null>(null);
  const satellitesGroupRef = useRef<THREE.Group | null>(null);
  const groundShadowRef = useRef<THREE.Mesh | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Interaction tracking refs
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    currentRotX: 0,
    currentRotY: 0,
    targetRotX: 0,
    targetRotY: 0,
  });

  // Scale transition ref for style change
  const transitionRef = useRef({ progress: 1.0, isMorphing: false });

  // -------------------------------------------------------------
  // Procedural 3D Geometry & Material Builders for all 22 Archetypes
  // -------------------------------------------------------------
  const buildArchetypeObject = useCallback((id: string): THREE.Object3D => {
    const group = new THREE.Group();

    // Reusable Materials
    const clayMat = new THREE.MeshPhysicalMaterial({
      color: 0xedeae4,
      roughness: 0.75,
      metalness: 0.05,
      clearcoat: 0.1,
      clearcoatRoughness: 0.3,
    });

    const inkSolidMat = new THREE.MeshBasicMaterial({
      color: 0x0d0d0d,
    });

    const inkLineMat = new THREE.LineBasicMaterial({
      color: 0x0d0d0d,
      linewidth: 2,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.12,
      ior: 1.52,
      thickness: 1.5,
      specularIntensity: 1.0,
      specularColor: 0xffffff,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xd8d6cf,
      metalness: 0.95,
      roughness: 0.15,
    });

    const matteWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xfaf8f5,
      roughness: 0.4,
      metalness: 0.05,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x0d0d0d,
      wireframe: true,
    });

    switch (id) {
      case "claymorphism": {
        // Puffy pillowy inflated 3D shape (Torus + central capsule)
        const torus = new THREE.Mesh(
          new THREE.TorusGeometry(0.9, 0.42, 32, 64),
          clayMat
        );
        const centerSphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 32, 32),
          new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.6,
            metalness: 0.0,
          })
        );
        group.add(torus, centerSphere);
        break;
      }

      case "cybercore": {
        // Faceted icosahedron with dual orbiting wireframe telemetry rings
        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.85, 0),
          matteWhiteMat
        );
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.85, 0)),
          inkLineMat
        );
        const ring1 = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.RingGeometry(1.2, 1.25, 32)),
          inkLineMat
        );
        ring1.rotation.x = Math.PI / 3;
        const ring2 = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.RingGeometry(1.4, 1.44, 32)),
          new THREE.LineBasicMaterial({ color: 0x77756f })
        );
        ring2.rotation.y = Math.PI / 4;
        group.add(core, edges, ring1, ring2);
        break;
      }

      case "neo-brutalism": {
        // Chunky block with high-contrast pitch black edge outline and offset slab
        const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const boxMesh = new THREE.Mesh(boxGeo, matteWhiteMat);
        const boxEdges = new THREE.LineSegments(
          new THREE.EdgesGeometry(boxGeo),
          new THREE.LineBasicMaterial({ color: 0x0d0d0d, linewidth: 3 })
        );
        // Offset brutalist drop-slab
        const shadowSlab = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 1.2, 0.15),
          inkSolidMat
        );
        shadowSlab.position.set(0.18, -0.18, -0.68);
        group.add(boxMesh, boxEdges, shadowSlab);
        break;
      }

      case "glassmorphism": {
        // Multi-faceted refractive diamond prism with inner glowing core
        const prismGeo = new THREE.OctahedronGeometry(1.1, 0);
        const prismMesh = new THREE.Mesh(prismGeo, glassMat);
        const innerGeo = new THREE.IcosahedronGeometry(0.45, 0);
        const innerMesh = new THREE.Mesh(innerGeo, chromeMat);
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(prismGeo),
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
        );
        group.add(prismMesh, innerMesh, edges);
        break;
      }

      case "neumorphism": {
        // Sculpted debossed / embossed dual cylinders integrated into soft surface
        const pedestal = new THREE.Mesh(
          new THREE.CylinderGeometry(1.3, 1.35, 0.28, 48),
          clayMat
        );
        const button = new THREE.Mesh(
          new THREE.CylinderGeometry(0.8, 0.8, 0.35, 36),
          new THREE.MeshPhysicalMaterial({
            color: 0xf4f2ee,
            roughness: 0.85,
            metalness: 0.02,
          })
        );
        button.position.y = 0.22;
        group.add(pedestal, button);
        break;
      }

      case "bento-grid": {
        // 3D modular compartments arranged in an architectural grid
        const compartments = [
          { size: [0.9, 0.9, 0.35], pos: [-0.55, 0.55, 0] },
          { size: [0.9, 0.9, 0.35], pos: [0.55, 0.55, 0] },
          { size: [2.0, 0.85, 0.35], pos: [0, -0.5, 0] },
        ];
        compartments.forEach(({ size, pos }) => {
          const [w, h, d] = size;
          const [x, y, z] = pos;
          const geo = new THREE.BoxGeometry(w, h, d);
          const mesh = new THREE.Mesh(geo, matteWhiteMat);
          const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geo), inkLineMat);
          mesh.position.set(x, y, z);
          edge.position.set(x, y, z);
          group.add(mesh, edge);
        });
        break;
      }

      case "surrealism": {
        // Impossible floating 3D Torus Knot with floating satellite moon
        const knot = new THREE.Mesh(
          new THREE.TorusKnotGeometry(0.75, 0.24, 128, 32, 2, 3),
          chromeMat
        );
        const moon = new THREE.Mesh(
          new THREE.SphereGeometry(0.28, 32, 32),
          clayMat
        );
        moon.position.set(1.2, 0.8, -0.3);
        group.add(knot, moon);
        break;
      }

      case "y2k-aesthetic": {
        // Chrome 4-pointed 3D extruded star surrounded by an orbit ring
        const starShape = new THREE.Shape();
        const points = 4;
        const outerR = 1.1;
        const innerR = 0.35;
        for (let i = 0; i < points * 2; i++) {
          const r = i % 2 === 0 ? outerR : innerR;
          const a = (i * Math.PI) / points;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (i === 0) starShape.moveTo(x, y);
          else starShape.lineTo(x, y);
        }
        starShape.closePath();
        const extrudeGeo = new THREE.ExtrudeGeometry(starShape, {
          depth: 0.25,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.08,
          bevelThickness: 0.08,
        });
        extrudeGeo.center();
        const star = new THREE.Mesh(extrudeGeo, chromeMat);
        const orbit = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.TorusGeometry(1.3, 0.03, 16, 48)),
          new THREE.LineBasicMaterial({ color: 0x77756f })
        );
        orbit.rotation.x = Math.PI / 2.5;
        group.add(star, orbit);
        break;
      }

      case "pixel-art": {
        // 3D Voxel cluster (stepped pixel cube arrangement)
        const voxelGeo = new THREE.BoxGeometry(0.26, 0.26, 0.26);
        const voxelEdgeGeo = new THREE.EdgesGeometry(voxelGeo);
        const coords = [
          [-1, 1, 0], [0, 1, 0], [1, 1, 0],
          [-2, 0, 0], [-1, 0, 0], [0, 0, 0], [1, 0, 0], [2, 0, 0],
          [-1, -1, 0], [0, -1, 0], [1, -1, 0],
          [0, -2, 0],
          [0, 0, 1], [0, 0, -1],
        ];
        coords.forEach(([vx, vy, vz]) => {
          const m = new THREE.Mesh(voxelGeo, matteWhiteMat);
          const e = new THREE.LineSegments(voxelEdgeGeo, inkLineMat);
          m.position.set(vx * 0.28, vy * 0.28, vz * 0.28);
          e.position.set(vx * 0.28, vy * 0.28, vz * 0.28);
          group.add(m, e);
        });
        break;
      }

      case "synthwave": {
        // Wireframe perspective grid floor with wireframe retro horizon sphere
        const gridGeo = new THREE.PlaneGeometry(2.4, 2.4, 12, 12);
        const gridMesh = new THREE.Mesh(
          gridGeo,
          new THREE.MeshBasicMaterial({ color: 0x0d0d0d, wireframe: true })
        );
        gridMesh.rotation.x = -Math.PI / 2.8;
        gridMesh.position.y = -0.5;

        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.7, 16, 12),
          new THREE.MeshBasicMaterial({ color: 0x0d0d0d, wireframe: true })
        );
        sphere.position.y = 0.35;
        group.add(gridMesh, sphere);
        break;
      }

      case "swiss-design": {
        // Primary geometric trio (Cube, Cylinder, Sphere) aligned in mathematical harmony
        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), matteWhiteMat);
        const cubeEdge = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(0.7, 0.7, 0.7)),
          inkLineMat
        );
        cube.position.set(-0.6, -0.2, 0);
        cubeEdge.position.set(-0.6, -0.2, 0);

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.48, 32, 32), inkSolidMat);
        sphere.position.set(0.65, 0.25, 0);

        const cylinder = new THREE.Mesh(
          new THREE.CylinderGeometry(0.25, 0.25, 1.2, 32),
          clayMat
        );
        cylinder.position.set(0.1, 0.2, -0.3);
        group.add(cube, cubeEdge, sphere, cylinder);
        break;
      }

      case "minimalism": {
        // Ultra-pure razor-thin wireframe cube floating with sublime poise
        const cube = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(1.4, 1.4, 1.4)),
          new THREE.LineBasicMaterial({ color: 0x0d0d0d, linewidth: 2 })
        );
        const coreSphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 32, 32),
          inkSolidMat
        );
        group.add(cube, coreSphere);
        break;
      }

      case "maximalism": {
        // Hyper-dense cluster of 5 intersecting contrasting geometric solids
        const shapes = [
          new THREE.Mesh(new THREE.DodecahedronGeometry(0.55), matteWhiteMat),
          new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.9, 16), inkSolidMat),
          new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.12, 16, 36), chromeMat),
          new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), wireframeMat),
          new THREE.Mesh(new THREE.OctahedronGeometry(0.4), clayMat),
        ];
        shapes[0].position.set(-0.35, 0.35, 0.2);
        shapes[1].position.set(0.5, -0.3, 0);
        shapes[2].rotation.x = Math.PI / 4;
        shapes[3].position.set(0.4, 0.45, -0.3);
        shapes[4].position.set(-0.4, -0.4, 0.3);
        shapes.forEach((s) => group.add(s));
        break;
      }

      case "luxury-typography": {
        // Monolithic obsidian obelisk with beveled golden-ratio edges and mirror polish
        const obeliskGeo = new THREE.CylinderGeometry(0.45, 0.75, 1.6, 4);
        const obelisk = new THREE.Mesh(
          obeliskGeo,
          new THREE.MeshPhysicalMaterial({
            color: 0x111111,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
          })
        );
        obelisk.rotation.y = Math.PI / 4;
        const edge = new THREE.LineSegments(
          new THREE.EdgesGeometry(obeliskGeo),
          new THREE.LineBasicMaterial({ color: 0xd8d6cf })
        );
        edge.rotation.y = Math.PI / 4;
        group.add(obelisk, edge);
        break;
      }

      case "conceptual-sketch": {
        // 3D Wireframe blueprint cage with floating coordinate axes
        const cage = new THREE.LineSegments(
          new THREE.WireframeGeometry(new THREE.BoxGeometry(1.3, 1.3, 1.3)),
          new THREE.LineBasicMaterial({ color: 0x77756f })
        );
        const axes = new THREE.AxesHelper(1.1);
        const innerWire = new THREE.LineSegments(
          new THREE.WireframeGeometry(new THREE.SphereGeometry(0.55, 12, 8)),
          new THREE.LineBasicMaterial({ color: 0x0d0d0d })
        );
        group.add(cage, axes, innerWire);
        break;
      }

      case "ethereal": {
        // Concentric translucent nested spheres with delicate celestial drift
        const outerSphere = new THREE.Mesh(
          new THREE.SphereGeometry(1.0, 32, 32),
          new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 0.9,
            opacity: 0.6,
            transparent: true,
            roughness: 0.1,
          })
        );
        const midSphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.65, 32, 32),
          new THREE.MeshStandardMaterial({
            color: 0xf4f2ee,
            roughness: 0.5,
            transparent: true,
            opacity: 0.8,
          })
        );
        const core = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 32, 32),
          chromeMat
        );
        group.add(outerSphere, midSphere, core);
        break;
      }

      case "wabi-sabi": {
        // Imperfect organic pebble / stone geometry with natural asymmetry
        const stoneGeo = new THREE.IcosahedronGeometry(0.9, 2);
        // Perturb vertices organically
        const posAttr = stoneGeo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          const vx = posAttr.getX(i);
          const vy = posAttr.getY(i);
          const vz = posAttr.getZ(i);
          const noise = 1 + 0.16 * Math.sin(vx * 4) * Math.cos(vy * 3) * Math.sin(vz * 3);
          posAttr.setXYZ(i, vx * noise, vy * (noise * 0.85), vz * noise);
        }
        stoneGeo.computeVertexNormals();
        const stoneMesh = new THREE.Mesh(stoneGeo, clayMat);
        group.add(stoneMesh);
        break;
      }

      case "cyberpunk": {
        // Chamfered stealth prism with dark carbon finish and HUD crosshair
        const prismGeo = new THREE.CylinderGeometry(0.65, 1.0, 1.2, 6);
        const prism = new THREE.Mesh(
          prismGeo,
          new THREE.MeshStandardMaterial({
            color: 0x141414,
            metalness: 0.85,
            roughness: 0.25,
          })
        );
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(prismGeo),
          new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
        );
        // HUD Crosshair
        const ring = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.RingGeometry(1.15, 1.18, 36)),
          new THREE.LineBasicMaterial({ color: 0x77756f })
        );
        ring.rotation.x = Math.PI / 2;
        group.add(prism, edges, ring);
        break;
      }

      case "editorial-design": {
        // Monolithic architectural slab with razor hairline frame
        const slabGeo = new THREE.BoxGeometry(0.9, 1.45, 0.22);
        const slab = new THREE.Mesh(slabGeo, matteWhiteMat);
        const frame = new THREE.LineSegments(new THREE.EdgesGeometry(slabGeo), inkLineMat);
        const spine = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 1.45, 0.24),
          inkSolidMat
        );
        spine.position.x = -0.45;
        group.add(slab, frame, spine);
        break;
      }

      case "scrapbook": {
        // Offset layered cards pinned in 3D space
        const card1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.2, 0.04), matteWhiteMat);
        card1.rotation.z = -0.08;
        const card2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.04), clayMat);
        card2.position.set(0.18, 0.1, 0.08);
        card2.rotation.z = 0.12;
        const pin = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 0.2, 16),
          chromeMat
        );
        pin.position.set(-0.35, 0.55, 0.15);
        pin.rotation.x = Math.PI / 3;
        group.add(card1, card2, pin);
        break;
      }

      case "victorian": {
        // Architectural column pedestal with concentric ornamental rings
        const colGeo = new THREE.CylinderGeometry(0.45, 0.65, 1.3, 16);
        const col = new THREE.Mesh(colGeo, clayMat);
        const ring1 = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.TorusGeometry(0.75, 0.04, 12, 32)),
          inkLineMat
        );
        ring1.rotation.x = Math.PI / 2;
        ring1.position.y = 0.45;
        const ring2 = ring1.clone();
        ring2.position.y = -0.45;
        group.add(col, ring1, ring2);
        break;
      }

      case "bohemian": {
        // Asymmetric spiral flow composed of staggered concentric rings
        for (let i = 0; i < 4; i++) {
          const r = 0.35 + i * 0.22;
          const torus = new THREE.Mesh(
            new THREE.TorusGeometry(r, 0.05, 12, 32),
            i % 2 === 0 ? clayMat : matteWhiteMat
          );
          torus.rotation.x = 0.2 * i;
          torus.rotation.y = 0.35 * i;
          torus.position.y = (i - 1.5) * 0.18;
          group.add(torus);
        }
        break;
      }

      default: {
        // Default modern geometric prism
        const defGeo = new THREE.DodecahedronGeometry(0.9);
        const defMesh = new THREE.Mesh(defGeo, matteWhiteMat);
        const defEdge = new THREE.LineSegments(new THREE.EdgesGeometry(defGeo), inkLineMat);
        group.add(defMesh, defEdge);
        break;
      }
    }

    return group;
  }, []);

  // -------------------------------------------------------------
  // Floating Dev Satellite Elements (Lummi & Lottie 3D Dev Inspiration)
  // -------------------------------------------------------------
  const buildSatellites = useCallback(() => {
    const satellitesGroup = new THREE.Group();

    // 1. Floating miniature developer code cube at top right with edges
    const miniCubeGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const miniCubeMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.2,
      metalness: 0.8,
    });
    const miniCube = new THREE.Mesh(miniCubeGeo, miniCubeMat);
    const miniCubeEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(miniCubeGeo),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })
    );
    miniCube.add(miniCubeEdges);
    miniCube.position.set(1.55, 1.05, -0.4);
    miniCube.name = "satellite-cube";

    // 2. Floating smooth pill/capsule token at bottom left
    const miniTorusGeo = new THREE.TorusGeometry(0.22, 0.08, 16, 32);
    const miniTorus = new THREE.Mesh(
      miniTorusGeo,
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.1 })
    );
    miniTorus.position.set(-1.45, -0.85, 0.2);
    miniTorus.rotation.x = Math.PI / 3;
    miniTorus.name = "satellite-torus";

    // 3. Floating miniature diamond token at top left
    const miniOctaGeo = new THREE.OctahedronGeometry(0.22, 0);
    const miniOcta = new THREE.Mesh(
      miniOctaGeo,
      new THREE.MeshStandardMaterial({ color: 0x77756f, metalness: 0.8, roughness: 0.2 })
    );
    miniOcta.position.set(-1.3, 1.15, -0.2);
    miniOcta.name = "satellite-octa";

    satellitesGroup.add(miniCube, miniTorus, miniOcta);
    return satellitesGroup;
  }, []);

  // -------------------------------------------------------------
  // Three.js Scene Setup & Lifecycle
  // -------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera with calibrated distance for comfortable breathing room
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 5.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting (Studio Three-Point Lighting)
    const ambientLight = new THREE.AmbientLight(0xf4f2ee, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 3.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe5e2dc, 1.2);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Ground Contact Shadow (Soft Radial Shadow Mesh)
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(13, 13, 13, 0.28)");
    grad.addColorStop(0.5, "rgba(13, 13, 13, 0.08)");
    grad.addColorStop(1, "rgba(13, 13, 13, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -1.55;
    scene.add(groundShadow);
    groundShadowRef.current = groundShadow;

    // Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // Initial Archetype Object
    const initialObj = buildArchetypeObject(styleId);
    mainGroup.add(initialObj);
    currentObjectRef.current = initialObj;

    // Satellites
    const satellites = buildSatellites();
    scene.add(satellites);
    satellitesGroupRef.current = satellites;

    // Visibility Observer to pause rendering when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer parallax lerping
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.06;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.06;

      // Smooth drag orbit lerping
      dragRef.current.currentRotX +=
        (dragRef.current.targetRotX - dragRef.current.currentRotX) * 0.08;
      dragRef.current.currentRotY +=
        (dragRef.current.targetRotY - dragRef.current.currentRotY) * 0.08;

      if (mainGroupRef.current) {
        // Floating levitation
        const bobOffset = Math.sin(elapsedTime * 1.8) * 0.07;
        mainGroupRef.current.position.y = bobOffset;

        // Auto-rotation + user drag + pointer tilt
        const autoSpin = dragRef.current.isDown ? 0 : 0.35;
        mainGroupRef.current.rotation.y =
          elapsedTime * autoSpin +
          dragRef.current.currentRotX +
          pointerRef.current.x * 0.45;
        mainGroupRef.current.rotation.x =
          dragRef.current.currentRotY + pointerRef.current.y * 0.35;

        // Morphing scale animation when style changes
        if (transitionRef.current.isMorphing) {
          transitionRef.current.progress += 0.08;
          if (transitionRef.current.progress >= 1.0) {
            transitionRef.current.progress = 1.0;
            transitionRef.current.isMorphing = false;
          }
          const s = THREE.MathUtils.lerp(0.2, 0.82, transitionRef.current.progress);
          mainGroupRef.current.scale.set(s, s, s);
        } else {
          mainGroupRef.current.scale.set(0.82, 0.82, 0.82);
        }

        // Adjust ground shadow scale based on height
        if (groundShadowRef.current) {
          const shadowScale = 1 - bobOffset * 0.6;
          groundShadowRef.current.scale.set(shadowScale, shadowScale, 1);
        }
      }

      // Animate Satellites (orbit & self-spin)
      if (satellitesGroupRef.current) {
        const sat1 = satellitesGroupRef.current.getObjectByName("satellite-cube");
        const sat2 = satellitesGroupRef.current.getObjectByName("satellite-torus");
        const sat3 = satellitesGroupRef.current.getObjectByName("satellite-octa");

        if (sat1) {
          sat1.position.y = 1.1 + Math.sin(elapsedTime * 2.2) * 0.08;
          sat1.rotation.x += 0.015;
          sat1.rotation.y += 0.02;
        }
        if (sat2) {
          sat2.position.y = -0.9 + Math.cos(elapsedTime * 1.7) * 0.06;
          sat2.rotation.z += 0.012;
        }
        if (sat3) {
          sat3.position.y = 1.2 + Math.sin(elapsedTime * 2.5 + 1) * 0.07;
          sat3.rotation.y += 0.018;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [buildArchetypeObject, buildSatellites]);

  // -------------------------------------------------------------
  // Dynamic Archetype Swapping on Style Change
  // -------------------------------------------------------------
  useEffect(() => {
    if (!mainGroupRef.current) return;

    // Remove old object
    if (currentObjectRef.current) {
      mainGroupRef.current.remove(currentObjectRef.current);
    }

    // Build and insert new object
    const newObj = buildArchetypeObject(styleId);
    mainGroupRef.current.add(newObj);
    currentObjectRef.current = newObj;

    // Trigger scale-in morph transition
    transitionRef.current.progress = 0.2;
    transitionRef.current.isMorphing = true;
    if (mainGroupRef.current) {
      mainGroupRef.current.scale.set(0.2, 0.2, 0.2);
    }
  }, [styleId, buildArchetypeObject]);

  // -------------------------------------------------------------
  // Pointer & Drag Interactions (Orbit Controls)
  // -------------------------------------------------------------
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsInteracting(true);
    dragRef.current.isDown = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current.targetX = nx;
    pointerRef.current.targetY = ny;

    if (dragRef.current.isDown) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      dragRef.current.targetRotX += dx * 0.008;
      dragRef.current.targetRotY += dy * 0.008;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;

      setCameraAngle({
        yaw: Math.round(dragRef.current.targetRotX * 57.3) % 360,
        pitch: Math.round(dragRef.current.targetRotY * 57.3) % 360,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragRef.current.isDown = false;
    setIsInteracting(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleResetOrbit = () => {
    dragRef.current.targetRotX = 0;
    dragRef.current.targetRotY = 0;
    pointerRef.current.targetX = 0;
    pointerRef.current.targetY = 0;
    setCameraAngle({ yaw: 0, pitch: 0 });
  };

  return (
    <div
      className={`relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#f9f8f6] to-[#ece9e2] border border-[#0d0d0d]/10 select-none shadow-sm ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        pointerRef.current.targetX = 0;
        pointerRef.current.targetY = 0;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: "none", cursor: isInteracting ? "grabbing" : "grab" }}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Studio Grid Overlay in background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0d0d0d 1px, transparent 1px), linear-gradient(to bottom, #0d0d0d 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top HUD: Archetype Identification & Telemetry */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10 font-mono text-[11px]">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#0d0d0d]/10 text-[#0d0d0d] shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="font-semibold uppercase tracking-wider">3D SCULPT</span>
          <span className="text-[#77756f]">· {styleName}</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#0d0d0d]/10 text-[#77756f]">
          <span>60 FPS</span>
          <span>·</span>
          <span>WEBGL 2.0</span>
          <span>·</span>
          <span>{category.toUpperCase()}</span>
        </div>
      </div>

      {/* Bottom Floating Control Pills: Drag Hint & Reset */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10 font-mono text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#0d0d0d]/10 text-[#77756f] shadow-2xs">
          <svg
            className="w-3.5 h-3.5 text-[#0d0d0d]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.8 1.03 6.44 2.7L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
          <span className="text-[11px]">
            {isInteracting ? "Dragging to orbit" : "Click + drag to orbit in 3D"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleResetOrbit}
          className="pointer-events-auto px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#0d0d0d] text-[11px] font-medium border border-[#0d0d0d]/15 hover:border-[#0d0d0d]/40 transition-all shadow-2xs cursor-pointer"
          title="Reset 3D camera angle"
        >
          Reset Camera
        </button>
      </div>

      {/* Floating 3D Depth Badge */}
      <div className="absolute top-14 right-4 hidden md:flex flex-col items-end gap-1 pointer-events-none font-mono text-[10px] text-[#77756f]/70">
        <span>YAW: {cameraAngle.yaw}°</span>
        <span>PITCH: {cameraAngle.pitch}°</span>
      </div>
    </div>
  );
}
