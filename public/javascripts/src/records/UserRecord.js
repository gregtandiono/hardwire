/**
 * UserRecord.js
 *
 * [RECORD]
 */

import { createImmutableRecord } from "./utils";
import type { ImmutableRecord } from "./utils";

type User = {
  username: string;
  password: string;
};

const attribute: User = {
  username: "",
  password: ""
};

const UserRecord: ImmutableRecord = createImmutableRecord(attribute);

export default UserRecord;
