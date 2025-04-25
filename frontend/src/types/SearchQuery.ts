import { DateISODate, isDateISODate } from "./DateISOStrings";
import Department from "./Department";

export type SearchQuery = {
  family?: string;
  name?: string;
  surname?: string;
  department?: Department;
  startDate: DateISODate;
  endDate: DateISODate;
};

isSearchQuery({});

export function isSearchQuery(entity: unknown): entity is SearchQuery {
  const query = entity as SearchQuery;

  const keys = ["startDate", "endDate"] as (keyof SearchQuery)[];
  for (const key of keys) {
    if (!isDateISODate(query[key])) {
      return false;
    }
  }

  return true;
}
