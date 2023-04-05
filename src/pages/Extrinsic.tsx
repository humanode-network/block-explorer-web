import { useParams } from "react-router-dom";
import Panel from "../components/Panel";
import ExtrinsicData from "../data/ExtrinsicData";

export default function Extrinsic() {
  const { id } = useParams() as { [key: string]: string };
  return (
    <Panel>
      <ExtrinsicData id={id} />
    </Panel>
  );
}
