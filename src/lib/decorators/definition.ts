/**
 * Created by Z on 2017-05-13.
 */

export const TAG_DEFINITION = Symbol('Definition');

export function definition(name?: string): ClassDecorator {
    return function (Definition) {
        if (!name) {
            name = Definition.name;
        }
        Definition[TAG_DEFINITION] = name;
    }
}