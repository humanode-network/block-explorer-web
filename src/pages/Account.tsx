import { useParams } from "react-router-dom";
import Panel from "../components/Panel";
import AccountData from "../data/AccountData";

export default function Account() {
  const { id } = useParams() as { [key: string]: string };
  return (
    <Panel>
      <AccountData id={id} />
    </Panel>
  );
}
