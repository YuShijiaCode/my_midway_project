import { Controller, Get } from '@midwayjs/decorator';
import axios from 'axios';

import * as html2json from 'posthtml-parser';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    const res = await axios.get('http://www.baidu.com/');
    const tmp = getTargetInfo(res['data'], 'div', 'id="lg"');
    console.log('src:', tmp[0]['content'][0]['attrs']['src']);
    return tmp[0]['content'][0]['attrs']['src'];
  }
}

function getTargetInfo(info: string, tag: string, target: string): object {
  info = info.replace(/\r/g, '');
  info = info.replace(/\n/g, '');
  info = info.replace(/\t/g, '');
  const infoArray: string[] = info.split('<' + tag);
  let finalString = '';
  infoArray.forEach((value, index) => {
    if (index > 0) {
      value = '<' + tag + value;
    }
    if (value.indexOf(target) !== -1) {
      finalString = value;
    }
  });
  finalString =
    finalString.substring(0, finalString.indexOf('</' + tag)) +
    '</' +
    tag +
    '>';
  return html2json.parser(finalString);
}
