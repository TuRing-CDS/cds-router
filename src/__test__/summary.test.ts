/**
 * Created by Z on 2017-05-17.
 */
import {BaseController, UserController} from './init';
import 'jest';
import {TAG_SUMMARY} from "../lib/summary";

describe('Parameter', () => {
    it(` BaseController's index summary should be equal 'BaseController[index]'`, () => {

        expect(BaseController[TAG_SUMMARY].get('index')).toBe('BaseController[index]');

    });

    it(` BaseController's doGet summary should be equal undefined`,()=>{

        expect(BaseController[TAG_SUMMARY].get('doGet')).toBe(undefined);

    });

    it(` UserController's doPost summary should be equal 'UserController[doPost]'`, () => {

        expect(UserController[TAG_SUMMARY].get('doPost')).toBe('UserController[doPost]');

    });
});