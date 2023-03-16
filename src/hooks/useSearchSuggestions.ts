import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { suggest, Suggestion } from "../lib/search";

// `null` indicates loading
export type SearchSuggestionsData = null | Suggestion[];

const useSearchSuggestions = (input: string): SearchSuggestionsData => {
  const [suggestions, setSuggestions] = useState<SearchSuggestionsData>(null);
  const client = useApolloClient();

  useEffect(() => {
    const ctx = { client };
    suggest(ctx, input).then((suggestions) => setSuggestions(suggestions));
  }, [input, client]);

  return suggestions;
};

export default useSearchSuggestions;
