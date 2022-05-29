import { gql, useQuery } from "@apollo/client";
import { PAGINATION_PART_OF_QUERY, truncateText, timeSince, BlockLink, ExtrinsicLink } from "../utils";
import RTable from "./RTable";


export default function EventTable({moreVariables, noMore}: Props) {
  const query = gql`
    query Events($first: Int, $orderBy: [EventsOrderBy!], $filter: EventFilter, $after: Cursor) {
      query {
        events(first: $first, orderBy: $orderBy, filter: $filter, after: $after) {
          ${PAGINATION_PART_OF_QUERY}
          nodes {
            id
            section
            method
            extrinsicId
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
    { Header: "Event Id", accessor: "id" },
    { Header: "Block", accessor: "block" },
    { Header: "Extrinsic Id", accessor: "extrinsicId" },
    { Header: "Time", accessor: "time" },
    { Header: "Action", accessor: "action" }
  ];
  const { loading, error, data, fetchMore } = useQuery(query, {variables: variables});

  const rData =
    data &&
    data.query.events.nodes.map(
      (d: EventData) => ({
        id: d.id,
        block: BlockLink(d.block.id),
        extrinsicId: d.extrinsicId && ExtrinsicLink(d.extrinsicId),
        time: timeSince(d.block.timestamp),
        action: `${d.section} (${d.method})`
      })
    );
  
  // console.log(rData)

  const loadMore = () => {
    fetchMore({
      variables: {after: data.query.events.pageInfo.endCursor}
    })
    console.log(`Load more after ${data.query.events.pageInfo.endCursor}`)
  }

  return (
    <RTable  {...{data, rData, columns, loadMore, loading, noMore, hasNextPage: data?.query.events.pageInfo.hasNextPage }}/>
  )
}

interface EventData {
  id: string
  section: string
  method: string
  extrinsicId?: string
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
