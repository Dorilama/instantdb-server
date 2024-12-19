import { signal, computed, effect, Signal } from "@preact/signals-core";
import { init as instantInit, i, id } from "@dorilama/instantdb-byos";
import type {
  SignalFunctions,
  MaybeSignal,
  InstantSchemaDef,
  InstantUnknownSchema,
  InstantConfig,
  InstaQLParams,
  InstaQLEntity,
} from "@dorilama/instantdb-byos";
import NetworkListener from "./NetworkListener";
import MemosyStorage from "./MemoryStorage";

const toValue: SignalFunctions["toValue"] = (maybeSignal) => {
  if (maybeSignal instanceof Signal) {
    return maybeSignal.value;
  }
  return maybeSignal;
};

/**
 * The first step: init your application!
 *
 * Visit https://instantdb.com/dash to get your `appId` :)
 *
 */
function init<
  Schema extends InstantSchemaDef<any, any, any> = InstantUnknownSchema
>(config: InstantConfig<Schema>) {
  const db = instantInit(
    config,
    { signal, computed, effect, toValue },
    {
      Storage: MemosyStorage,
      NetworkListener,
      onBeforeInit() {
        //@ts-ignore
        globalThis.window = {};
      },
    }
  );

  type useQueryState<Q extends InstaQLParams<Schema>> = Omit<
    ReturnType<typeof db.useQuery<Q>>,
    "stop"
  >;
  type useQueryRes<Q extends InstaQLParams<Schema>> = {
    [K in keyof useQueryState<Q>]: useQueryState<Q>[K]["value"];
  };

  /**
   *
   * Listen to reactive data using the same query you would use for useQuery
   *
   * the query can be an object or a signal/computed
   * if an object it will be converted into a signal and be available in the context
   *
   * the query is dynamic: mutating the query signal will automatically subscribe to the updated query
   *
   * the callback gets executed when the state of the query subscription changes
   *
   * returns a cleanup function to unsubscribe
   *
   */
  function onQuery<Q extends InstaQLParams<Schema>>(
    query: MaybeSignal<Q | null>,
    cb: (ctx: {
      res: useQueryRes<Q>;
      query: Signal<null | Q> | null;
      db: typeof db;
    }) => (() => void) | void
  ) {
    const isQuerySignal = query instanceof Signal;
    const _query: Signal<null | Q> = isQuerySignal ? query : signal(query);

    const result = db.useQuery(_query);

    const stopEffect = effect(() => {
      const res = {
        isLoading: result.isLoading.value,
        data: result.data.value,
        pageInfo: result.pageInfo.value,
        error: result.error.value,
      };
      return cb({ res, query: isQuerySignal ? null : _query, db });
    });

    function cleanup() {
      result.stop();
      stopEffect();
    }

    return cleanup;
  }

  type useAuthState = Omit<ReturnType<typeof db.useAuth>, "stop">;
  type useAuthRes = {
    [K in keyof useAuthState]: useAuthState[K]["value"];
  };

  /**
   *
   * Listen to auth state
   *
   * returns a cleanup function to unsubscribe
   *
   */
  function onAuth(
    cb: (ctx: { res: useAuthRes; db: typeof db }) => (() => void) | void
  ) {
    const result = db.useAuth();

    const stopEffect = effect(() => {
      const res = {
        isLoading: result.isLoading.value,
        user: result.user.value,
        error: result.error.value,
      };
      return cb({ res, db });
    });

    function cleanup() {
      result.stop();
      stopEffect();
    }

    return cleanup;
  }

  return { db, onQuery, onAuth };
}

export { i, id, init };
export type { SignalFunctions, MaybeSignal, InstaQLEntity };
