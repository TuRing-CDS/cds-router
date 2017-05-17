/**
 * Created by Z on 2017-05-17.
 */


import {UserSchema} from './init';
import 'jest';
import {TAG_DEFINITION_NAME, TAG_DEFINITION_DESCRIPTION} from "../lib/definition";

describe('Definition', () => {

    it(` UserSchema's name should be equal 'User'`, () => {
        expect(UserSchema[TAG_DEFINITION_NAME]).toBe('User')
    });

    it(` UserSchema's description should be equal '用户实体'`, () => {
        expect(UserSchema[TAG_DEFINITION_DESCRIPTION]).toBe('用户实体')
    });

});