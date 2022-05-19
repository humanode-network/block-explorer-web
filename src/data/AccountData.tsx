import { Box, Heading } from "@chakra-ui/react";
import Tabs from "../components/Tabs"
import ExtrinsicTable from "./ExtrinsicTable";


export default function ExtrinsicData({id}: Props) {
  const filter = {"signerId": {"equalTo": id.toLowerCase()}}
  const tabsData = [
    {label: "Extrinsics", content: <ExtrinsicTable moreVariables={{filter}}/>},  ]

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
