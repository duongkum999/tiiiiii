exports.config = {
    name: 'gi',
    version: '0.0.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'AI Generated Image',
    commandCategory: 'AI',
    usages: '[prompt]',
    cooldowns: 3
  };
  let axios = require('axios');
  let stream_url = url=>axios.get(url, {
    responseType: 'stream',
  }).then(res=>res.data);
  let ratio_dimensions = {
    '1:1': '512Ă—512',
    '3:4': '512Ă—680',
    '2:3': '512Ă—768',
    '9:16': '512Ă—912',
    '4:3': '680Ă—512',
    '3:2': '768Ă—512',
    '16:9': '912Ă—512',
  };
  
  exports.run = async o=> {
    let send = (msg, callback) => o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
    let prompt = o.args.join(' ');
    let style_hot = (await axios.get(`https://nams.live/art.json/model_list`)).data.filter($=>!!$.banner.url && $.banner.width <= 4000 && $.banner.height <= 4000);
  
    let attachment = [];
    for (let i of style_hot)attachment.push(await stream_url(i.banner.url));
  
    send({
      body: `[====[ Style Hot ]====]\n\n${style_hot.map(($, i)=>`${i+1}. ${$.name} (${$.stat.num_of_like} <3)\n${'â»'.repeat(15)}`).join('\n')}\n\n-> Reply STT Ä‘á»ƒ chá»n style ("n" Ä‘á»ƒ bá» qua) hoáº·c nháº­p tá»« khĂ³a Ä‘á»ƒ tĂ¬m style khĂ¡c`,
      attachment,
    }, (err, res)=>(res.name = exports.config.name, res.prompt = prompt, res.style = style_hot, res.event = o.event, res.type = 'choose_style', global.client.handleReply.push(res)));
  };
  exports.handleReply = async o=> {
    let _ = o.handleReply;
    let send = (msg, callback) => o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
    let body = o.event.body || '';
  
    if (_.event.senderID != o.event.senderID)return;
  
    switch (_.type) {
      case 'choose_style': {
        if (body.toLowerCase() != 'n')if (!_.style[body-1]) {
          let style_search_hot = (await axios.get(encodeURI(`https://nams.live/art.json/model_list?{"keyword":"${body}"}`))).data.filter($=>!!$.banner.url && $.banner.width <= 4000 && $.banner.height <= 4000);
  
          let attachment = [];
          for (let i of style_search_hot)attachment.push(await stream_url(i.banner.url));
  
          return send({
            body: `[====[ Style Search Hot ]====]\n\n${style_search_hot.map(($, i)=>`${i+1}. ${$.name} (${$.stat.num_of_like} <3)\n${'â»'.repeat(15)}`).join('\n')}\n\n-> Reply STT Ä‘á»ƒ chá»n style ("n" Ä‘á»ƒ bá» qua) hoáº·c nháº­p tá»« khĂ³a Ä‘á»ƒ tĂ¬m style khĂ¡c`,
            attachment,
          }, (err, res)=>(res.name = exports.config.name, res.prompt = _.prompt, res.style = style_search_hot, res.event = o.event, res.type = 'choose_style', global.client.handleReply.push(res)));
        };
  
        send(`[====[ KĂ­ch ThÆ°á»›c áº¢nh ]====]\n\n${Object.entries(ratio_dimensions).map(($, i)=>`${i+1}. ${$[0]} - ${$[1]}`).join('\n')}\n\n-> Reply STT Ä‘á»ƒ chá»n.`, (err, res)=>(res.name = exports.config.name, res.prompt = _.prompt, res.model_id = (body.toLowerCase() == 'n'?null: _.style[body-1].id), res.event = o.event, res.type = 'choose_dimensions', global.client.handleReply.push(res)));
      };
        break;
      case 'choose_dimensions': {
        let find = Object.entries(ratio_dimensions).find(($, i)=>i+1 == body);
  
        if (!find)return send(`Invalid Ratio Dimensions`);
  
        let dms = find[1].split('Ă—');
        send(`Äang táº¡o hĂ¬nh áº£nh (cĂ³ thá»ƒ máº¥t tá»›i 1 phĂºt)...`);
  
        let param = {
          meta: {
            prompt: _.prompt,
            width: +dms[0],
            height: +dms[1],
            lora_models: !!_.model_id?[{
              model_id: _.model_id,
              height: 1
            }]: [],
          },
        };
        let generated = await axios.get(encodeURI(`https://nams.live/art.json/generated?${JSON.stringify(param)}`));
  
        let attachment = [];
        for (let url of generated.data[0].img_urls)attachment.push(await stream_url(url));
  
        send({
          body: `Táº¡o hĂ¬nh áº£nh hoĂ n táº¥t (exec time ${generated.headers.exec_time/1000<<0}s)`,
          attachment,
        });
      };
        break;
      default: {};
        break;
    };
  };