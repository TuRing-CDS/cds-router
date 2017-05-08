// import {TAG_SCHEMA} from "./constant";
// import {methodRegist} from "./middleware";
// /**
//  * Created by Z on 2017-05-08.
//  */
//
// const globaSchemas: Map<Object,string> = new Map;
//
// /**
//  * Schema
//  * @param code
//  * @param schema
//  * @returns {(target:any, key:string)=>undefined}
//  */
// export function schema(name?: string, code: number, schema: Object) {
//     return function (target: any, key: string) {
//         let schemas = target[TAG_SCHEMA] || new Map();
//         let tempKey = [key, code].join(':');
//         schemas.set(tempKey, schema);
//         methodRegist(target, key, (router, swagger) => {
//             if (!swagger['definitions']) {
//                 swagger['definitions'] = {};
//             }
//             if (!name) {
//                 name = [code, key, Date.now()].join('_');
//             }
//             let ref = name;
//             if (!globaSchemas.has(schema)) {
//                 globaSchemas.set(schema, ref);
//             }
//             ref = globaSchemas.get(schema);
//             if(!router.responses){
//                 router.responses = {};
//             }
//             router.responses[code].sch
//         });
//         target[TAG_SCHEMA] = schemas;
//     }
// }