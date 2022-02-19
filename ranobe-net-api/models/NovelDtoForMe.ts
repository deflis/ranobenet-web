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
 * @interface NovelDtoForMe
 */
export interface NovelDtoForMe {
    /**
     * 
     * @type {number}
     * @memberof NovelDtoForMe
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof NovelDtoForMe
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof NovelDtoForMe
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof NovelDtoForMe
     */
    author?: string | null;
}

export function NovelDtoForMeFromJSON(json: any): NovelDtoForMe {
    return NovelDtoForMeFromJSONTyped(json, false);
}

export function NovelDtoForMeFromJSONTyped(json: any, ignoreDiscriminator: boolean): NovelDtoForMe {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'description': json['description'],
        'author': !exists(json, 'author') ? undefined : json['author'],
    };
}

export function NovelDtoForMeToJSON(value?: NovelDtoForMe | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'description': value.description,
        'author': value.author,
    };
}
