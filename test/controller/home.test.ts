import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', ()=> {

  it('should GET /', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const startTime = Date.now();
    const result = await createHttpRequest(app).get('/');
    console.log(Date.now() - startTime);
    // 通常时间都超过1000ms 所以这里改成2000 走下面的断言
    expect(Date.now() - startTime < 2000).toBe(true);

    // //www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png
    expect(result.text).toBe('//www.baidu.com/img/bd_logo1.png');

    // close app
    await close(app);
  });

});
