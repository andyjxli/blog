const http = require('http')
const createHandler = require('node-github-webhook')
const handler = createHandler([
  // 多个仓库
  {
    path: '/webhook/blog',
    secret: 'CUSTOM_blog'
  }
])

http
  .createServer((req, res) => {
    handler(req, res, () => {
      res.statusCode = 404
      res.end('no such location')
    })
  })
  .listen(4396)

handler.on('error', err => {
  console.error('Error:', err)
})

handler.on('push', event => {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  )
  const path = event.path.replace('/webhook', '')
  console.log(path, '')
  // runCmd('sh', [`.${path}/bash.sh`, event.payload.repository.name], (text) => {
  //   console.log(text);
  // });
})

// function runCmd(cmd, args, callback) {
//   const { spawn } = require('child_process');
//   const child = spawn(cmd, args);
//   let resp = '';
//   child.stdout.on('data', (buffer) => {
//     resp += buffer.toString();
//   });
//   child.stdout.on('end', () => {
//     callback(resp);
//   });
// }
