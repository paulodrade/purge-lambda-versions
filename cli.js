#!/usr/bin/env node

const {PLV} = require('./src/script');
// console.log('[PLV] PLV', PLV);

const [...args] = process.argv;
// console.log(`[PLV] args`, args);

const argsObject = {};
for (let i = 0; i < args.length; i += 2) {
  argsObject[args[i].replace('--', '')] = args[i + 1];
}
// console.log(`[PLV] argsObject`, argsObject);

if ('help' in argsObject) {
  if (argsObject.help === 'functions') {
    console.log('[HELP] ------------- FUNCTIONS ------------ ');
    console.log('[HELP]', `COMMAND: plv --functions function-1,function-2`);
    console.log('[HELP]', `NOTE: DO NOT PUT SPACES BETWEEN FUNCTION NAMES`);
    console.log('[HELP] ------------------------------------- ');
  }
  else if (argsObject.help === 'function') {
    console.log('[HELP] ------------- FUNCTION ------------ ');
    console.log('[HELP]', `COMMAND: plv --function function-1`);
    console.log('[HELP] ------------------------------------ ');
  }
  else if (argsObject.help === 'keep_versions') {
    console.log('[HELP] ----------- KEEP_VERSIONS ---------- ');
    console.log('[HELP]', `COMMAND: plv --keep_versions 10`);
    console.log('[HELP]', `NOTE: THE NUMBER OF THE LATEST VERSIONS THAT WONT BE DELETED`);
    console.log('[HELP] ------------------------------------- ');
  }
  else if (argsObject.help === 'aws_region') {
    console.log('[HELP] ------------- AWS_REGION ------------ ');
    console.log('[HELP]', `THE REGION OF THE LAMBDA FUNCTION (S)`);
    console.log('[HELP] ------------------------------------- ');
  }
  else if (argsObject.help === 'aws_access_key_id') {
    console.log('[HELP] ---------- AWS_ACCESS_KEY_ID -------- ');
    console.log('[HELP]', `YOUR AWS ACCESS KEY ID (not required if your local keys is already set up)`);
    console.log('[HELP] ------------------------------------- ');
  }
  else if (argsObject.help === 'aws_secret_key') {
    console.log('[HELP] ----------- aws_secret_key --------- ');
    console.log('[HELP]', `YOUR AWS SECRET KEY (not required if your local keys is already set up)`);
    console.log('[HELP] ------------------------------------- ');
  }
  else {
    console.log('[USAGE]', `plv --function function-1`);
  }
  
  process.exit(0);
  
  return;
}

const params = {
  functions: null,
  keep_versions: 10,
  aws_region: 'us-east-1',
  aws_access_key_id: null,
  aws_secret_key: null
};

for (let i in argsObject) {
  console.log(`[PLV] argsObject[i]`, i, argsObject[i]);
  
  if (i === 'functions') {
    params.functions = argsObject[i].split(',');
  }
  else if (i === 'function') {
    params.functions = [argsObject[i]];
  }
  else if (i in params) {
    params[i] = argsObject[i];
  }
  
}

(async (config) => {
  
  console.log(`[PLV] config`, config);
  
  const plv = new PLV({
    KEEP_VERSIONS: config.keep_versions,
    AWS_REGION: config.aws_region,
    AWS_ACCESS_KEY_ID: config.aws_access_key_id,
    AWS_SECRET_ACCESS_KEY: config.aws_secret_key
  });
  
  await plv.clearFunctions(
    config.functions.map(functionName => {
      return {
        FUNCTION_NAME: functionName
      };
    })
  );
  
})(params);
