import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        "/models/avatar.glb",
        async (gltf) => {
          const character = gltf.scene;

          // Tweak face/head shape via bone scaling
          const headBone = character.getObjectByName("spine006");
          if (headBone) {
            headBone.scale.set(1.08, 0.93, 1.04); // wider, shorter, rounder face
          }
          const jawBone = character.getObjectByName("spine004");
          if (jawBone) {
            jawBone.scale.set(1.05, 0.98, 1.02); // wider jaw, slightly compressed
          }
          const noseArea = character.getObjectByName("spine005");
          if (noseArea) {
            noseArea.scale.set(0.97, 1.03, 1.0); // narrower neck area
          }

          // Customize materials BEFORE compile so shaders are built correctly
          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              
              // Scale down ears
              if (mesh.name === "Ear001") {
                mesh.scale.set(0.7, 0.7, 0.7);
              }

              // Customize clothing & accessories
              if (mesh.material) {
                const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                let useClonedMat = true;
                switch (mesh.name) {
                  case "Cube006":
                    mesh.material = new THREE.MeshStandardMaterial({
                      color: new THREE.Color("#e8e8e8"),
                      metalness: 0.0,
                      roughness: 0.8,
                      envMapIntensity: 0.3,
                    });
                    useClonedMat = false;
                    break;
                  case "Pant":
                    mesh.material = new THREE.MeshStandardMaterial({
                      color: new THREE.Color("#1a1a1a"),
                      metalness: 0.0,
                      roughness: 0.85,
                      envMapIntensity: 0.1,
                    });
                    useClonedMat = false;
                    break;
                  case "CAP001":
                  case "CAP002":
                    mesh.material = new THREE.MeshStandardMaterial({
                      color: new THREE.Color("#2a2a2a"),
                      metalness: 0.0,
                      roughness: 0.85,
                      envMapIntensity: 0.08,
                    });
                    useClonedMat = false;
                    break;
                  case "Shoe":
                    mesh.material = new THREE.MeshStandardMaterial({
                      color: new THREE.Color("#f5f5f5"),
                      metalness: 0.05,
                      roughness: 0.6,
                      envMapIntensity: 0.2,
                    });
                    useClonedMat = false;
                    break;
                  case "Sole":
                    mesh.material = new THREE.MeshStandardMaterial({
                      color: new THREE.Color("#333333"),
                      metalness: 0.0,
                      roughness: 0.7,
                      envMapIntensity: 0.15,
                    });
                    useClonedMat = false;
                    break;
                  case "Hair":
                    mat.color = new THREE.Color("#0a0a0a");
                    break;
                  case "Face002":
                    mat.color = new THREE.Color("#e8c8a8");
                    break;
                  case "Neck":
                  case "Hand":
                    mat.color = new THREE.Color("#dbb896");
                    break;
                  case "Ear001":
                    mat.color = new THREE.Color("#dbb896");
                    mat.roughness = 0.9;
                    break;
                  default:
                    break;
                }
                if (useClonedMat) {
                  mesh.material = mat;
                }
              }

              child.castShadow = true;
              child.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });
          await renderer.compileAsync(character, camera, scene);
          resolve(gltf);
          setCharTimeline(character, camera);
          setAllTimeline();
          character!.getObjectByName("footR")!.position.y = 3.36;
          character!.getObjectByName("footL")!.position.y = 3.36;

          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
