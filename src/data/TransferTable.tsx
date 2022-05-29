import { gql, useQuery } from "@apollo/client";
import { PAGINATION_PART_OF_QUERY, truncateText, timeSince, BlockLink, ExtrinsicLink, AccountLink } from "../utils";
import RTable from "./RTable";


export default function TransferTable({moreVariables, noMore}: Props) {
  const query = gql`
    query Transfers($first: Int, $orderBy: [TransfersOrderBy!], $filter: TransferFilter, $after: Cursor) {
      query {
        transfers(first: $first, orderBy: $orderBy, filter: $filter, after: $after) {
          ${PAGINATION_PART_OF_QUERY}
          nodes {
            id
            fromId
            toId
            value
            extrinsicIndex
            eventIndex
            block {
              id
              number
              timestamp
            }
          }
        }
      }
    }
  `
  const variables = {
    "first": 20,
    "orderBy": ["BLOCK_NUMBER_DESC", "EVENT_INDEX_DESC"],
    ...moreVariables
  }

  const columns = [
    { Header: "Extrinsic Id", accessor: "id" },
    { Header: "Block", accessor: "block" },
    { Header: "Time", accessor: "time" },
    { Header: "From", accessor: "from" },
    { Header: "To", accessor: "to" },
    { Header: "Value", accessor: "value" }
  ];
  const { loading, error, data, fetchMore } = useQuery(query, {variables: variables});

  const rData =
    data &&
    data.query.transfers.nodes.map(
      (d: TransferData) => ({
        id: d.id,
        block: BlockLink(d.block.id),
        extrinsic: d.extrinsicIndex && ExtrinsicLink(`${d.block.id}-${d.extrinsicIndex}`),
        time: timeSince(d.block.timestamp),
        from: AccountLink(d.fromId),
        to: AccountLink(d.toId),
        value: d.value / 10**18
      })
    );
  
  // console.log(rData)

  const loadMore = () => {
    fetchMore({
      variables: {after: data.query.transfers.pageInfo.endCursor}
    })
    console.log(`Load more after ${data.query.transfers.pageInfo.endCursor}`)
  }

  return (
    <RTable  {...{data, rData, columns, loadMore, loading, noMore, hasNextPage: data?.query.transfers.pageInfo.hasNextPage }}/>
  )
}

interface TransferData {
  id: string
  fromId: string
  toId: string
  value: number
  extrinsicIndex?: number
  eventIndex: number
  block: {
    id: string
    number: number
    timestamp: string
  }
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
