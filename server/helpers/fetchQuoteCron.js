// const cron = require('cron').CronJob;
// const axios = require('axios')
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// module.exports = function () {
//     new cron('*/5 * * * * *', function () {
//         axios({
//             method: 'get',
//             url: 'https://favqs.com/api/qotd'
//         })
//             .then(({ data }) => {
//                 socket.emit('server', { message: data.quote.body })
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }, null, true, 'America/Los_Angeles');
// }