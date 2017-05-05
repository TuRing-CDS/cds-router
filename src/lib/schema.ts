/**
 * Created by iZhui on 2017/5/5.
 */
const TAG_SCHEMA = Symbol('schema');

declare class Schema {
    key: string;
    schema: any
}
/**
 * Schema
 * @param obj
 * @returns {(target:any, key:any)=>undefined}
 */
export function schema(obj: Object) {
    return function (target, key) {
        const schema: Schema[] = target[TAG_SCHEMA] || [];
        schema.push({key, schema: obj})
        target[TAG_SCHEMA] = schema;
    }
}