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
        dispatch(genericActionHandler(types.CREATE_SITE))
        var mappedRecord = mapRecord(SiteRecord, inputDataWithUUID);
        return fetchHelper("post", "/sites/", mappedRecord)
          .then(response => dispatch(genericActionHandler(types.CREATE_SITE_SUCCESS, response, mappedRecord)))
          .catch(reason => dispatch(genericActionHandler(types.CREATE_SITE_FAIL, reason)))
    }
}

export function fetchAllSitesAsync() {
    /**
     * @TODO
     * make sure to do a Store check before fetching,
     * the last thing we want is to waste requests
     */
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ALL_SITES))
        return fetchHelper("get", "/sites/")
          .then(response => dispatch(genericActionHandler(types.FETCH_ALL_SITES_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ALL_SITES_FAIL, reason)))
    }
}

export function updateSiteAsync(updatedSiteList) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_SITE_LIST))
        return dispatch(genericActionHandler(types.FETCH_ALL_SITES_SUCCESS, { data: updatedSiteList }))
    }
}

export function fetchOneSiteAsync(siteID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ONE_SITE))
        return fetchHelper("get", `/sites/${siteID}`)
          .then(response => dispatch(genericActionHandler(types.FETCH_ONE_SITE_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ONE_SITE_FAIL, reason)))
    }

}

export function updateSiteAsync(siteID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_SITE))
        return fetchHelper("put", `/sites/${siteID}`)
          .then(response => dispatch(genericActionHandler(types.UPDATE_SITE_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.UPDATE_SITE_FAIL, reason)))
    }
}

export function deleteSiteAsync(siteID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.DELETE_SITE))
        return fetchHelper("delete", `/sites/${siteID}`)
          .then(response => dispatch(genericActionHandler(types.DELETE_SITE_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.DELETE_SITE_FAIL, reason)))
    }
}



