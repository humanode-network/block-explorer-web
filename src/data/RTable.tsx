import { Button, Flex } from "@chakra-ui/react";
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
    <>
      <Flex direction="column" gap="4px">
        <Table columns={columns} data={rData} />
        {hasNextPage && !noMore && (
          <Button
            onClick={() => loadMore()}
            backgroundColor="yellow.400"
            w="50%"
            ml="25%"
          >
            Load more
          </Button>
        )}
      </Flex>
    </>
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
