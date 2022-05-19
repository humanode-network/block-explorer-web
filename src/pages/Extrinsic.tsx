import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExtrinsicData from "../data/ExtrinsicData";

export default function Extrinsic() {
  const { id } = useParams() as {[key: string]: string}
  return (
    <Box>
      <ExtrinsicData id={id}/>
    </Box>
  )
}
