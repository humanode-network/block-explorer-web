import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import BlockData from "../data/BlockData";

export default function Block() {
  const { id } = useParams() as {[key: string]: string}
  return (
    <Box>
      <BlockData id={id}/>
    </Box>
  )
}
