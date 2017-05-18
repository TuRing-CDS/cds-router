/**
 * Created by Z on 2017-05-17.
 */
import {BaseController, UserController} from './init';
import 'jest';
import {TAG_PARAMETER, ENUM_PARAM_IN} from "../lib/parameter";

describe('Parameter', () => {

    it(` BaseController's index method should have [ parameter {version} ] `, () => {

        expect(BaseController[TAG_PARAMETER].get('index').get('version')).not.toBe(undefined);

    });

    it(` BaseController's index method [ parameter {version} ]'s description should be '版本'`, () => {

        expect(BaseController[TAG_PARAMETER].get('index').get('version').schema._description).toBe('版本');

    });

    it(` BaseController's index method [ parameter {version} ]'s in should be 'ENUM_PARAM_IN.query'`, () => {

        expect(BaseController[TAG_PARAMETER].get('index').get('version').in).toBe(ENUM_PARAM_IN.query);

    });

    it(` UserController's doPost method should have [ parameter {user} ] `, () => {

        expect(UserController[TAG_PARAMETER].get('doPost').get('user')).not.toBe(undefined);

    });

    it(` UserController's doPost method [ parameter {user} ]'s description should be 'user'`, () => {

        expect(UserController[TAG_PARAMETER].get('doPost').get('user').schema._description).toBe('user');

    });

    it(` UserController's doPost method [ parameter {user}]'s in should be 'ENUM_PARAM_IN.body'`, () => {

        expect(UserController[TAG_PARAMETER].get('doPost').get('user').in).toBe(ENUM_PARAM_IN.body);

    });

    it(` UserController's doDelete method [ parameter {uid}]'s in should be 'ENUM_PARAM_IN.path'`, () => {

        expect(UserController[TAG_PARAMETER].get('doDelete').get('uid').in).toBe(ENUM_PARAM_IN.path);

    });

    it(` UserController's doDelete method [ parameter {uid} ]'s description should be '用户ID'`, () => {

        expect(UserController[TAG_PARAMETER].get('doDelete').get('uid').schema._description).toBe('用户ID');

    });


    it(` UserController's doPut method [ parameter {token}]'s in should be 'ENUM_PARAM_IN.header'`, () => {

        expect(UserController[TAG_PARAMETER].get('doPut').get('token').in).toBe(ENUM_PARAM_IN.header);

    });

    it(` UserController's doPut method [ parameter {token} ]'s description should be 'token'`, () => {

        expect(UserController[TAG_PARAMETER].get('doPut').get('token').schema._description).toBe('token');

    });

});