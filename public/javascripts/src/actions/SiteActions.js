/**
 * SiteActions.js
 */

import { fetchHelper } from "../async/utils"
import { mapRecord } from "../records/utils"
import SiteRecord from "../records/SiteRecord"
import * as types from "../constants/SiteConstants"
import store from "../store/index"
import { extend } from "underscore"
import generateUUID from "../utils/uuid"
import { fetchToken } from "../async/utils"
import genericActionHandler from "./genericActionHandler"

export function createSiteAsync(inputData) {
    var inputDataWithUUID = extend({}, inputData, {
        id: generateUUID(),
        owner_id: fetchToken().user_id
    });
    return (dispatch) => {
        dispatch(genericHandler(types.CREATE_SITE))
        var mappedRecord = mapRecord(SiteRecord, inputDataWithUUID);
        return fetchHelper("post", "/sites/", mappedRecord)
          .then(response => dispatch(genericActionHandler(types.CREATE_SITE_SUCCESS, response, mappedRecord)))
          .catch(reason => dispatch(genericActionHandler(types.CREATE_SITE_FAIL, reason)))
    }
}