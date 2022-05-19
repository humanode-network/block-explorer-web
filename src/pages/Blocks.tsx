import { Box, Heading } from "@chakra-ui/react";
import BlockTable from "../data/BlockTable";

export default function Blocks() {
  return (
    <Box>
      <Heading>
        Blocks
      </Heading>
      <BlockTable />
    </Box>
  )
}
