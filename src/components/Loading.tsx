import { Alert, Box, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box>
      <Alert status="info" gap="4px">
        <Spinner />
        Loading
      </Alert>
    </Box>
  );
}
