import { Box, Heading } from "@chakra-ui/react";
import TransferTable from "../data/TransferTable";

export default function Transfers() {
  return (
    <Box>
      <Heading>
        Transfers
      </Heading>
      <TransferTable />
    </Box>
  )
}
