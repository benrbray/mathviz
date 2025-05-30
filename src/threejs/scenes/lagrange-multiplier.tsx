import * as THREE from "three";
import { createScene } from "../createScene";
import type { NormalVectorSpec } from "../controls/NormalVectorControl";
import { Line } from "../geometry/Line";
import { Grid } from "../geometry/Grid";
import { getBasicMaterial } from "../utils";
import { ParametricGeometries, ParametricGeometry } from "three-stdlib";

// import { Plane } from "../geometry/Plane";

// export createScene = ({ params }) => {
//   const { v1, v2 } = params;

//   <Plane colo />
// }

type Variables = {
  v1: NormalVectorSpec
}

const surfaceFunc = (x: number, y: number): number => {
  x = x*2;
  y = y*2;
  return x*x*y / (1 + x**2 + y**2) / 2;
}

const surfaceGeometry = new ParametricGeometry((u, v, target) => {
  u = u * 2 - 1;
  v = v * 2 - 1;
  let x = u * 2.5;
  let y = v * 2.5;
  let fxy = surfaceFunc(x, y)
  target.set(x, fxy, y)
}, 20, 20);

class CustomCurve extends THREE.Curve<THREE.Vector3> {

  public scale: number;

	constructor(scale = 1) {
		super();
    this.scale = scale;
		// this.scale = scale;
	}

	getPoint( t: number, optionalTarget = new THREE.Vector3() ) {
    const radius = 1.5;

    t = t * 2 * Math.PI;

    const px = Math.cos(t) * radius;
    const py = Math.sin(t) * radius;
    
    const z = surfaceFunc(px, py);

		// const tx = t * 3 - 1.5;
		// const ty = Math.sin(2 * Math.PI * t);
		// const tz = 0;

		return optionalTarget.set(px, z, py).multiplyScalar(this.scale);
	}

}

class CustomCurve2D extends THREE.Curve<THREE.Vector3> {

  public scale: number;

	constructor(scale = 1) {
		super();
    this.scale = scale;
		// this.scale = scale;
	}

	getPoint( t: number, optionalTarget = new THREE.Vector3() ) {
    const radius = 1.5;

    t = t * 2 * Math.PI;

    const px = Math.cos(t) * radius;
    const py = Math.sin(t) * radius;

		return optionalTarget.set(px, 0, py).multiplyScalar(this.scale);
	}

}

let curve = new CustomCurve()
const points = curve.getPoints( 50 );
const curveGeometry = new THREE.BufferGeometry().setFromPoints( points );
const curveMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 } );

let curve2d = new CustomCurve2D()
const points2d = curve.getPoints( 50 );
const curveGeometry2d = new THREE.BufferGeometry().setFromPoints( points );

export const Scene = createScene<Variables>(
  ({ variables }) => {
    const { v1 } = variables;

    console.log(v1);

    return (<>
      <mesh
        geometry={surfaceGeometry}
      >
        {/* <meshStandardMaterial
          color={'hotpink'}
          side={THREE.DoubleSide}
          opacity={0.5}
          transparent={true}
        /> */}
        <meshNormalMaterial
          side={THREE.DoubleSide}
          normalMapType={THREE.ObjectSpaceNormalMap}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      <mesh>
          <tubeGeometry args={[curve, 70, 0.02, 50, false]} />
          <lineBasicMaterial linewidth={100} color={0x000000}/>
      </mesh>
      <mesh position={[0,-1,0]}>
          <Grid size={5} light={false} />
          <mesh>
            <tubeGeometry args={[curve2d, 70, 0.02, 50, false]} />
            <lineBasicMaterial linewidth={4} color={0x999999}/>
          </mesh>
      </mesh>
      {/* <Line color={"red"} from={[0,0,0]} to={v1} basicMaterial={true} /> */}
    </>);
  },
  {
    variables: {
      v1: {
        type: "normal",
        value: [10,10,10],
        label: "v1"
      }
    }
  }
)