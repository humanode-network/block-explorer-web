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

export const suggest = async (input: string): Promise<Suggestion[]> => {
  const promises = Promise.allSettled([
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
