import { useContext, useMemo } from "react";
import { getBasicMaterial, getPhongMaterial, type IColor, type IVector3, parseVector } from "../utils";
// import { ThreeContext } from "../ThreeProvider";

import * as THREE from "three";

interface Props {
  from: IVector3;
  to: IVector3;
  color: IColor;
  radius?: number;
  thin?: boolean;
  basicMaterial?: boolean;
}

export const Line: React.FC<Props> = (props) => {
  // const THREE = useContext(ThreeContext);

  const cylinderGeometry = useMemo(() => {
    let radius = props.radius ?? 0.05;
    if (props.thin) radius = 0.015;
    return new THREE.CylinderGeometry(radius, radius, 1, 20);
  }, [props.radius, props.thin]);

  const { half, distance, quaternion } = useMemo(() => {
    const from = parseVector(THREE, props.from);
    const to = parseVector(THREE, props.to);

    const distance = to.distanceTo(from);
    const half = to.clone().add(from).multiplyScalar(0.5);

    const normal = to.clone().sub(from).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      normal,
    );

    return { half, distance, quaternion };
  }, [props.from, props.to]);

  return (
    <mesh
      geometry={cylinderGeometry}
      material={
        props.basicMaterial
          ? getBasicMaterial(THREE, props.color)
          : getPhongMaterial(THREE, props.color)
      }
      position={half}
      quaternion={quaternion}
      scale={[1, distance, 1]}
    />
  );
};