import Department from "./Department";
import { ISODate, isISODate } from "./ISODateStrings";

export type SearchQuery = {
  family?: string;
  name?: string;
  surname?: string;
  department?: Department;
  startDate: ISODate;
  endDate: ISODate;
};

isSearchQuery({});

export function isSearchQuery(entity: unknown): entity is SearchQuery {
  const query = entity as SearchQuery;

  const keys = ["startDate", "endDate"] as (keyof SearchQuery)[];
  for (const key of keys) {
    if (!isISODate(query[key])) {
      return false;
    }
  }

  return true;
}
