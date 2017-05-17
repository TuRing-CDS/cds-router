/**
 * Created by Z on 2017-05-17.
 */
import {BaseController, UserController} from './init';
import 'jest';
import {TAG_RESPONSE} from "../lib/response";

describe('Parameter', () => {

    it(` BaseController's index have [ 200 ] response`,()=>{

        expect(BaseController[TAG_RESPONSE].get('index').get(200)).not.toBe(undefined);

    });

    it(` BaseController's index haven't [ 500 ] response`,()=>{

        expect(BaseController[TAG_RESPONSE].get('index').get(500)).toBe(undefined);

    });


    it(` UserController's doGet have [ 200 ] response`,()=>{

        expect(UserController[TAG_RESPONSE].get('doGet').get(200)).not.toBe(undefined);

    });

    it(` UserController's doGet have [ 201 ] response`,()=>{

        expect(UserController[TAG_RESPONSE].get('doGet').get(201)).not.toBe(undefined);

    });

    it(` UserController's doGet haven't [ 303 ] response`,()=>{

        expect(UserController[TAG_RESPONSE].get('doGet').get(303)).toBe(undefined);

    });

    it(` UserController's doPost have [ 303 ] response`,()=>{

        expect(UserController[TAG_RESPONSE].get('doPost').get(303)).not.toBe(undefined);

    });

});