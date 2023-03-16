import { ApolloClient, gql } from "@apollo/client";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";
import { SS58_PREFIX } from "../utils";

export type GenericSuggestion<Type, Value> = { type: Type; value: Value };

export type AddressSuggestion = GenericSuggestion<"address", string>;
export type BlockSuggestion = GenericSuggestion<"block", number>;
export type ExtrinsicSuggestion = GenericSuggestion<
  "extrinsic",
  `${number}-${number}`
>;

export type Suggestion =
  | AddressSuggestion
  | BlockSuggestion
  | ExtrinsicSuggestion;

export type SearchContext = {
  client: ApolloClient<any>;
};

export const suggest = async (
  ctx: SearchContext,
  input: string
): Promise<Suggestion[]> => {
  const promises = Promise.allSettled([
    suggestHashLookup(input, ctx.client),
    suggestExtrinsic(input),
    suggestBlock(input),
    suggestAddress(input),
  ]);
  const results = await promises;

  const suggestions = results.flatMap((result) =>
    result.status === "fulfilled" ? (result.value as Suggestion[]) : []
  );

  return suggestions;
};

export const parseAddress = (input: string): string | null => {
  if (!input.match(/^[1-9A-Za-z]+$/g)) {
    return null;
  }
  try {
    const parsedAddress = decodeAddress(input);
    return encodeAddress(parsedAddress, SS58_PREFIX);
  } catch {
    return null;
  }
};

export const parseBlockNumber = (input: string): number | null => {
  if (!input.match(/^\d+$/g)) {
    return null;
  }
  try {
    return parseInt(input);
  } catch {
    return null;
  }
};

export const parseExtrinsicId = (input: string): [number, number] | null => {
  if (!input.match(/^\d+-\d+$/g)) {
    return null;
  }
  try {
    const [blockNumber, extrinsicIndex] = input.split("-", 2);
    return [parseInt(blockNumber), parseInt(extrinsicIndex)];
  } catch {
    return null;
  }
};

export const parseHexFixedLength = (
  input: string,
  bytes: number
): `0x${string}` | null => {
  const re = new RegExp(`^0x[0-9a-zA-Z]{${bytes * 2}}$`, "g");
  if (!input.match(re)) {
    return null;
  }
  return input as `0x${string}`;
};

export const suggestAddress = async (
  input: string
): Promise<AddressSuggestion[]> => {
  const address = parseAddress(input);
  if (!address) {
    return [];
  }
  return [{ type: "address", value: address }];
};

export const suggestBlock = async (
  input: string
): Promise<BlockSuggestion[]> => {
  const blockNumber = parseBlockNumber(input);
  if (!blockNumber) {
    return [];
  }
  return [{ type: "block", value: blockNumber }];
};

export const suggestExtrinsic = async (
  input: string
): Promise<ExtrinsicSuggestion[]> => {
  const extrinsicId = parseExtrinsicId(input);
  if (!extrinsicId) {
    return [];
  }
  const [blockNumber, extrinsicIndex] = extrinsicId;
  return [{ type: "extrinsic", value: `${blockNumber}-${extrinsicIndex}` }];
};

export const suggestHashLookup = async (
  input: string,
  client: ApolloClient<any>
): Promise<Suggestion[]> => {
  const hash = parseHexFixedLength(input, 32);
  if (!hash) {
    return [];
  }

  const query = gql`
    query SearchHash($hash: String!) {
      extrinsics(filter: { hash: { equalTo: $hash } }) {
        nodes {
          id
        }
      }
      blocks(filter: { hash: { equalTo: $hash } }) {
        nodes {
          id
        }
      }
    }
  `;
  const variables = {
    hash,
  };

  try {
    const result = await client.query({ query, variables });

    if (result.errors) {
      console.warn(`Errors while searching hashes`, result.errors);
    }

    const { extrinsics, blocks } = result.data;

    let suggestions: Suggestion[] = [];

    if (extrinsics) {
      suggestions = [
        ...suggestions,
        ...extrinsics.nodes.map((extrinsic: { id: string }) => ({
          type: "extrinsic",
          value: extrinsic.id,
        })),
      ];
    }

    if (blocks) {
      suggestions = [
        ...suggestions,
        ...blocks.nodes.map((block: { id: string }) => ({
          type: "block",
          value: block.id,
        })),
      ];
    }

    return suggestions;
  } catch (e: unknown) {
    console.error(`Searching hash error: ${e}`);
    return [];
  }
};

export const suggestionRoute = (suggestion: Suggestion): string => {
  switch (suggestion.type) {
    case "address":
      return `/account/${suggestion.value}`;
    case "block":
      return `/block/${suggestion.value}`;
    case "extrinsic":
      return `/extrinsic/${suggestion.value}`;
  }
};
