import { useParams } from "react-router-dom";
import Panel from "../components/Panel";
import BlockData from "../data/BlockData";

const Block: React.FC = () => {
  const { id } = useParams() as { [key: string]: string };
  return (
    <Panel>
      <BlockData id={id} />
    </Panel>
  );
};

export default Block;
