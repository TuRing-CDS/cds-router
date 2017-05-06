/**
 * Created by Z on 2017-05-06.
 */
import {CDSRouter, controller, get, description, schema, ParamOptions, param, Enum_PARAM_IN} from '../lib'

import {string} from 'joi';

@controller('/v3/api')
class Demo {

    @get('/:username/:password')
    @param('username', {required: true, in: Enum_PARAM_IN.PATH})
    @param('password', {required: true, in: Enum_PARAM_IN.PATH})
    @description('首页')
    @schema({
        "name": string().min(8).required()
    })
    doGet(ctx) {
        ctx.statu = 300;
        return {name:'xxxxxxxx'}
    }

    @get('/aaa')
    doGet2() {

    }

}

const cdsRouter = new CDSRouter();

cdsRouter.loadController(Demo);

cdsRouter.invoke('GET', '/v3/api/dagea/ageage').then(console.log).catch((err) => {
    console.log('===>', err);
});