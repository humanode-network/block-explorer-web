import { Button, Stack } from "@chakra-ui/react";
import Panel from "../components/Panel";
import BlockTable from "../data/BlockTable";
import EventTable from "../data/EventTable";
import ExtrinsicTable from "../data/ExtrinsicTable";

export default function Homepage() {
  return (
    <Stack>
      <Panel
        title="Blocks"
        actions={
          <Button as="a" variant="outline" href="/blocks">
            View all
          </Button>
        }
      >
        <BlockTable moreVariables={{ first: 3 }} noMore={true} />
      </Panel>
      <Panel
        title="Extrinsics"
        actions={
          <Button as="a" variant="outline" href="/extrinsics">
            View all
          </Button>
        }
      >
        <ExtrinsicTable moreVariables={{ first: 3 }} noMore={true} />
      </Panel>
      <Panel
        title="Events"
        actions={
          <Button as="a" variant="outline" href="/events">
            View all
          </Button>
        }
      >
        <EventTable moreVariables={{ first: 3 }} noMore={true} />
      </Panel>
    </Stack>
  );
}
