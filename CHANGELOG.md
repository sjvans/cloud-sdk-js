[//]: # "Please don't delete the following comments and keep them in the beginning of this document. Also, keep the first line empty."

[//]: # (Example known issue: Making OData requests using a proxy defined in the environment variables is not possible \(see improvements\).)
[//]: # (Example compatibility note: [core] Rename `entityConstructor`, `linkedEntity`, `fieldName` [properties]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html\) in generated entities to `_entityConstructor`, `_linkedEntity`, `_fieldName`.)
[//]: # (Example new functionality: [generator] Support the generation of clients for services using nested complex types.)
[//]: # (Example improvement: Allow setting the log levels of SDK loggers more conveniently through a single function [`setLogLevel\(\)`]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/modules/_sap_cloud_sdk_util.html#setloglevel\).)
[//]: # (Example fixed issue: Fix the parameter type of `fromJson` method so that passing a json object with illegal attributes is not allowed. For example, `{ bupa : '1' }` cannot be passed to the method when building a `BusinessPartner`.)
[//]: # (Example function removed: [generator] Remove the option: `aggregatorDirectoryName`)
[//]: # (Example function moved: Move the following functions to `connectivity` package)

# Next

## Breaking Changes

### Function removed

- 

### Function moved

- 

### Signature changed

-

### Implementation changed

- 

# 3.8.1

API Docs: https://sap.github.io/cloud-sdk/api/3.8.1

## Improvements

- [eslint-config] Update eslint plugins (d6bbd3210)

# 3.8.0

API Docs: https://sap.github.io/cloud-sdk/api/3.8.0

## Compatibility Notes

- [connectivity] Remove unused internal functionality around JWT property access, like `userFromJwt` (removed) and `audiences` (changed). (693cd655f)

## New Functionalities

- [mail-client] Add Support for `Location ID` in destinations of type `MAIL` (8516b7f04)

## Fixed Issues

- [generator] Don't generate `delete()`, `update()`, and `getByKey()` methods in the RequestBuilder of an entity without keys.
  - @sap-cloud-sdk/generator-common@3.8.0
  - @sap-cloud-sdk/odata-common@3.8.0
  - @sap-cloud-sdk/odata-v2@3.8.0
  - @sap-cloud-sdk/odata-v4@3.8.0
  - @sap-cloud-sdk/util@3.8.0 (34ef77a1c)

# 3.7.0

API Docs: https://sap.github.io/cloud-sdk/api/3.7.0

## Fixed Issues

- [odata-common, odata-v2, odata-v4, generator, generator-common] Do not send `null` values in the request payload for properties that are not set while creating or updating an entity.
  [Fixed Issue] Fix `RangeError: Maximum call stack size exceeded` error that occurs when updating an entity after calling `getByKey`. (bdcf14f85)

# 3.6.0

API Docs: https://sap.github.io/cloud-sdk/api/3.6.0

## Compatibility Notes

- [connectivity] Proxy configuration is no longer realized through a proxy agent, but with the native axios proxy setting instead. (025b6aa2c)

## Fixed Issues

- [connectivity] Use axios native proxy, instead of proxy agent, which causes connection issues for write requests on SAP Cloud Connector. (025b6aa2c)
- [http-client] Fix CSRF token fetching against OnPremise systems. (c2a2987c5)

# 3.5.0

API Docs: https://sap.github.io/cloud-sdk/api/3.5.0

## Fixed Issues

- [connectivity] Compare `selectionStrategy` in `DestinationFetchOptions` based on value instead of reference. (7ed5ceb52)
- [connectivity] Fix destination caching for destinations from service bindings. The destinations are not cached repeatedly. The function `getDestinationFromServiceBinding()` returns `undefined` for destinations which have expired JWTs. (bf54df09b)
- [connectivity] Support destinations of type `ClientCertificateAuthentication` without password.
  - @sap-cloud-sdk/resilience@3.5.0
  - @sap-cloud-sdk/util@3.5.0 (2277f9443)
- [odata-common, odata-v2, odata-v4] Fix OData v2 serialization for `Edm.Decimal` to serialize to `string`. (ee7477ce2)

# 3.4.0

API Docs: https://sap.github.io/cloud-sdk/api/3.4.0

## Compatibility Notes

- [connectivity] Deprecate `destinationForServiceBinding()` and `PartialDestinationFetchOptions`. Use `getDestinationFromServiceBinding()` and `ServiceBindingTransformOptions` instead. (bde64634d)

## New Functionalities

- [connectivity] Always add a name to destinations from service bindings created with `getDestinationFromServiceBinding()`. (db0780f1b)
- [connectivity] Support forwarding of auth tokens for destinations from the destination service, service bindings and environment variables. (bde64634d)

## Fixed Issues

- [odata-common, odata-v4] Serialize properties of type "Edm.Decimal" to numbers when they are within the safe range and strings when they are not. (431d2a542)

# 3.3.0

API Docs: https://sap.github.io/cloud-sdk/api/3.3.0

## Compatibility Notes

- [connectivity] The `expiresIn` property of `authTokens` on a `Destination` can be undefined. (c09b1d06f)
- [connectivity] Deprecate `getAgentConfig()`:

  - Temporarily use replacement function `getAgentConfigAsync()`.
  - Rename `getAgentConfigAsync()` to `getAgentConfig()` in next major version. (36a01f775)

## New Functionalities

- [connectivity] Add option to cache mTLS certificates. (36a01f775)

## Improvements

- [connectivity] Do not rely on XSUAA service when caching service tokens. Cache keys are now based on service credentials URL. (0583836bc)
- [connectivity] Do not rely on the XSUAA service binding to retrieve tenant information when registering destinations. If tenant is unknown and no binding is found, set it to a default value (`'tenant_id'`). (8f54207b6)
- [connectivity] Read mTLS certificates asynchronously. (36a01f775)

## Fixed Issues

- [connectivity] Remove dependency to XSUAA service binding when checking whether a JWT was issued by XSUAA for destination retrieval. Now, the `ext_attr.ehancer` property is checked. (6b58354e8)
- [http-client] Do not set default tenant ID in the context of middlewares, if the tenant ID is unknown. In those cases it will be `undefined` from now on. (8f54207b6)

# 3.2.0

API Docs: https://sap.github.io/cloud-sdk/api/3.2.0

## New Functionalities

- [connectivity] Enable the use of mTLS certificates for registered destinations on CloudFoundry. (616d77b85)

## Improvements

- [connectivity] Set the default validity time of the client credentials token cache to 5 minutes instead of never expiring. (782b9e37e)

## Fixed Issues

- [connectivity, http-client] Forward the user JWT irrespective of the destination authentication type when `forwardAuthToken` is set to true on a destination (56c3f70f4)
- [http-client] Improve CSRF token fetching for large requests. (73ff0ab03)
- [odata-common] Remove encoding of keys in the `getEntityKeys()` as it should only happen once in `getResourcePathForKeys()`.Fixes the error `value.format is not a function` when executing requests for entities with `Edm.Date` type key property. (aa1a4bdb0)
- [resilience] Fix parsing error when the last response in a chain of retries returned undefined.
  - @sap-cloud-sdk/util@3.2.0 (234675fc3)

# 3.1.1

API Docs: https://sap.github.io/cloud-sdk/api/3.1.1

## Fixed Issues

- [resilience] Fix transpilation on OData generation, where types for 'opossum' could not be found.
  - @sap-cloud-sdk/util@3.1.1 (166a16d82)

# 3.1.0

API Docs: https://sap.github.io/cloud-sdk/api/3.1.0

## Compatibility Notes

- [connectivity] The combination of `iss` and `jwt` is now supported when fetching destinations. When both properties are set, the `iss` property is no longer ignored. (28b7af86f)

## New Functionalities

- [connectivity] Add support for authentication type `NoAuthentication` on-premise destinations. (039412e59)
- [connectivity] Allow combination of `iss` an `jwt` when fetching a destination. In this case the `iss` URL will be used to fetch the destination service token and `jwt` will be used for the `x-user-token` header of user based authentication types. (28b7af86f)

## Fixed Issues

- [odata-common] Adjust `FromJsonType` to stricter typings in TypeScript 5. (cc8425abc)

# 3.0.2

API Docs: https://sap.github.io/cloud-sdk/api/3.0.2

## Compatibility Notes

- [odata-common, odata-v2, odata-v4] The `ActionFunctionImportRequestBuilderBase` has an additional mandatory type parameter to pass the according (de-)serializer type. This was missing previously due to a bug. (2fa8c36a6)

## Fixed Issues

- [connectivity] Fix the `The proxy configuration is undefined` error for OnPrem `MAIL` destinations by removing the `isHttpDestination` check when adding proxyConfiguration to the destination object.
  - @sap-cloud-sdk/resilience@3.0.2
  - @sap-cloud-sdk/util@3.0.2 (47fc7278d)
- [mail-client] Fix error `Greeting never received` when sending emails to On-Premise mail servers. The `_readableListening` property of socket is set to `true` to allow nodemailer to receive SMTP greeting messages. (47fc7278d)
- [mail-client] Fix `Invalid greeting` error from nodemailer by removing the `transport.verify` function call. (be04dafc2)
- [odata-common, odata-v2, odata-v4] Fix batch requests to accept only functions or actions. (2fa8c36a6)

# 3.0.1

API Docs: https://sap.github.io/cloud-sdk/api/3.0.1

## Compatibility Notes

- [resilience] Deprecate erroneously exposed `circuitBreakerHttp()` function in favor of `circuitBreaker()`.
  - @sap-cloud-sdk/util@3.0.1 (fcab06c4b)

## Improvements

- [generator-common] Improve logs when generating OData clients without package.json
  - @sap-cloud-sdk/util@3.0.1 (c78c16ddf)

# 2.10.0

API Docs: https://sap.github.io/cloud-sdk/api/2.10.0

## Compatibility Notes

- [odata-common, odata-v2, odata-v4] Changed constructor argument of class `EntityBase` from `schema` to `_entityApi`. (144ff66f4)

## Improvements

- [openapi-generator] Add `force` option to`rm` commands, when setting `clearOutputDir` to true. (f76da3060)

## Fixed Issues

- [odata-v2, odata-v4] Fix the "entity generic type" of the "delete request builder". (f76da3060)
- [generator, openapi-generator] Show detailed error message of compilation errors instead of `[object Object]`. (f76da3060)
- [generator-common] Show detailed error message of compilation errors instead of `[object Object]`.
  - @sap-cloud-sdk/util@2.10.0 (f76da3060)

# 2.11.0

API Docs: https://sap.github.io/cloud-sdk/api/2.11.0

## New Functionalities

- [odata-common] Add `getBatchReference()` and `setBatchId()` in request builders to use the batch ID as a reference to an entity in a batch request changeset.
  Batch reference are available in `create`, `delete`, `getByKey`, `update` and `actions/functions` request builder. (79e0fe811)
- [odata-v4, generator] Support parsing and generating OData bound functions and actions in OData v4 (8ea28151b)
- [generator, openapi-generator, generator-common] Generated sources are formatted using prettier with default config. Use the CLI option `prettierConfigPath` to provide a custom config. (74e14427a)

## Improvements

- [odata-common] Change the place where batch ID is generated from on serialization to request creation. (79e0fe811)

# 2.7.1

API Docs: https://sap.github.io/cloud-sdk/api/2.7.1

## Fixed Issues

- [mail-client] Fix proxy authorization for sending emails.
  - @sap-cloud-sdk/connectivity@2.7.1
  - @sap-cloud-sdk/util@2.7.1 (e7fa8d35)

# 2.5.0

API Docs: https://sap.github.io/cloud-sdk/api/2.5.0

## Compatibility Notes

- [odata-common, generator] Change `Edm.String`, `Edm.Boolean` and `Edm.Guid` to be orderable to support `lt`/`lessThan()`, `le`/`lessOrEqual()`, `gt`/`greaterThan()`, and `ge`/`greaterOrEqual` operators. Re-generate odata services to adopt the changes. (c3166ff6)
- [util] Stop using `VCAP_SERVICES` to determine the log format. Use `setLogFormat` and `setGlobalLogFormat` to specify the log format. By default, the log format is set to `kibana` for `NODE_ENV=production` and `local` otherwise. (89f1c423)

## Fixed Issues

- [http-client] Fix the `executeHttpRequest` function, so it accepts the same parameters as in version 1.
  [Compatibility Note] Deprecate one overload of the `executeHttpRequest` function, that accepts `HttpRequestConfigWithOrigin` as a parameter. Use the new function `executeHttpRequestWithOrigin` as replacement.
  [New Functionality] Support defining header options and query parameter options with origins. (9481ec69)

# 2.4.0

API Docs: https://sap.github.io/cloud-sdk/api/2.4.0

## Compatibility Notes

- [connectivity] Only log the successful retrieval of destinations on the`info` log level, log everything else is on the `debug` or `warn` level. (04726a35)
- [connectivity] Mark the function `noDestinationErrorMessage` as internal API. (0a008674)
- [odata-v4] Mark the function `uriConverter` as internal API. (0a008674)
- [eslint-config] Switch the following `jsdoc` related levels from `warn` to `error`:
  - `jsdoc/check-param-names`
  - `jsdoc/require-description-complete-sentence`
  - `jsdoc/require-jsdoc`
  - `jsdoc/require-param`
  - `jsdoc/require-returns` (0a008674)

## New Functionalities

- [connectivity] Support self-signed certificate using the `trustStore` property of the destination object. (0a008674)

## Improvements

- [connectivity] Reduce default log output on the `info` level significantly. (04726a35)
- [http-client] Reduce default log output on the `info` level significantly.
  [Compatibility Note] Only log the successful retrieval of destinations on the`info` log level, log everything else is on the `debug` or `warn` level. (04726a35)

## Fixed Issues

- [util] Fix a bug in the implementation of the trim method. (0a008674)

# 2.6.0

API Docs: https://sap.github.io/cloud-sdk/api/2.6.0

## Compatibility Notes

- [odata-v4, temporal-de-serializers] Adjust parsing of `Edm.Date`, `Edm.DateTimeOffset`, `Edm.Time`, and `Edm.Duration` to be closer to the OData v4 specification.
  There may be loss of precision if using the default (de-)serializers with high-precision fractional seconds. (de851289)
- [generator] Deprecate generator option `versionInPackageJson`. If you need to set the version, use the new `include` option to add your own `package.json` file instead. (069aa168)
- [generator] The hidden generator option `additionalFiles` is renamed to `include`. (069aa168)

## New Functionalities

- [connectivity] Support JWTs without a `JKU` property. (cb598c16)
- [connectivity] Add interface `DestinationCacheInterface` and method `setDestinationCache` to support implementation of custom destination cache. (09094607)
- [connectivity] Fetch client credential token for destinations created by service bindings. (93d41281)
- [generator] New generator option `include` which allows to add files to generated packages. (069aa168)

## Improvements

- [http-client] Make `requestConfig` of `OriginOptions` optional. (e46bb51d)

## Fixed Issues

- [connectivity] Fix `getDestination()` to allow passing an async transform function `serviceBindingTransformFn` in `options`. The transform function can also be passed by `execute()`, `executeHttpRequest()`, `executeRaw()`, etc.
  [Compatibility Note] Rename `transformationFn` into `serviceBindingTransformFn` in `DestinationForServiceBindingsOptions` to avoid ambiguity and make the function async. (8fdfebd6)
- [http-client] Fix the `executeHttpRequest`/`executeHttpRequestWithOrigin` function, so the warning is only shown when overwriting headers by using custom headers. (e44c214a)
- [odata-common, odata-v4, temporal-de-serializers] Fix parsing of `Edm.DateTimeOffset` with high-precision fractional seconds and edge-cases like 5-digit years. (de851289)
- [odata-common, generator] Allow OData service to contain an entity name 'entity'. (0675ee3b)
- [odata-v2] Support negative epoch timestamps in serialization. (9ffe0824)

# 2.7.0

API Docs: https://sap.github.io/cloud-sdk/api/2.7.0

## New Functionalities

- [openapi-generator] Support globs in the `input` option. (3f70b0c9)

## Improvements

- [connectivity] Support consumption of the XSUAA API via destinations. (010a46fa)

## Fixed Issues

- [connectivity] Fix a breaking change of `serviceToken` introduced in 2.0, so it accepts `XsuaaServiceCredentials` again as an option. (3bff42e1)

# 2.8.0

API Docs: https://sap.github.io/cloud-sdk/api/2.8.0

## Compatibility Notes

- [eslint-config] Activated the eslint rule 'check-tag-names' to allowed jsdoc tags. If you use custom tags add them via the 'definedTags' in the eslint options. (15e9ef4b)
- [generator] Deprecated `generateNpmrc` cli option. This option was only used to configure the now defunct npm registry hosted by SAP. It now has no effect anymore and should be removed in all invocations of the generator cli. (15e9ef4b)
- [generator, openapi-generator, generator-common] Description for package.json in a generated client has changed. (15e9ef4b)

## New Functionalities

- [mail-client] Support defining the strategy of sending emails. By default, the emails are sent "in parallel" and can be set to "in sequential". (15e9ef4b)
- [odata-common, generator] Allow function imports using GET http method in batch requests. (15e9ef4b)

## Improvements

- [connectivity] Reduce default logs for failing requests in @sap-cloud-sdk/http-client.
  - @sap-cloud-sdk/util@2.8.0 (15e9ef4b)

## Fixed Issues

- [connectivity] Remove last explicit references to 'VCAP_SERVICES' and replace them with '@sap/xsenv'. (15e9ef4b)
- [connectivity] Fix that unparsable destinations in the subaccount prevent other destinations from beeing fetched. (15e9ef4b)

# 2.9.0

API Docs: https://sap.github.io/cloud-sdk/api/2.9.0

## New Functionalities

- [connectivity] Support fetching all subaccount- and service instance destinations from the destination service simultaneously. (24029503)
- [mail-client] Expose SMTP transport options of `nodemailer`. (d1bf2dee)
- [util] Add method `setGlobalTransports` to support setting custom transport globally. (4c51d3dc)

## Improvements

- [odata-common] Make OderBy() set in ascending order by default. (f62eb0d3)

# 3.0.0

API Docs: https://sap.github.io/cloud-sdk/api/3.0.0

## Compatibility Notes

- [connectivity] The generic types of `JwtKeyMapping` is simplified so the second type argument `JwtKeysT` are always strings. (fde964e37)
- [connectivity] The `Protocol` enum was replaced with a string literal union type. Now, instead of passing `Protocol.HTTPS` pass 'https'. (fde964e37)
- [connectivity, http-client, openapi, odata-common, odata-v2, resilience] Remove the options `timeout` and `enableCircuitBreaker` from all BTP service interactions i.e. destination and token fetching. (fde964e37)
- [connectivity, http-client, mail-client, openapi, odata-common, odata-v2, odata-v4, eslint-config, generator, test-util, util, openapi-generator, generator-common, temporal-de-serializers, resilience] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed. (fde964e37)
- [connectivity] The enum `IsolationStrategy` was replaced with a string literal union type of the same name. Use 'tenant' and 'tenant-user' instead of `IsolationStrategy.Tenant` and `IsolationStrategy.Tenant_User`. (fde964e37)
- [connectivity, http-client, odata-common] ] The `url` property in `Destination` is now optional as destinations of type `MAIL` do not have a URL. (fde964e37)
- [http-client, openapi, odata-common] Remove `timeout()` method from the request builders and the `timeout` options from the `executeHttpRequest()` function.
  Visit the [documentation portal](https://sap.github.io/cloud-sdk/docs/js/guides/resilience) to see how to add a timeout using middlewares. (fde964e37)
- [http-client] Removed overload of executeHttpRequest
  The overload, that accepted `HttpRequestConfigWithOrigin` as a parameter, is removed and replaced by the function `executeHttpRequestWithOrigin`. (fde964e37)
- [odata-common, generator, util] By default, generation of OData clients fails if a service path cannot be determined. Either provide `servicePath` value in the `options-per-service.json` or set `skipValidation` to true, in which case, `/` will be used. (fde964e37)
- [odata-common] The constructor of `ODataRequestConfig` was changed so that the third parameter cannot be a `string` anymore.
  Passing in a string which was then interpreted as the value for the `Content-Type` HTTP header was deprecated.
  The type of the parameter is now `Record<string, any>`, and if only want to set the `Content-Type` HTTP header you can do so by passing `{'content-type': 'some-value'}` to the constructor. (fde964e37)
- [odata-common] The constructor of the entity API is private to avoid accidental usage. Use the service object to get a API instance. (fde964e37)
- [odata-common, generator, openapi-generator] The `serviceMapping` option of the OData generator has been renamed to `optionsPerService`. The mapping file, `service-mapping.json` has also been renamed to `options-per-service.json`. By default, an options file will not be generated. (fde964e37)
- [odata-common] Setting custom fields in `fromJson` through the `_customFields` property has been removed.
  Add custom properties to your JSON object instead. (fde964e37)
- [generator] The options per service behavior is now the same as for the OpenApi generator.
  For details on how to migrate and what has change look at the migration guide. (fde964e37)
- [generator] The deprecated `forceOverwrite` option of the generator is removed. Use the `overwrite` option instead.
  [Compatibility Note] The deprecated `generatePackageJson` option of the generator is removed. Use the `packageJson` option instead.
  [Compatibility Note] The deprecated `writeReadme` option of the generator is removed. Use the `readme` option instead.
  [Compatibility Note] The deprecated `processesJsGeneration` option of the generator is removed. Use the `transpilationProcesses` option instead.
  [Compatibility Note] The internal options `sdkAfterVersionScript`, `s4HanaCloud` and `packageVersion` of the generator are removed.
  These were hidden options never meant for external usage and there is no replacement.
  [Compatibility Note] The deprecated `generateNpmrc` option of the generator is removed. Use the `include` option to add a `.npmrc` to the generated code if needed. (fde964e37)
- [generator] Add `verbose` generator option. By default, only error and warning logs will be displayed. If `verbose` is set to `true`, all logs will be displayed. (fde964e37)
- [generator] The `generateJs` option has been replaced with the `transpile` option. Transpilation is not enabled by default. (fde964e37)
- [generator] The command line argument `inputDir` of the OData generator is renamed to `input`.
  The new `input` options accepts now also file paths and glob patterns. (fde964e37)
- [generator] The OData generator won't automatically rename identifiers to avoid name conflicts.
  The generation process will fail if identifiers have conflicting names.
  Switch on the `skipValidation` flag if you want to generate despite name conflicts and are okay with changed identifier names to avoid conflicts. (fde964e37)
- [generator, openapi-generator, generator-common] Removed the option `versionInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default version `1.0.0` is created.
  If necessary use the `include` option to add a `package.json` with a custom value.
  [Compatibility Note] Removed the option `licenseInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default license `UNLICENSED` is created.
  If necessary use the `include` option to add a `package.json` with a custom value. (fde964e37)
- [generator, openapi-generator] Rename servicePath to basePath. (fde964e37)
- [generator] The option `generateCSN` is removed. There is no replacement. (fde964e37)
- [generator] The type for paths in the `GeneratorOptions` is changed from `fs.PathLike` to `string`.
  In case you passed a buffer object please resolve it to a string before passing it to the SAP Cloud SDK. (fde964e37)
- [generator, openapi-generator, generator-common] The two generators use the same CLI parsing code now, aligning the way paths are resolved.
  In case you experience problems with the new logic, enable the `verbose` flag to investigate the new paths. (fde964e37)
- [util] The function `variadicArgumentToArray` is replaced by the function `transformVariadicArgumentToArray`. (fde964e37)
- [util] The field `logger` on the interface `LoggerOptions` was not used and is removed from the interface. (fde964e37)
- [openapi-generator] The internal option `packageVersion` of the OpenAPI generator is removed. (fde964e37)
- [openapi-generator] `tsConfig` option has been renamed to `tsconfig`. (fde964e37)
- [generator-common] The generator does not create `d.ts.map` files per default anymore. If you need them include a custom `tsconfig.json`.
  [Compatibility Note] All SAP Cloud SDK packages ship without `d.ts.map` files from now on.
  Modern IDEs don't require those files for code navigation, thus they are removed to decrease download size of the SDK. (fde964e37)

## New Functionalities

- [connectivity] Support `OAuth2RefreshToken` authentication type (fde964e37)
- [connectivity] Add a `retry` option in the `DestinationFetchOption`.
  Enable this options if the token exchange done by the destination service is unstable. (fde964e37)
- [connectivity, resilience] Add `ResilienceOptions` and `resilience()` function. The function returns an array of middlewares based on the provided options. (fde964e37)
- [http-client, resilience] The request configuration used in the final request is now part of the middleware context.
  User can implement middlewares to change request properties like `headers` using this reference in the middleware context.
  The request configuration contains the `url`, `headers` and all other properties of the HTTP request. (fde964e37)
- [http-client, openapi, odata-common] Introduce the middleware on the request builders and http-client.
  Visit the [documentation portal](https://sap.github.io/cloud-sdk/docs/js/guides/resilience) to see how to use middlewares. (fde964e37)
- [generator, generator-common] Introduced options `transpile` and `tsconfig` to configure transpilation for generated OData clients. (fde964e37)

## Improvements

- [connectivity] Replace `Protocol` enum with a string literal union type. (fde964e37)
- [connectivity] Replace `IsolationStrategy` enum with union type. (fde964e37)
- [generator] Align naming rules for operations and properties in OData clients by removing `_` prefix (fde964e37)

## Fixed Issues

- [connectivity] Fix the combination of providing the `iss` together with `OnPremise` basic destinations. (fde964e37)
- [odata-v2] Allow to update OData v2 entities to `null`. Fixes [3204](https://github.com/SAP/cloud-sdk-js/issues/3204). (fde964e37)
- [generator] Allow OData service to contain an entity name 'Service'. (fde964e37)
- [generator] Now links to the correct generator binary. (fde964e37)

## Known Issues

-

## Compatibility Notes

- 

## New Functionality

- 

## Improvements

-

## Fixed Issues

-
