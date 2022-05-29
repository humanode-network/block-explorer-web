import { Box, Heading } from "@chakra-ui/react";
import Tabs from "../components/Tabs"
import ExtrinsicTable from "./ExtrinsicTable";
import TransferTable from "./TransferTable";


export default function ExtrinsicData({id}: Props) {
  id = id.toLowerCase()
  const extrinsicFilter = {"signerId": {"equalTo": id}}
  const transferFilter = {
    "or": [
      {
        "fromId": {
          "equalTo": id
        }
      },
      {
        "toId": {
          "equalTo": id
        }
      }
    ]
  }
  const tabsData = [
    {label: "Extrinsics", content: <ExtrinsicTable moreVariables={{filter: extrinsicFilter}}/>},
    {label: "Transfers", content: <TransferTable moreVariables={{filter: transferFilter}}/>},  
  ]

  return(
    <Box>
      <Heading>Account {id}</Heading>
      <br />
      <Tabs data={tabsData} />
    </Box>
  )
}

interface Props {
  id: string
}
