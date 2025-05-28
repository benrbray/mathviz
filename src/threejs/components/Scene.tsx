import { Scene as AffineComboScene } from "../scenes/affine-combo"

// export const Box: R.FC<any> = (props: ThreeElements["mesh"]) => {
//   const meshRef = R.useRef<THREE.Mesh>(null!);
//   const [hovered, setHover] = R.useState(false)
//   const [active, setActive] = R.useState(false)
//   useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  
//   return (<mesh
//     {...props}
//     ref={meshRef}
//     scale={active ? 1.5 : 1}
//     onClick={(event) => setActive(!active)}
//     onPointerOver={(event) => setHover(true)}
//     onPointerOut={(event) => setHover(false)}>
//     <boxGeometry args={[1, 1, 1]} />
//     <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
//   </mesh>)
// }

export namespace Scene {
  export type Props = {
    width: number,
    height: number
  }
}

export const Scene = (props: Scene.Props) => {
    return (<AffineComboScene visible={true} />)
}