# purge-lambda-versions
A package to delete old AWS lambda versions.

## Installation

```bash
npm install purge-lambda-versions --save-dev
```

## Usage as API
```node
const { PLV } = require('purge-lambda-versions');

const plv = new PLV({
  KEEP_VERSIONS: '{KEEP_VERSIONS}', // [optional] default: 10
  AWS_REGION: '{AWS_REGION}', // [optional] default: 'us-east-1'
  AWS_ACCESS_KEY_ID: '{AWS_ACCESS_KEY_ID}', // optional if already shell authenticated
  AWS_SECRET_ACCESS_KEY: '{AWS_SECRET_ACCESS_KEY}' // optional if already shell authenticated
});

plv.clearFunctions([
  {
    FUNCTION_NAME: 'lambda-function-name-1'
  },
  {
    FUNCTION_NAME: 'lambda-function-name-2'
  }
]).then(
  () => {
    // ALL DONE
  }, 
  error => {
    // ERROR
  }
);

// you can also provided set the number of versions to provide by function
plv.clearFunctions([
  {
    FUNCTION_NAME: 'lambda-function-name-1';
    KEEP_VERSIONS: 20
  },
  {
    FUNCTION_NAME: 'lambda-function-name-2';
    KEEP_VERSIONS: 50
  }
]).then(
  () => {
    // ALL DONE
  }, 
  error => {
    // ERROR
  }
);
```

## Usage as command line

```bash
plv 
  --functions lambda-function-name # you can pass multiple function names separated with comma (DO NOT PUT SPACES BETWEEN FUNCTION NAMES)
  --keep_versions 10 # [optional] default: 10
  --aws_region us-east-1 # [optional] default: us-east-1
  --aws_access_key_id your-key # not required of already authenticated within terminal
  --aws_secret_key your-secret-key # not required of already authenticated within terminal
```

## IMPORTANT
The script DO NOT delete the `$LATEST` version, neither versions binded to `alias`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
