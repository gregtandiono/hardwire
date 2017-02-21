/**
 * PlayerRecord.js
 *
 * [RECORD]
 */

import { createImmutableRecord } from "./utils";
import type { ImmutableRecord } from "./utils";

type Player = {
  id: string;
  name: string;
  cellphone: string;
  ym: string;
  email: string;
  notes: string;
  operator_id: string;
};

const attribute: Player = {
  id: "",
  name: "",
  cellphone: "",
  ym: "",
  email: "",
  notes: "",
  operator_id: ""
};

const PlayerRecord: ImmutableRecord = createImmutableRecord(attribute);

export default PlayerRecord;
