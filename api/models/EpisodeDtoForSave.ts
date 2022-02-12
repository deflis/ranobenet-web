/* tslint:disable */
/* eslint-disable */
/**
 * RanobeNet
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface EpisodeDtoForSave
 */
export interface EpisodeDtoForSave {
    /**
     * 
     * @type {string}
     * @memberof EpisodeDtoForSave
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof EpisodeDtoForSave
     */
    story: string;
}

export function EpisodeDtoForSaveFromJSON(json: any): EpisodeDtoForSave {
    return EpisodeDtoForSaveFromJSONTyped(json, false);
}

export function EpisodeDtoForSaveFromJSONTyped(json: any, ignoreDiscriminator: boolean): EpisodeDtoForSave {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'title': json['title'],
        'story': json['story'],
    };
}

export function EpisodeDtoForSaveToJSON(value?: EpisodeDtoForSave | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'story': value.story,
    };
}

