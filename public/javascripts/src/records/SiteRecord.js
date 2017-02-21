/**
 * SiteRecord.js
 *
 * [RECORD]
 */

import { createImmutableRecord } from "./utils";
import type { ImmutableRecord } from "./utils";

type Site = {
  id: string;
  name: string;
  url: string;
  operator_id: string;
};

const attribute: Site = {
  id: "",
  name: "",
  url: "",
  operator_id: "",
};

const SiteRecord: ImmutableRecord = createImmutableRecord(attribute);

export default SiteRecord;



