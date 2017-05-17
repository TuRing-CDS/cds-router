/**
 * Created by Z on 2017-05-17.
 */
import {BaseController, UserController} from './init';
import 'jest';
import {TAG_METHOD} from "../lib/method";
import {TAG_CONTROLLER} from "../lib/controller";

describe('Controller', () => {

    it(` BaseController's path should be equal '/v3/api'`, () => {

        expect(BaseController[TAG_CONTROLLER]).toBe('/v3/api');

    });

    it(` UserCOntroller's path should be equal '/v3/api/user'`, () => {

        expect(UserController[TAG_CONTROLLER]).toBe('/v3/api/user');

    });

});