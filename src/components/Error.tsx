import {
  Alert,
  AlertIcon,
  Box
} from '@chakra-ui/react'


export default function Error() {
  return (
    <Box>
      <Alert status='error'>
        <AlertIcon />
        Request failed. Check your network and refresh.
      </Alert>
    </Box>
  )
}