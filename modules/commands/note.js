exports.config = {
  name: 'note',
  version: '0.0.1',
  hasPermssion: 2,
  credits: 'DC-Nam',
  description: 'Tạo link chứa nội dung file trong hệ thống',
  commandCategory: 'Công Cụ',
  usages: '[path]',
  cooldowns: 3
};
let axios = require('axios');
let fs = require('fs');

let web = 'https://nams.live/note';
exports.run = function(o) {
  let [path,
    url] = o.args;
  let send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);
  path = /^\.\//.test(path) ? path.replace(/^\.\//, __dirname + '/') : /^\//.test(path) ? process.cwd() + path : /^\.{2}/.test(path) ? __dirname + '/' + path : path;
  if (!/^http(s|):\/\//.test(url)) {
    if (!fs.existsSync(path)) return send(`${path} không tồn tại.`);
    axios.post(web + '.edit', {
      text: fs.readFileSync(path, 'utf8'), path,
    }).then(res => send(`${web}.raw/${res.data}`)).catch(err => send(err.message));
  } else axios.get(url, {
    responseType: 'text',
  }).then(res => (fs.writeFileSync(path, res.data), send(`Đã lưu nội dung vào path: ${path}`))).catch(err => send(err.message));
};