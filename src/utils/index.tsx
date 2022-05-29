import { Link } from "@chakra-ui/react";
import { FieldPolicy, InMemoryCache } from "@apollo/client";

export const ENDPOINT = "https://api.subquery.network/sq/parascan-xyz/basilisk-parascan__cGFyY"

const fieldPolicy: FieldPolicy = {
  keyArgs: false,
  merge(existing = {nodes: []}, incoming) {
    return {
      nodes: [...existing.nodes, ...incoming.nodes],
      totalCount: incoming.totalCount,
      pageInfo: incoming.pageInfo
    };
  }
}

export const CACHE = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        blocks: fieldPolicy,
        extrinsics: fieldPolicy,
        events: fieldPolicy,
        transfers: fieldPolicy,
      },
    },
  },
});

export const PAGINATION_PART_OF_QUERY = `
  pageInfo {
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
  }
  totalCount
`;

export const truncateText = (text:string, l=6) => {
  if (l && l>0) {
    return `${text.slice(0, l+2)}...${text.slice(-l)}`
  } else {
    return text
  }
}

// timeSince copied from https://stackoverflow.com/a/3177838/7283203
export const timeSince = (date: number | string) => {
  if (!date) {
    return null;
  }
  const nowDate = new Date()
  var seconds = Math.floor(
    ((nowDate.valueOf() - new Date(date).valueOf()) / 1000)
    // add timezone offset because date is in UTC
    + nowDate.getTimezoneOffset() * 60
  );

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export const BlockLink = (block: string) => {
  return (
    <Link href={`/block/${block}`} color="blue.600">
      {block}
    </Link>
  )
}

export const ExtrinsicLink = (extrinsic: string) => {
  return (
    <Link href={`/extrinsic/${extrinsic}`} color="blue.600">
      {extrinsic}
    </Link>
  )
}

export const AccountLink = (account: string) => {
  return (
    <Link href={`/account/${account}`} color="blue.600">
      {truncateText(account)}
    </Link>
  )
}
