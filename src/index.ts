// Notice:
// adapted from [@instantdb/react-native](https://github.com/instantdb/instant/blob/main/client/packages/react-native/README.md)
// see instantdb-license.md for license
import patchWindow from "./patch";
import { signal, computed, effect, Signal } from "@preact/signals-core";
import AlwaysOnline from "./AlwaysOnline";
import MemosyStorage from "./MemoryStorage";
import version from "./version";

patchWindow;

const toValue: SignalFunctions["toValue"] = (maybeSignal) => {
  if (maybeSignal instanceof Signal) {
    return maybeSignal.value;
  }
  return maybeSignal;
};

import { InstantByosAbstractDatabase } from "@dorilama/instantdb-byos";
import type {
  SignalFunctions,
  MaybeSignal,
  BackwardsCompatibleSchema,
  IInstantDatabase,
  Config,
  Query,
  QueryResponse,
  InstantObject,
  AuthState,
  User,
  InstantByosConfig,
} from "@dorilama/instantdb-byos";

import { i, id, tx, lookup } from "@instantdb/core";
import type {
  RoomSchemaShape,
  InstantQuery,
  InstantQueryResult,
  InstantSchema,
  InstantSchemaDatabase,
  ConnectionStatus,

  // schema types
  AttrsDefs,
  CardinalityKind,
  DataAttrDef,
  EntitiesDef,
  EntitiesWithLinks,
  EntityDef,
  InstantGraph,
  LinkAttrDef,
  LinkDef,
  LinksDef,
  ResolveAttrs,
  ValueTypes,
  InstantEntity,
  ConfigWithSchema,
  InstaQLEntity,
  InstaQLResult,
  InstantConfig,
  InstantSchemaDef,
  InstantUnknownSchema,
  InstantRules,
  UpdateParams,
  LinkParams,
} from "@instantdb/core";

/**
 *
 * The first step: init your application!
 *
 * Visit https://instantdb.com/dash to get your `appId` :)
 *
 * @example
 *  import { init } from "@instantdb/react-native"
 *
 *  const db = init({ appId: "my-app-id" })
 *
 *  // You can also provide a schema for type safety and editor autocomplete!
 *
 *  import { init } from "@instantdb/react-native"
 *  import schema from ""../instant.schema.ts";
 *
 *  const db = init({ appId: "my-app-id", schema })
 *
 *  // To learn more: https://instantdb.com/docs/modeling-data
 */
function init<
  Schema extends InstantSchemaDef<any, any, any> = InstantUnknownSchema
>(config: InstantByosConfig<Schema>) {
  return new InstantByosServerDatabase<Schema>(
    config,
    { signal, computed, effect, toValue },
    {
      "@dorilama/instantdb-server": version,
    }
  );
}

class InstantByosServerDatabase<
  Schema extends InstantSchemaDef<any, any, any>
> extends InstantByosAbstractDatabase<Schema> {
  static Storage = MemosyStorage;
  static NetworkListener = AlwaysOnline;
}

export {
  init,
  id,
  tx,
  lookup,
  i,
  signal,
  computed,
  effect,
  toValue,
  Signal,
  InstantByosServerDatabase,
};
export type {
  Config,
  Query,
  QueryResponse,
  InstantObject,
  User,
  AuthState,
  ConnectionStatus,
  InstantQuery,
  InstantQueryResult,
  InstantSchema,
  InstantSchemaDatabase,
  IInstantDatabase,
  InstantEntity,
  RoomSchemaShape,

  // schema types
  AttrsDefs,
  CardinalityKind,
  DataAttrDef,
  EntitiesDef,
  EntitiesWithLinks,
  EntityDef,
  InstantGraph,
  LinkAttrDef,
  LinkDef,
  LinksDef,
  ResolveAttrs,
  ValueTypes,
  InstaQLEntity,
  InstaQLResult,
  InstantSchemaDef,
  InstantUnknownSchema,
  BackwardsCompatibleSchema,
  InstantRules,
  UpdateParams,
  LinkParams,
  //
  InstantByosConfig,
  MaybeSignal,
};
