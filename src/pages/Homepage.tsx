import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import BlockTable from "../data/BlockTable";
import EventTable from "../data/EventTable";
import ExtrinsicTable from "../data/ExtrinsicTable";

export default function Homepage() {
  return (
    <Box>
      <Box>
        <Stack direction={"row"}>
          <Heading>Blocks</Heading>
          <Button backgroundColor="yellow.400" as="a" href="/blocks">
            View all
          </Button>
        </Stack>
        <BlockTable moreVariables={{ first: 3 }} noMore={true} />
      </Box>
      <br />
      <br />

      <Box>
        <Stack direction={"row"}>
          <Heading>Extrinsics</Heading>
          <Button backgroundColor="yellow.400" as="a" href="/extrinsics">
            View all
          </Button>
        </Stack>
        <ExtrinsicTable moreVariables={{ first: 3 }} noMore={true} />
      </Box>
      <br />
      <br />

      <Box>
        <Stack direction={"row"}>
          <Heading>Events</Heading>
          <Button backgroundColor="yellow.400" as="a" href="/events">
            View all
          </Button>
        </Stack>
        <EventTable moreVariables={{ first: 3 }} noMore={true} />
      </Box>
    </Box>
  );
}
