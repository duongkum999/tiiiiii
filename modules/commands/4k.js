exports.config = {
    name: '4k',
    version: '0.0.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'TÄƒng cháº¥t lÆ°á»£ng áº£nh lĂªn 4k',
    commandCategory: 'CĂ´ng Cá»¥',
    usages: '[reply_image]',
    cooldowns: 3
  };
  let eta = 3;
  exports.run = async o=> {
    let send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);
  
    if (o.event.type != 'message_reply')return send(`LĂ m Æ¡n hĂ£y pháº£n há»“i hĂ¬nh áº£nh nĂ o Ä‘Ă³!`);
    send(`Tiáº¿n hĂ nh tÄƒng Ä‘á»™ phĂ¢n giáº£i cho ${o.event.messageReply.attachments.length} áº£nh (Æ°á»›c tĂ­nh ${o.event.messageReply.attachments.length*eta}s), chá» xĂ­u ...`);
  
    let stream = [];
    let exec_time = 0;
    for (let i of o.event.messageReply.attachments)try {
      let res = await require('axios').get(encodeURI(`https://nams.live/upscale.png?{"image":"${i.url}","model":"4x-UltraSharp"}`), {
        responseType: 'stream',
      });
  
      exec_time+=+res.headers.exec_time;
      eta = res.headers.exec_time/1000<<0;
      res.data.path = 'tmp.png';
      stream.push(res.data);
    } catch (e) {};
  
    send({
      body: `TÄƒng Ä‘á»™ phĂ¢n giáº£i lĂªn 4k hoĂ n táº¥tâ˜‘ (thá»i gian thá»±c thi ${exec_time/1000<<0}s)`,
      attachment: stream,
    });
  };