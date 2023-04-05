import { Box, Spinner, Stack, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box>
      <Stack direction="row" gap={2}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="inherit"
          color="blue.500"
        />
        <Text>Loading</Text>
      </Stack>
    </Box>
  );
}
