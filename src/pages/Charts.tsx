import Panel from "../components/Panel";
import DayChart from "../data/DayChart";

export default function Charts() {
  return (
    <Panel title="Charts" p={"0 16px"}>
      <DayChart />
    </Panel>
  );
}
