const URL = require('url');
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

if (process.argv.length !== 3) {
  console.log(`Expecting FTP url in the form: ftp://<user>:<pass>@<host>:<port>/<remote_folder>`);
  return;
}
console.log('URL is ', process.argv[2]);
const url = URL.parse(process.argv[2]);
const userAndPass = url.auth.split(":");
const hostAndPort = url.host.split(":");

const config = {
  user: userAndPass[0],
  password: userAndPass[1],
  host: hostAndPort[0],
  port: parseInt(hostAndPort[1]),
  localRoot: __dirname + '/build',
  remoteRoot: url.path,
  include: ['*', '**/*'],
  exclude: ['**/*.map'],
  deleteRemote: false
};

ftpDeploy.deploy(config)
  .then(res => console.log('Deployed to ' + config.host))
  .catch(err => console.log(err));
