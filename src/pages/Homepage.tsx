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
          <Button backgroundColor="yellow.400" onClick={() => window.open("/blocks", "_self")}>View all</Button>
        </Stack>
        <BlockTable moreVariables={{first: 3}} noMore={true}/>
      </Box>
      <br /><br />

      <Box>
        <Stack direction={"row"}>
          <Heading>Extrinsics</Heading>
          <Button backgroundColor="yellow.400" onClick={() => window.open("/extrinsics", "_self")}>View all</Button>
        </Stack>
        <ExtrinsicTable moreVariables={{first: 3}} noMore={true}/>
      </Box>
      <br /><br />

      <Box>
        <Stack direction={"row"}>
          <Heading>Events</Heading>
          <Button backgroundColor="yellow.400" onClick={() => window.open("/events", "_self")}>View all</Button>
        </Stack>
        <EventTable moreVariables={{first: 3}}  noMore={true}/>
      </Box>
      
    </Box>
  )
}