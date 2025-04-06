/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * EScience.Application
 * OpenAPI spec version: 1.0
 */
import { useQuery } from "@tanstack/vue-query";
import type {
  DataTag,
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryReturnType,
} from "@tanstack/vue-query";
import { computed, unref } from "vue";
import type { MaybeRef } from "vue";
import type { ProfileDto } from "../model";
import { createInstance } from "../api-instance";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const accountSession = (
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  return createInstance<ProfileDto>(
    { url: `/account/session`, method: "GET", signal },
    options,
  );
};

export const getAccountSessionQueryKey = () => {
  return ["account", "session"] as const;
};

export const getAccountSessionQueryOptions = <
  TData = Awaited<ReturnType<typeof accountSession>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof accountSession>>, TError, TData>
  >;
  request?: SecondParameter<typeof createInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getAccountSessionQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof accountSession>>> = ({
    signal,
  }) => accountSession(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof accountSession>>,
    TError,
    TData
  >;
};

export type AccountSessionQueryResult = NonNullable<
  Awaited<ReturnType<typeof accountSession>>
>;
export type AccountSessionQueryError = unknown;

export function useAccountSession<
  TData = Awaited<ReturnType<typeof accountSession>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof accountSession>>, TError, TData>
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getAccountSessionQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryReturnType<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = unref(queryOptions).queryKey as DataTag<
    QueryKey,
    TData,
    TError
  >;

  return query;
}

export const accountGetProfile = (
  accountName: MaybeRef<string>,
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  accountName = unref(accountName);

  return createInstance<ProfileDto>(
    { url: `/account/${accountName}`, method: "GET", signal },
    options,
  );
};

export const getAccountGetProfileQueryKey = (accountName: MaybeRef<string>) => {
  return ["account", accountName] as const;
};

export const getAccountGetProfileQueryOptions = <
  TData = Awaited<ReturnType<typeof accountGetProfile>>,
  TError = unknown,
>(
  accountName: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof accountGetProfile>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof createInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getAccountGetProfileQueryKey(accountName);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof accountGetProfile>>
  > = ({ signal }) => accountGetProfile(accountName, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: computed(() => !!unref(accountName)),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof accountGetProfile>>,
    TError,
    TData
  >;
};

export type AccountGetProfileQueryResult = NonNullable<
  Awaited<ReturnType<typeof accountGetProfile>>
>;
export type AccountGetProfileQueryError = unknown;

export function useAccountGetProfile<
  TData = Awaited<ReturnType<typeof accountGetProfile>>,
  TError = unknown,
>(
  accountName: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof accountGetProfile>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof createInstance>;
  },
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getAccountGetProfileQueryOptions(accountName, options);

  const query = useQuery(queryOptions) as UseQueryReturnType<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = unref(queryOptions).queryKey as DataTag<
    QueryKey,
    TData,
    TError
  >;

  return query;
}
