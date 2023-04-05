import { Box, Button, Stack } from "@chakra-ui/react";
import Table from "../components/Table";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function RTable({
  data,
  columns,
  rData,
  loadMore,
  loading,
  hasNextPage,
  noMore,
}: Props) {
  return data ? (
    <Stack alignItems="center">
      <Box w="100%">
        <Table columns={columns} data={rData} />
      </Box>
      {hasNextPage && !noMore && (
        <Button onClick={() => loadMore()} w="50%" ml="25%">
          Load more
        </Button>
      )}
    </Stack>
  ) : loading ? (
    <Loading />
  ) : (
    <Error />
  );
}

interface Props {
  data: any;
  columns: any;
  rData: any;
  loadMore: any;
  loading: boolean;
  hasNextPage: boolean;
  noMore?: boolean;
}
