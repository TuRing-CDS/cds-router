import {registGlobal} from "./utils/index";
import {toSchema} from "./ischema";
/**
 * Created by Z on 2017-05-17.
 */

export const TAG_DEFINITION_NAME = Symbol('DefinitionName');
export const TAG_DEFINITION_DESCRIPTION = Symbol('DefinitionDescription');

export function definition(name?: string, description?: string): ClassDecorator {
    return function (Definition: Function) {
        if (!name) {
            name = Definition.name;
        }
        registGlobal(Definition, (swagger) => {
            swagger.definitions[name] = toSchema(Definition);
        });
        Definition[TAG_DEFINITION_NAME] = name;
        Definition[TAG_DEFINITION_DESCRIPTION] = description || name;
    }
}