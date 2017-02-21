/**
 * BankRecord.js
 *
 * [RECORD]
 */

import { createImmutableRecord } from "./utils";
import type { ImmutableRecord } from "./utils";

type Bank = {
  id: string;
  name: string;
  player_id: string;
  operator_id: string;
  other_name: string;
  account_holder: string;
  account_number: string;
  system_ownership: string;
  username: string;
  password: string;
};

const attribute: Bank = {
  id: "",
  name: "",
  player_id: "",
  operator_id: "",
  other_name: "",
  account_holder: "",
  account_number: "",
  system_ownership: "",
  username: "",
  password: "",
};

const BankRecord: ImmutableRecord = createImmutableRecord(attribute);

export default BankRecord;

