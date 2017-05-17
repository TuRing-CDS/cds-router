/**
 * Created by Z on 2017-05-17.
 */

export const TAG_DEFINITION_NAME = Symbol('DefinitionName');
export const TAG_DEFINITION_DETAIL = Symbol('DefinitionDetail');

export function definition(name?: string, detail?: string): ClassDecorator {
    return function (Definition: Function) {
        if (!name) {
            name = Definition.name;
        }
        Definition[TAG_DEFINITION_NAME] = name;
        Definition[TAG_DEFINITION_DETAIL] = detail || name;
    }
}