/**
 * TransactionRecord.js
 *
 * [RECORD]
 */

import { createImmutableRecord } from "./utils";
import type { ImmutableRecord } from "./utils";

type Transaction = {
  id: string;
  name: string;
  operator_id: string;
  player_id: string;
  site_id: string;
  bank_id: string;
  reff: string;
  transfer: string;
  deposit: string;
  withdraw: string;
  bonus: string;
  transaction_notes: string;
  transfer_notes: string;
  bonus_notes: string;
};

const attribute: Transaction = {
  id: "",
  name: "",
  operator_id: "",
  player_id: "",
  site_id: "",
  bank_id: "",
  reff: "",
  transfer: "",
  deposit: "",
  withdraw: "",
  bonus: "",
  transaction_notes: "",
  transfer_notes: "",
  bonus_notes: "",
};

const TransactionRecord: ImmutableRecord = createImmutableRecord(attribute);

export default TransactionRecord;




