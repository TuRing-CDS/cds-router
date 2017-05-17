/**
 * Created by Z on 2017-05-17.
 */
import {BaseController, UserController} from './init';
import 'jest';
import {TAG_DESCRIPTION} from "../lib/description";

describe('Description', () => {
    it(` BaseController's index description should be equal 'BaseController[index]'`, () => {

        expect(BaseController[TAG_DESCRIPTION].get('index')).toBe('首页');

    });

    it(` BaseController's doGet description should be equal undefined`, () => {

        expect(BaseController[TAG_DESCRIPTION].get('doGet')).toBe(undefined);

    });

    it(` UserController's doDelete description should be equal '删除用户'`, () => {

        expect(UserController[TAG_DESCRIPTION].get('doDelete')).toBe('删除用户');

    });

    it(` UserController's doPut description should be equal undefined`, () => {

        expect(UserController[TAG_DESCRIPTION].get('doPut')).toBe(undefined);

    });

});