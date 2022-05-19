import { Box, Heading } from "@chakra-ui/react";
import EventTable from "../data/EventTable";

export default function Events() {
  return (
    <Box>
      <Heading>
        Events
      </Heading>
      <EventTable />
    </Box>
  )
}
