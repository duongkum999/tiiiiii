exports.config = {
    name: 'gi2',
    version: '0.0.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'AI Generated Image 2',
    commandCategory: 'AI',
    usages: '[]',
    cooldowns: 3
  };
  let eta = 5;
  let stream_url = (url, ext)=>require('axios').get(encodeURI(url), {
    responseType: 'stream',
  }).then(res=>(!!ext?res.data.path = 'tmp.'+ext: '', res));
  let send_generated = (o, param = {prompt: (o.handleReaction||{}).param||o.args.join(' ')}, send = msg=>o.api.sendMessage(msg, o.event.threadID, (err, res)=>(res.name = exports.config.name, res.param = param, global.client.handleReaction.push(res)), o.event.messageID))=>(send(`
  â•”â•â•â•â•â•â•â•â•â•â•â•â•â•—
  â•‘ Generated Image 2  â•‘
  â• â•â•â•â•â•â•â•â•â•â•â•â•â•£
  â•‘> Äang táº¡o hĂ¬nh áº£nh â•‘
  â•‘> Æ¯á»›c tĂ­nh ${eta}s       â•‘
  â•‘> Vui lĂ²ng Ä‘á»£i...   â•‘
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•`), stream_url(`https://nams.live/generated-image.png?${JSON.stringify(param)}`, 'png').then((res, et = res.headers.exec_time/1000<<0)=>(send({
      body: `
  â•”â•â•â•â•â•â•â•â•â•â•â•â•â•—
  â•‘ Generated Image 2  â•‘
  â• â•â•â•â•â•â•â•â•â•â•â•â•â•£
  â•‘> Táº¡o áº£nh hoĂ n táº¥t  â•‘
  â•‘> Thá»±c thi ${et > 10?`${et} giĂ¢y`: `${et} giĂ¢y `}  â•‘
  â•‘> Reac Ä‘á»ƒ táº¡o láº¡i   â•‘
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•`,
      attachment: res.data,
    }), eta = et)).catch(err=>send(`
  â•”â•â•â•â•â•â•â•â•â•â•â•â•â•—
  â•‘ Generated Image 2  â•‘
  â• â•â•â•â•â•â•â•â•â•â•â•â•â•£
  â•‘> Táº¡o áº£nh tháº¥t báº¡i  â•‘
  â•‘> Status code ${err.response.status}   â•‘
  â•‘> Reac Ä‘á»ƒ táº¡o láº¡i   â•‘
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•`)));
  
  exports.run = send_generated;
  exports.handleReaction = send_generated;