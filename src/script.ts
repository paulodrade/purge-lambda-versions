import { Lambda } from 'aws-sdk/clients/all';
import { FunctionList } from 'aws-sdk/clients/lambda';

export namespace PLV_Interfaces {

  /**
   * Interface for class constructor
   */
  export interface ConstructorOptions {
    KEEP_VERSIONS?: number;
    AWS_REGION?: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
  }

  /**
   * Interface for available api methods options
   */
  export interface FunctionOptions {
    FUNCTION_NAME: string;
    KEEP_VERSIONS?: number;
  }

}

export class PLV {

  lambda: Lambda;

  constructorOptions: PLV_Interfaces.ConstructorOptions = {
    KEEP_VERSIONS: 10,
    AWS_REGION: 'us-east-1'
  };

  constructor(options: PLV_Interfaces.ConstructorOptions = {}) {

    this.constructorOptions = {...this.constructorOptions, ...options};

    this.lambda = new Lambda({
      region: this.constructorOptions.AWS_REGION
    });

  }

  /**
   * Method to recursively get all versions by function name
   */
  private async listVersionsByFunction(
    functionName: string,
    versionsList: FunctionList = [],
    nextMarker?: string
  ): Promise<FunctionList> {
    return new Promise((resolve, reject) => {

      this.lambda.listVersionsByFunction({
        FunctionName: functionName,
        Marker: nextMarker || null
      }, async (err, {NextMarker, Versions}) => {

        try {

          if (err) {
            throw err;
          }

          for (const version of Versions) {
            versionsList.push(version);
          }

          if (NextMarker) {
            await this.listVersionsByFunction(functionName, versionsList, NextMarker);
          }

          resolve(versionsList);

        }
        catch (e) {
          reject(e);
        }
      });

    });
  }

  /**
   * Method to recursively get all aliases by function name
   */
  private async listAliasesByFunction(
    functionName: string,
    aliasesList: String[] = [],
    nextMarker?: string
  ): Promise<String[]> {
    return new Promise((resolve, reject) => {

      this.lambda.listAliases({
        FunctionName: functionName,
        Marker: nextMarker || null
      }, async (err, {NextMarker, Aliases}) => {

        try {

          if (err) {
            throw err;
          }

          for (const alias of Aliases) {
            aliasesList.push(alias.FunctionVersion);
          }

          if (NextMarker) {
            await this.listAliasesByFunction(functionName, aliasesList, NextMarker);
          }

          resolve(aliasesList);

        }
        catch (e) {
          reject(e);
        }

      });

    });
  }

  /**
   * Method to delete a version of a function
   */
  private async deleteFunctionVersion(functionName: string, version: string) {
    return new Promise((resolve, reject) => {
      this.lambda.deleteFunction({
        FunctionName: functionName,
        Qualifier: version
      }, (err, data) => {

        if (err) {
          reject(err);
        }
        else {
          resolve(data);
        }

      });
    });
  }

  /**
   *
   */
  private async clearVersionsFunction(functionOpt) {

    const prefix = '---';

    try {

      let keepVersions =  functionOpt.KEEP_VERSIONS || this.constructorOptions.KEEP_VERSIONS || 10;
      console.log(prefix, '[PLV][KEEP VERSIONS]', keepVersions);

      const functionName = functionOpt.FUNCTION_NAME;
      console.log(prefix, '[PLV][FUNCTION NAME]', functionName);

      if (!functionName) {
        throw new Error(`The 'functionName' must be provided.`);
      }

      const versions = await this.listVersionsByFunction(functionName);
      // console.log(prefix, '[FUNCTION VERSIONS]', versions);
      console.log(prefix, '[PLV][VERSIONS.LENGTH]', versions.length);

      const aliases = await this.listAliasesByFunction(functionName);
      // console.log(prefix, '[FUNCTION ALIASES]', aliases);
      console.log(prefix, '[PLV][ALIASES.ENGTH]', aliases.length);

      const sorted = versions.sort((v1, v2) => v1.LastModified < v2.LastModified ? 1 : v1.LastModified > v2.LastModified ? -1 : 0);

      const deletingPromises = [];
      let index = 0;

      console.log('-----------------------------------------------');

      for (const version of sorted) {
        if (keepVersions > 0 || version.Version === '$LATEST' || aliases.indexOf(version.Version) >= 0) {
          console.log(prefix + prefix, index, '[PLV][SKIPPING]', version.Version, {isAlias: aliases.indexOf(version.Version) >= 0});
          keepVersions--;
        }
        else {
          console.log(prefix + prefix, index, '[PLV][DELETING]', version.Version);
          deletingPromises.push(this.deleteFunctionVersion(functionName, version.Version));
        }

        index++;

      }

      console.log('-----------------------------------------------');

      try {
        await Promise.all(deletingPromises);
        console.log(prefix, '[PLV][DONE DELETING VERSIONS FOR FUNCTION]', functionName);
      }
      catch (e) {
        console.error(prefix, '[PLV][ERROR DELETING VERSION]', e);
      }

    }
    catch (e) {
      console.error(prefix, '[PLV][CLEANING VERSIONS ERROR]', e);
      throw e;
    }

  }

  /**
   * Method to start the cleaning of process
   */
  async clearFunction(functionOpt: PLV_Interfaces.FunctionOptions) {
    try {

      console.log('[PLV][STARTED CLEANING]');
      console.log('###################################################################');
      console.log('[PLV][CLEANING FUNCTION]', functionOpt.FUNCTION_NAME);

      try {
        await this.clearVersionsFunction(functionOpt);
      }
      catch (e) {
        throw e;
      }

    }
    catch (e) {
      console.error('[PLV][CLEANING STOPPED DUE ERROR]', e);
      throw e;
    }
  }

  /**
   * Method to deal with multiple functions
   */
  async clearFunctions(functionsOpt: PLV_Interfaces.FunctionOptions[]) {
    try {
      console.log('[PLV][STARTED MULTIPLE CLEANING]');
      console.log('###################################################################');

      for (const functionOpt of functionsOpt) {
        await this.clearFunction(functionOpt);
      }
    }
    catch (e) {
      throw e;
    }
  }

}
