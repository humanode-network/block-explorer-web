import { Box } from "@chakra-ui/react";
import Loading from "../components/Loading";
import useQuery from "../hooks/useQuery";
import useSearchSuggestions from "../hooks/useSearchSuggestions";
import { suggestionRoute } from "../lib/search";

export default function Search() {
  const query = useQuery();
  const q = query.get("q") || "";

  const suggestions = useSearchSuggestions(q);

  if (suggestions === null) {
    return <Loading />;
  }

  if (suggestions.length === 0) {
    return (
      <Box>
        No results found, make sure to pass in a block, extrinsic or address.
      </Box>
    );
  }

  const route = suggestionRoute(suggestions[0]);

  // Navigate to the suggested route.
  window.location.href = route;

  return <Loading />;
}
