/**
 * GameRecord.js
 *
 * [RECORD]
 */

import { createImmutableRecord } from "./utils";
import type { ImmutableRecord } from "./utils";

type Game = {
  id: string;
  name: string;
  player_id: string;
  operator_id: string;
  balance: number;
  deposit: number;
  withdraw: number;
  bonus: number;
  cancel_bonus: number;
  notes: string;
};

const attribute: Game = {
  id: "",
  name: "",
  player_id: "",
  operator_id: "",
  balance: "",
  deposit: "",
  withdraw: "",
  bonus: "",
  cancel_bonus: "",
  notes: "",
};

const GameRecord: ImmutableRecord = createImmutableRecord(attribute);

export default GameRecord;


