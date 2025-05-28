import * as THREE from "three";
import * as R from "react";
import * as R3F from "@react-three/fiber"
import * as DREI from "@react-three/drei"
import { NormalVectorControl, type NormalVectorSpec } from "./controls/NormalVectorControl";
import { Plane } from "./geometry/Plane";
import { Line } from "./geometry/Line";
import { SVGRenderer } from "three-stdlib";

/* -------------- */

type VariablesSpec = {
  [key: string]: NormalVectorSpec
}

type Variables<V extends VariablesSpec> = {
  [K in keyof V]: V[K]["value"] extends [number, number, number] ? THREE.Vector3 : V[K]["value"]
}

type SceneComponentProps<V extends VariablesSpec> = {
  // scene: THREE.Scene;
  // camera: THREE.PerspectiveCamera;
  variables: Variables<V>
}

/** TODO:  What is Options for? */
type Options<V extends VariablesSpec> = {
  variables: V
}

/* -------------- */

type SceneProps = {
  visible: boolean
}

/**
 * Higher-order component which adds controls to a Scene component.
 * @param component The scene to use.
 * @param options ????
 */
export const createScene = <V extends VariablesSpec>(
  Component: R.FC<SceneComponentProps<V>>,
  options: Options<V>
): R.FC<SceneProps> => {
  return (
    props: SceneProps
  ) => {

    const [rotate, setRotate] = R.useState(true);
    const autoRotate = false;

    /* ---- handle variables ---- */
    const variablesSpec = options.variables ?? ({} as V);
    const variableKeys = R.useMemo(() => Object.keys(variablesSpec), [variablesSpec]);
    const [variables, setVariables] = R.useState(() =>
      variableKeys.reduce((obj, _key) => {
        const key = _key as keyof V;
        obj[key] = (
          Array.isArray(variablesSpec[key].value)
            ? new THREE.Vector3(
                ...(variablesSpec[key].value as [number, number, number]),
              ).normalize()
            : (variablesSpec[key].value as number)
        ) as Variables<V>[typeof key];
        return obj;
      }, {} as Variables<V>),
    );
    const setVariableValue = (key: string, value: unknown) => {
      setVariables((obj) => ({ ...obj, [key]: value }));
    };
    /* ---- variables END ---- */

    const orbitRef = R.useRef<any>(null!);

    return (<>
      <div style={{ "width" : "30em", "height" : "30em"}}>
        <R3F.Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

          <DREI.OrbitControls
            rotateSpeed={0.3}
            enableRotate
            autoRotate={rotate && autoRotate}
            autoRotateSpeed={0.7}
            enablePan={false}
            enableZoom={false}
            ref={orbitRef}
          />

          <mesh position={[0, 0 /*yOffset*/, 0]}>
            <Component 
              // camera={camera}
              // scene={threeScene}
              variables={variables}
            />
          </mesh>
        </R3F.Canvas>

        {/* Variable Controls */}
        {variableKeys.length > 0 && (<div>
          {variableKeys.map((key) => {
            const spec = variablesSpec[key];
            const value = variables[key];
            // if (spec.type === "number")
            //   return (
            //     <NumberVariable
            //       key={key}
            //       dataKey={key}
            //       value={value as number}
            //       onValueChange={(value) => setVariableValue(key, value)}
            //       spec={spec}
            //       showValue={false}
            //     />
            //   );
            if (spec.type === "normal") {
              return (
                <NormalVectorControl
                  key={key}
                  dataKey={key}
                  value={value as THREE.Vector3}
                  onValueChange={(value) => setVariableValue(key, value)}
                  spec={spec}
                  visible={props.visible}
                  // addRotationCallback={(fn) => rotationCallbacks.current.add(fn)}
                  // removeRotationCallback={(fn) => rotationCallbacks.current.delete(fn)}
                />
              );
            }
            return null;
          })
          }
        </div>)}
      </div>
    </>);
  }
}

