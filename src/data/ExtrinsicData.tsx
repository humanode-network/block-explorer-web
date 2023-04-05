import { gql, useQuery } from "@apollo/client";
import { Heading, Stack } from "@chakra-ui/react";
import Overview, { Data as OverviewData } from "../components/Overview";
import Tabs from "../components/Tabs";
import { timeSince } from "../utils";
import EventTable from "./EventTable";

export default function ExtrinsicData({ id }: Props) {
  const filter = { extrinsicId: { equalTo: id } };
  const tabsData = [
    { label: "Events", content: <EventTable moreVariables={{ filter }} /> },
  ];

  return (
    <Stack gap={2}>
      <Heading fontSize="3xl">Extrinsic #{id}</Heading>
      <ExtrinsicOverview id={id} />
      <Tabs data={tabsData} />
    </Stack>
  );
}

function ExtrinsicOverview({ id }: Props) {
  const query = gql`
    query Extrinsic($extrinsicId: String!) {
      query {
        extrinsic(id: $extrinsicId) {
          id
          hash
          section
          method
          success
          signerId
          events {
            totalCount
          }
          block {
            id
            number
            timestamp
          }
        }
      }
    }
  `;
  const variables = {
    extrinsicId: id,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery(query, { variables: variables });
  let overviewData: OverviewData = [];
  if (data) {
    const extrinsic = data.query.extrinsic;
    overviewData = [
      { label: "Timestamp (UTC)", value: extrinsic.block.timestamp },
      { label: "Block", value: extrinsic.block.id },
      { label: "Hash", value: extrinsic.hash },
      { label: "Module", value: extrinsic.section },
      { label: "Call", value: extrinsic.method },
      { label: "Sender", value: extrinsic.signerId },
      { label: "Events", value: extrinsic.events.totalCount },
      { label: "Age", value: timeSince(extrinsic.block.timestamp) },
    ];
  }

  return <Overview data={overviewData} />;
}

interface Props {
  id: string;
}
