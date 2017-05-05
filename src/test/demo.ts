/**
 * Created by iZhui on 2017/5/5.
 */
import {get, controller} from '../lib';

@controller('/v3/api')
class Demo {

    @get()
    index() {
        console.log('index');
    }

}