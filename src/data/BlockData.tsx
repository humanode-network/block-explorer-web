import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import Overview, {Data as OverviewData} from "../components/Overview";
import Tabs from "../components/Tabs"
import { timeSince } from "../utils";
import EventTable from "./EventTable";
import ExtrinsicTable from "./ExtrinsicTable";
import TransferTable from "./TransferTable";


export default function BlockData({id}: Props) {
  const filter = {"blockId": {"equalTo": id}}
  const tabsData = [
    {label: "Extrinsics", content: <ExtrinsicTable moreVariables={{filter}}/>},
    {label: "Events", content: <EventTable moreVariables={{filter}} />},
    {label: "Transfers", content: <TransferTable moreVariables={{filter}}/>}
  ]

  return(
    <Box>
      <Heading>Block #{id}</Heading>
      <br />
      <BlockOverview id={id} />
      <br />
      <Tabs data={tabsData} />
    </Box>
  )
}

function BlockOverview({id}: Props) {
  const query = gql`
    query Block($blockId: String!) {
      query {
        block(id: $blockId) {
          id
          number
          hash
          timestamp
          parentHash
          specVersion
          stateRoot
          extrinsics {
            totalCount
          }
          events {
            totalCount
          }
        }
      }
    }
  `
  const variables = {
    "blockId": id
  }

  const { loading, error, data } = useQuery(query, {variables: variables});
  let overviewData: OverviewData = []
  if (data) {
    const block = data.query.block
    overviewData = [
      {label: "Timestamp (UTC)", value: block.timestamp},
      {label: "Hash", value: block.hash},
      {label: "Parent Hash", value: block.parentHash},
      {label: "State Root", value: block.stateRoot},
      {label: "Spec Version", value: block.specVersion},
      {label: "Extrinsics", value: block.extrinsics.totalCount},
      {label: "Events", value: block.events.totalCount},
      {label: "Age", value: timeSince(block.timestamp)},
    ]
  }

  return (
    <Overview data={overviewData} />
  )
}

interface Props {
  id: string
}
