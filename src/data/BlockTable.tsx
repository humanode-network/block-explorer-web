import { gql, useQuery } from "@apollo/client";
import { PAGINATION_PART_OF_QUERY, truncateText, timeSince, BlockLink } from "../utils";
import RTable from "./RTable";


export default function BlockTable( { moreVariables, noMore }: Props) {
  const query = gql`
    query Blocks($first: Int, $orderBy: [BlocksOrderBy!], $filter: BlockFilter, $after: Cursor) {
      query {
        blocks(first: $first, orderBy: $orderBy, filter: $filter, after: $after) {
          ${PAGINATION_PART_OF_QUERY}
          nodes {
            id
            number
            hash
            timestamp
            parentHash
            extrinsics {
              totalCount
            }
            events {
              totalCount
            }
          }
        }
      }
    }
  `

  const variables = {
    "first": 20,
    "orderBy": "NUMBER_DESC",
    ...moreVariables
  }

  const columns = [
    { Header: "Block", accessor: "block" },
    { Header: "Time", accessor: "time" },
    { Header: "Extrinsics", accessor: "extrinsics" },
    { Header: "Events", accessor: "events" },
    { Header: "Block hash", accessor: "hash" }
  ];
  const { loading, error, data, fetchMore } = useQuery(query, {variables: variables});

  const rData =
    data &&
    data.query.blocks.nodes.map(
      (d: BlockData) => ({
        block: BlockLink(d.id),
        extrinsics: d.extrinsics.totalCount,
        events: d.events.totalCount,
        time: timeSince(d.timestamp),
        hash: truncateText(d.hash),
      })
    );
  
  // console.log(rData)

  const loadMore = () => {
    fetchMore({
      variables: {after: data.query.blocks.pageInfo.endCursor}
    })
    console.log(`Load more after ${data.query.blocks.pageInfo.endCursor}`)
  }

  return (
    <RTable  {...{data, rData, columns, loadMore, loading, noMore, hasNextPage: data?.query.blocks.pageInfo.hasNextPage }}/>
  )
}

interface BlockData {
  id: string
  number: number
  hash: string
  timestamp: string
  parentHash: string
  extrinsics: {totalCount: number}
  events: {totalCount: number}
}

interface Props {
  noMore?: boolean
  moreVariables?: {
    first?: number
    after?: string
    filter?: any
    orderBy?: any
  }
}
