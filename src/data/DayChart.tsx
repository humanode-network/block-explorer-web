import { gql, useQuery } from "@apollo/client";
import { Box, Button, Select, Stack, Text } from "@chakra-ui/react";
import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useSize } from "react-use";

export default function DayChart() {
  const [lineKey, setLineKey] = useState("extrinsics");
  const [legend, setLegend] = useState("Extrinsics");

  const changeKey = (idx: number) => {
    setLineKey(lineKeyArray[idx]["value"]);
    setLegend(lineKeyArray[idx]["key"]);
  };

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
  `;

  const variables = {
    last: 30,
    orderBy: ["YEAR_ASC", "MONTH_ASC", "DATE_ASC"],
  };

  const lineKeyArray = [
    { key: "Extrinsics", value: "extrinsics" },
    { key: "Events", value: "events" },
    { key: "Transfer Amount", value: "transferAmount" },
    { key: "No. of Transfers", value: "transferCount" },
  ];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery(query, { variables: variables });

  const [ChartContainer] = useSize(
    ({ width }) => (
      <Stack
        w="100%"
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgb(25 25 25)"
      >
        {data ? (
          <ResponsiveContainer height={400}>
            <LineChart data={data.query.days.nodes}>
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  borderColor: "inherit",
                  backgroundColor: "rgb(25 25 25)",
                }}
              />
              <Legend
                verticalAlign="top"
                content={
                  <Text color="#49c5a9" pb={4}>
                    {legend}
                  </Text>
                }
              />
              <Line
                width={width}
                type="monotone"
                dataKey={lineKey}
                stroke="#49c5a9"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : loading ? (
          <Loading />
        ) : (
          <Error />
        )}
      </Stack>
    ),
    { width: 100, height: 100 }
  );

  return (
    <Stack direction="column">
      <Select
        display={{ base: "flex", md: "none" }}
        mt={4}
        onChange={(e: any) => changeKey(e.target.value)}
      >
        {lineKeyArray.map((x, idx) => (
          <option value={idx} key={x.value}>
            {x.key}
          </option>
        ))}
      </Select>
      <Stack direction="row" gap={2}>
        <Stack display={{ base: "none", md: "flex" }} mt={10}>
          {lineKeyArray.map((x, idx) => (
            <Button key={x.value} onClick={() => changeKey(idx)}>
              {x.key}
            </Button>
          ))}
        </Stack>
        <Box display="contents">{ChartContainer}</Box>
      </Stack>
    </Stack>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DayData {
  id: string;
  date: number;
  extrinsics: number;
  events: number;
  transferAmount: bigint;
  transferCount: number;
}
