var http = require('http')
var createHandler = require('node-github-webhook')
var handler = createHandler([
  // 多个仓库
  {
    path: '/blog',
    secret: 'CUSTOM_blog'
  }
])

http
  .createServer(function(req, res) {
    handler(req, res, function(err) {
      res.statusCode = 404
      res.end('no such location')
    })
  })
  .listen(4396)

handler.on('error', function(err) {
  console.error('Error:', err.message)
})

handler.on('push', function(event) {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  )
  runCmd('sh', [`.${event.path}/bash.sh`, event.payload.repository.name], function(text) {
    console.log(text)
  })
})

function runCmd(cmd, args, callback) {
  var spawn = require('child_process').spawn
  var child = spawn(cmd, args)
  var resp = ''
  child.stdout.on('data', function(buffer) {
    resp += buffer.toString()
  })
  child.stdout.on('end', function() {
    callback(resp)
  })
}
