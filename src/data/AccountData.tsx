import { Box, Heading, Stack } from "@chakra-ui/react";
import Tabs from "../components/Tabs";
import ExtrinsicTable from "./ExtrinsicTable";
import TransferTable from "./TransferTable";

export default function ExtrinsicData({ id }: Props) {
  const extrinsicFilter = { signerId: { equalTo: id } };
  const transferFilter = {
    or: [
      {
        fromId: {
          equalTo: id,
        },
      },
      {
        toId: {
          equalTo: id,
        },
      },
    ],
  };
  const tabsData = [
    {
      label: "Extrinsics",
      content: <ExtrinsicTable moreVariables={{ filter: extrinsicFilter }} />,
    },
    {
      label: "Transfers",
      content: <TransferTable moreVariables={{ filter: transferFilter }} />,
    },
  ];

  return (
    <Stack gap={2}>
      <Heading fontSize="3xl">Account {id}</Heading>
      <Tabs data={tabsData} />
    </Stack>
  );
}

interface Props {
  id: string;
}
