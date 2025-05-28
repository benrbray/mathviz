import * as THREE from "three";
import { createScene } from "../createScene";
import type { NormalVectorSpec } from "../controls/NormalVectorControl";
import { Line } from "../geometry/Line";
import { Grid } from "../geometry/Grid";
import { createScene2d } from "../create/createScene2d";

// import { Plane } from "../geometry/Plane";

// export createScene = ({ params }) => {
//   const { v1, v2 } = params;

//   <Plane colo />
// }

type Variables = {
  v1: NormalVectorSpec
}

export const Scene = createScene2d<Variables>(
  ({ variables }) => {
    const { v1 } = variables;

    console.log(v1);

    return (<>
      <Line color={"red"} from={[0,0,0]} to={v1} />
      <Grid size={5} light={false} />
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