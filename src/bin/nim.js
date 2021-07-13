#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const axios = require("axios");
const user = require('../user/user')
//// variables
// /swagger-ui/#/

//command verb positionals options
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// VERIFY_TLS="true/false"
// TARGET="https://mynim.domain.com"
//// OKTA
// OKTA_ORG_URL=https://dev.oktapreview.com
// OKTA_CLIENT_ID=""
// OKTA_SCOPES="openid profile email"
// OKTA_REDIRECT_PORT=8080
//// calls
// nim-cli get token [okta : azuread]
// nim-cli get info [https://mynim.domain.com : http://localhost:11000]
// nim-cli set target https://mynim.domain.com
// nim-cli get instances [target : https://mynim.domain.com]
// nim-cli get instance [target : https://mynim.domain.com] [instancename : id]
//


const allUri = {
  license: '/api/v0/about/license',
  system: '/api/v0/about/system',
  analyze: '/api/v0/system/analyze',
  scan: '/api/v0/scan',
  scanServers: '/api/v0/scan/servers',
  instances: '/api/v0/instances'
}
const uriInfo = {
  license: '/api/v0/about/license',
  system: '/api/v0/about/system',
}
const uriAnalyze = {
  analyze: '/api/v0/system/analyze'
}
const uriInstances = {
  instances: '/api/v0/instances'
}
const uriScan = {
  scan: '/api/v0/scan',
  scanServers: '/api/v0/scan/servers',
}

// console.log(uriInfo['system']);
// console.log(uriAnalyze['analyze']);
// console.log(uriScan['scan'])

//https://medium.com/@nanovazquez/yargs-interactive-create-cli-tools-for-humans-and-non-humans-f9419f5cbd9e

yargs(hideBin(process.argv))
.command('config [action]', 'local config options', (yargs) => {
  return yargs
    .positional('action', {
      describe: 'reset|list',
      default: 'list'
    })
    .option('force', {
      alias: 'f',
      type: 'boolean',
      description: 'Reset local config file',
      default: false,
      demandOption: true
    })
    }, (argv) => {
      if( ! argv.force && argv.action == 'reset'){
        console.log("reset requires --force")
      }
      if(argv.force && argv.action == 'reset'){
        console.log("reseting");
        user.resetConfig();
      }
      if (argv.action == 'list'){
        user.listConfig();
      }
    })
.command('set [target] [auth]', 'set default target', (yargs) => {
  return yargs
    .positional('target', {
      describe: 'nim instance fqdn',
      default: 'http://localhost:11000'
    })
    .positional('auth', {
      describe: 'auth provider',
      default: 'basic'
    })
    }, (argv) => {
      item = {target: argv.target, auth: argv.auth};
      user.store(item);
    })
.command('get [info] [type] [target]', 'get nim info', (yargs) => {
  return yargs
    .positional('info', {
      describe: 'readonly information',
      default: 'info'
    })
    .positional('type', {
      describe: 'what info to get',
      default: 'system'
    })
    .positional('target', {
      describe: 'nim URL',
      default: 'http://localhost:11000'
    })
}, (argv) => {
  if (argv.info == "info"){
    uri = allUri[argv.type]
  }
  const url = argv.target ? argv.target + uri : "http://localhost:11000" + uri;
  axios.get(url, { headers: { Accept: "application/json" }}).then(res => { console.log(res.data);});
})
.command('list [type] [target]', 'list instances', (yargs) => {
  return yargs
    .positional('type', {
      describe: 'what info to get',
      default: 'instances'
    })
    .positional('target', {
      describe: 'nim URL',
      default: 'http://localhost:11000'
    })
}, (argv) => {
  uri = allUri[argv.type];
  const url = argv.target ? argv.target + uri : "http://localhost:11000" + uri;
  axios.get(url, { headers: { Accept: "application/json" }}).then(res => { console.log(res.data);});
})
.option('verbose', {
  alias: 'v',
  type: 'boolean',
  description: 'Run with verbose logging',
  default: false,
  demandOption: false
})
.option('tls_verify', {
  alias: 'tls',
  type: 'boolean',
  description: 'verify tls certs',
  default: true,
  demandOption: false
})
.wrap(72)
.argv
