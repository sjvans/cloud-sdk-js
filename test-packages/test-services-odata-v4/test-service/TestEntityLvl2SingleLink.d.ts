/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
/**
 * See https://api.sap.com/api/path for more information.
 */
export declare class TestEntityLvl2SingleLink<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityLvl2SingleLinkType<T>
{
  /**
   * Technical entity name for TestEntityLvl2SingleLink.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the TestEntityLvl2SingleLink entity
   */
  static _keys: string[];
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: TestEntityLvl2SingleLinkApi<T>);
}
export interface TestEntityLvl2SingleLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
