import { gql, useQuery } from "@apollo/client";
import { PAGINATION_PART_OF_QUERY, truncateText, timeSince, BlockLink, ExtrinsicLink } from "../utils";
import RTable from "./RTable";


export default function ExtrinsicTable({moreVariables, noMore}: Props) {
  const query = gql`
    query Extrinsics($first: Int, $orderBy: [ExtrinsicsOrderBy!], $filter: ExtrinsicFilter, $after: Cursor) {
      query {
        extrinsics(first: $first, orderBy: $orderBy, filter: $filter, after: $after) {
          ${PAGINATION_PART_OF_QUERY}
          nodes {
            id
            hash
            section
            method
            success
            events {
              totalCount
            }
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
    "orderBy": ["BLOCK_NUMBER_DESC", "INDEX_DESC"],
    ...moreVariables
  }

  const columns = [
    { Header: "Extrinsic Id", accessor: "id" },
    { Header: "Block", accessor: "block" },
    { Header: "Extrinsic Hash", accessor: "hash" },
    { Header: "Time", accessor: "time" },
    { Header: "Result", accessor: "result" },
    { Header: "Events", accessor: "events" },
    { Header: "Action", accessor: "action" }
  ];
  const { loading, error, data, fetchMore } = useQuery(query, {variables: variables});

  const rData =
    data &&
    data.query.extrinsics.nodes.map(
      (d: ExtrinsicData) => ({
        id: ExtrinsicLink(d.id),
        block: BlockLink(d.block.id),
        hash: truncateText(d.hash),
        time: timeSince(d.block.timestamp),
        result: String(d.success),
        events: d.events.totalCount,
        action: `${d.section} (${d.method})`
      })
    );
  
  // console.log(rData)

  const loadMore = () => {
    fetchMore({
      variables: {after: data.query.extrinsics.pageInfo.endCursor}
    })
    console.log(`Load more after ${data.query.extrinsics.pageInfo.endCursor}`)
  }

  return (
    <RTable  {...{data, rData, columns, loadMore, loading, noMore, hasNextPage: data?.query.extrinsics.pageInfo.hasNextPage }}/>
  )
}

interface ExtrinsicData {
  id: string
  hash: string
  section: string
  method: string
  success: boolean
  events: {totalCount: number}
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
