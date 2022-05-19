import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AccountData from "../data/AccountData";

export default function Account() {
  const { id } = useParams() as {[key: string]: string}
  return (
    <Box>
      <AccountData id={id}/>
    </Box>
  )
}
