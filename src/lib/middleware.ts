/**
 * Created by Z on 2017-05-08.
 */
import {TAG_METHOD_MIDDLE, TAG_MODEL_MIDDLE} from "./constant";
export function methodRegist(target: any, key: string, deal: Function) {
    if (!target[TAG_METHOD_MIDDLE]) {
        target[TAG_METHOD_MIDDLE] = {};
    }
    if (!target[TAG_METHOD_MIDDLE][key]) {
        target[TAG_METHOD_MIDDLE][key] = [];
    }
    target[TAG_METHOD_MIDDLE][key].push(deal);
}

export function modelRegist(model: any, deal: Function) {
    if (!model[TAG_MODEL_MIDDLE]) {
        model[TAG_MODEL_MIDDLE] = [];
    }
    model[TAG_MODEL_MIDDLE].push(deal);
}