import { useEffect, useState } from "react";
import { suggest, Suggestion } from "../lib/search";

// `null` indicates loading
export type SearchSuggestionsData = null | Suggestion[];

const useSearchSuggestions = (input: string): SearchSuggestionsData => {
  const [suggestions, setSuggestions] = useState<SearchSuggestionsData>(null);

  useEffect(() => {
    suggest(input).then((suggestions) => setSuggestions(suggestions));
  }, [input]);

  return suggestions;
};

export default useSearchSuggestions;
