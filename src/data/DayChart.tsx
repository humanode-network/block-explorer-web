import { gql, useQuery } from "@apollo/client";
import { Box, Button, Heading, Select, Stack, Text } from "@chakra-ui/react";
import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid, 
  XAxis, YAxis,
  Tooltip, Legend, Line 
} from 'recharts';
import { useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";


export default function DayChart() {
  const [lineKey, setLineKey] = useState('extrinsics')
  const [legend, setLegend] = useState('Extrinsics')
  
  const changeKey = (idx: number) => {
    setLineKey(lineKeyArray[idx]['value'])
    setLegend(lineKeyArray[idx]['key'])
  }

  const query = gql`
    query Days($last: Int, $orderBy: [DaysOrderBy!]) {
      query {
        days(last: $last, orderBy: $orderBy) {
          nodes {
            id
            date
            extrinsics
            events
            transferAmount
            transferCount
          }
        }
      }
    }
  `

  const variables = {
    "last": 30,
    "orderBy": ["YEAR_ASC", "MONTH_ASC", "DATE_ASC"]
  }

  const lineKeyArray = [
    {key: 'Extrinsics', value: 'extrinsics'},
    {key: 'Events', value: 'events'},
    {key: 'Transfer Amount', value: 'transferAmount'},
    {key: 'No. of Transfers', value: 'transferCount'},
  ]

  const { loading, error, data } = useQuery(query, {variables: variables});
  
  return (
    data
    ? (
      <Box>
        <Stack direction="column">
          <Select display={{ base: 'flex', md: 'none' }} 
            onChange={(e:any) => changeKey(e.target.value)}>
            {lineKeyArray.map((x, idx) => (
              <option value={idx} key={x.value}>{x.key}</option>
            ))}
          </Select>
          <Stack direction="row">
            <Stack display={{ base: 'none', md: 'flex' }}>
              {lineKeyArray.map((x, idx) => (
                <Button key={x.value} onClick={() => changeKey(idx)}>{x.key}</Button>
              ))}
            </Stack>
            <Box display="contents">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.query.days.nodes}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign='top'
                    content={<Text color="#F2A006">{legend}</Text>}
                  />
                  <Line type="monotone" dataKey={lineKey} stroke="#F2A006" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Stack>
        </Stack>
      </Box>
    )
    : loading
    ? <Loading />
    : <Error />
  )
}

interface DayData {
  id: string
  date: number
  extrinsics: number
  events: number
  transferAmount: bigint
  transferCount: number
}

