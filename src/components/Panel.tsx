import { Box, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type BlockProps = {
  title?: React.ReactNode;
  actions?: React.ReactNode;
};
const Panel: React.FC<PropsWithChildren<BlockProps>> = ({
  actions,
  title,
  children,
}) => (
  <Box>
    <Box display="flex" justifyContent="space-between" my={1}>
      {title && (
        <Text fontSize="xl" alignSelf="center">
          {title}
        </Text>
      )}
      <Box>{actions}</Box>
    </Box>
    <Box border="1px" borderColor="inherit" rounded="md" p={4}>
      {children}
    </Box>
  </Box>
);

export default Panel;
