/**
 * PlayerRecord.js
 *
 * [RECORD]
 */

import { createImmutableRecord } from "./utils";
import type { ImmutableRecord } from "./utils";

type Player = {
  id: string;
  shift_id: string;
  name: string;
  cellphone: string;
  ym: string;
  email: string;
  notes: string;
  operator_id: string;
  bank_name: string;
  bank_other_name: string;
  bank_account_holder: string;
  bank_account_number: string;
  bank_system_ownership: string;
  bank_username: string;
  bank_password: string;
};

const attribute: Player = {
  id: "",
  shift_id: "",
  name: "",
  cellphone: "",
  ym: "",
  email: "",
  notes: "",
  operator_id: "",
  bank_name: "",
  bank_other_name: "",
  bank_account_holder: "",
  bank_account_number: "",
  bank_system_ownership: "",
  bank_username: "",
  bank_password: "",
};

const PlayerRecord: ImmutableRecord = createImmutableRecord(attribute);

export default PlayerRecord;
