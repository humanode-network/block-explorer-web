import { Box } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

export default function Search() {
  const { id } = useParams() as {[key: string]: string}
  if (id.slice(0,2) === "0x") {
    window.open(`/account/${id}`, "_self")
  } else if (id.indexOf("-") >= 0) {
    window.open(`/extrinsic/${id}`, "_self")
  } else if (!isNaN(parseInt(id))) {
    window.open(`/block/${id}`, "_self")
  }
  return (
    <Box>
      404 Error: Not Found
    </Box>
  )
}
