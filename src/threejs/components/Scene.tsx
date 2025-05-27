import * as THREE from "three";
import * as R from "react";

import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber"

export namespace Scene {
  export type Props = {
    width: number,
    height: number
  }
}

export const Box: R.FC<any> = (props: ThreeElements["mesh"]) => {
  const meshRef = R.useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = R.useState(false)
  const [active, setActive] = R.useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  
  return (<mesh
    {...props}
    ref={meshRef}
    scale={active ? 1.5 : 1}
    onClick={(event) => setActive(!active)}
    onPointerOver={(event) => setHover(true)}
    onPointerOut={(event) => setHover(false)}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
  </mesh>)
}

export const Scene = (props: Scene.Props) => {
    return (<Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>);
}