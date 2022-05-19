import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import Overview, {Data as OverviewData} from "../components/Overview";
import Tabs from "../components/Tabs"
import { timeSince } from "../utils";
import EventTable from "./EventTable";


export default function ExtrinsicData({id}: Props) {
  const filter = {"extrinsicId": {"equalTo": id}}
  const tabsData = [
    {label: "Events", content: <EventTable moreVariables={{filter}} />}
  ]

  return(
    <Box>
      <Heading>Extrinsic #{id}</Heading>
      <br />
      <ExtrinsicOverview id={id} />
      <br />
      <Tabs data={tabsData} />
    </Box>
  )
}

function ExtrinsicOverview({id}: Props) {
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
  `
  const variables = {
    "extrinsicId": id
  }

  const { loading, error, data } = useQuery(query, {variables: variables});
  let overviewData: OverviewData = []
  if (data) {
    const extrinsic = data.query.extrinsic
    overviewData = [
      {label: "Timestamp (UTC)", value: extrinsic.block.timestamp},
      {label: "Block", value: extrinsic.block.id},
      {label: "Hash", value: extrinsic.hash},
      {label: "Module", value: extrinsic.section},
      {label: "Call", value: extrinsic.method},
      {label: "Sender", value: extrinsic.signerId},
      {label: "Events", value: extrinsic.events.totalCount},
      {label: "Age", value: timeSince(extrinsic.block.timestamp)},
    ]
  }

  return (
    <Overview data={overviewData} />
  )
}

interface Props {
  id: string
}
