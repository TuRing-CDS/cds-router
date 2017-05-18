/**
 * Created by Z on 2017-05-18.
 */
import {BaseController, UserController} from './init';
import 'jest';
import {TAG_TAG} from "../lib/tag";

describe('Tag', () => {
    it(` BaseController's tags should be equal 'undefined'`, () => {

        expect(BaseController[TAG_TAG]).toBe(undefined);

    });

    it(` UserController's doGet tag should be equal 'User'`, () => {

        expect([...UserController[TAG_TAG].get('doGet')]).toEqual(['User']);

    });

    it(` UserController's doPut tag should be equal undefined`, () => {

        expect(UserController[TAG_TAG].get('doPut')).toBe(undefined);

    });

});