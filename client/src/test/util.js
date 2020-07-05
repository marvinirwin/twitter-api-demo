import fs from "fs-extra";
import {join} from "path";
import axios from "axios";

const searchResults = fs.readJsonSync(join(__dirname, "SearchResults.json"))
export function resolveSearchResult(q) {
    return searchResults[JSON.stringify([{q}])];
}

