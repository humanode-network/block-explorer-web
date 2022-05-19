import { Alert, Box, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box>
      <Alert status="info">
        <Spinner />
        Loading
      </Alert>
    </Box>
  )
}
