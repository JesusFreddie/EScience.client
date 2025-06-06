/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * EScience.Application
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from "@tanstack/vue-query";
import type {
  DataTag,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationReturnType,
  UseQueryOptions,
  UseQueryReturnType,
} from "@tanstack/vue-query";
import { computed, unref } from "vue";
import type { MaybeRef } from "vue";
import type {
  ArticleBranch,
  ArticleBranchDto,
  CreateBranchDto,
} from "../model";
import { createInstance } from "../api-instance";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const branchCreate = (
  articleId: MaybeRef<string>,
  createBranchDto: MaybeRef<CreateBranchDto>,
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  articleId = unref(articleId);
  createBranchDto = unref(createBranchDto);

  return createInstance<ArticleBranchDto>(
    {
      url: `/branch/${articleId}/create`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: createBranchDto,
      signal,
    },
    options,
  );
};

export const getBranchCreateMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof branchCreate>>,
    TError,
    { articleId: string; data: CreateBranchDto },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof branchCreate>>,
  TError,
  { articleId: string; data: CreateBranchDto },
  TContext
> => {
  const mutationKey = ["branchCreate"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof branchCreate>>,
    { articleId: string; data: CreateBranchDto }
  > = (props) => {
    const { articleId, data } = props ?? {};

    return branchCreate(articleId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type BranchCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof branchCreate>>
>;
export type BranchCreateMutationBody = CreateBranchDto;
export type BranchCreateMutationError = unknown;

export const useBranchCreate = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof branchCreate>>,
    TError,
    { articleId: string; data: CreateBranchDto },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationReturnType<
  Awaited<ReturnType<typeof branchCreate>>,
  TError,
  { articleId: string; data: CreateBranchDto },
  TContext
> => {
  const mutationOptions = getBranchCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const branchGet = (
  articleId: MaybeRef<string>,
  branchName: MaybeRef<string>,
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  articleId = unref(articleId);
  branchName = unref(branchName);

  return createInstance<ArticleBranch>(
    { url: `/branch/${articleId}/${branchName}`, method: "GET", signal },
    options,
  );
};

export const getBranchGetQueryKey = (
  articleId: MaybeRef<string>,
  branchName: MaybeRef<string>,
) => {
  return ["branch", articleId, branchName] as const;
};

export const getBranchGetQueryOptions = <
  TData = Awaited<ReturnType<typeof branchGet>>,
  TError = unknown,
>(
  articleId: MaybeRef<string>,
  branchName: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof branchGet>>, TError, TData>
    >;
    request?: SecondParameter<typeof createInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getBranchGetQueryKey(articleId, branchName);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof branchGet>>> = ({
    signal,
  }) => branchGet(articleId, branchName, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: computed(() => !!(unref(articleId) && unref(branchName))),
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof branchGet>>, TError, TData>;
};

export type BranchGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof branchGet>>
>;
export type BranchGetQueryError = unknown;

export function useBranchGet<
  TData = Awaited<ReturnType<typeof branchGet>>,
  TError = unknown,
>(
  articleId: MaybeRef<string>,
  branchName: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof branchGet>>, TError, TData>
    >;
    request?: SecondParameter<typeof createInstance>;
  },
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getBranchGetQueryOptions(articleId, branchName, options);

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

export const branchGetAll = (
  articleId: MaybeRef<string>,
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  articleId = unref(articleId);

  return createInstance<ArticleBranch[]>(
    { url: `/branch/${articleId}`, method: "GET", signal },
    options,
  );
};

export const getBranchGetAllQueryKey = (articleId: MaybeRef<string>) => {
  return ["branch", articleId] as const;
};

export const getBranchGetAllQueryOptions = <
  TData = Awaited<ReturnType<typeof branchGetAll>>,
  TError = unknown,
>(
  articleId: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof branchGetAll>>, TError, TData>
    >;
    request?: SecondParameter<typeof createInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getBranchGetAllQueryKey(articleId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof branchGetAll>>> = ({
    signal,
  }) => branchGetAll(articleId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: computed(() => !!unref(articleId)),
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof branchGetAll>>, TError, TData>;
};

export type BranchGetAllQueryResult = NonNullable<
  Awaited<ReturnType<typeof branchGetAll>>
>;
export type BranchGetAllQueryError = unknown;

export function useBranchGetAll<
  TData = Awaited<ReturnType<typeof branchGetAll>>,
  TError = unknown,
>(
  articleId: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof branchGetAll>>, TError, TData>
    >;
    request?: SecondParameter<typeof createInstance>;
  },
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getBranchGetAllQueryOptions(articleId, options);

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

export const branchGetById = (
  articleId: MaybeRef<string>,
  branchId: MaybeRef<string>,
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  articleId = unref(articleId);
  branchId = unref(branchId);

  return createInstance<ArticleBranch>(
    { url: `/branch/${articleId}/id/${branchId}`, method: "GET", signal },
    options,
  );
};

export const getBranchGetByIdQueryKey = (
  articleId: MaybeRef<string>,
  branchId: MaybeRef<string>,
) => {
  return ["branch", articleId, "id", branchId] as const;
};

export const getBranchGetByIdQueryOptions = <
  TData = Awaited<ReturnType<typeof branchGetById>>,
  TError = unknown,
>(
  articleId: MaybeRef<string>,
  branchId: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof branchGetById>>, TError, TData>
    >;
    request?: SecondParameter<typeof createInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getBranchGetByIdQueryKey(articleId, branchId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof branchGetById>>> = ({
    signal,
  }) => branchGetById(articleId, branchId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: computed(() => !!(unref(articleId) && unref(branchId))),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof branchGetById>>,
    TError,
    TData
  >;
};

export type BranchGetByIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof branchGetById>>
>;
export type BranchGetByIdQueryError = unknown;

export function useBranchGetById<
  TData = Awaited<ReturnType<typeof branchGetById>>,
  TError = unknown,
>(
  articleId: MaybeRef<string>,
  branchId: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof branchGetById>>, TError, TData>
    >;
    request?: SecondParameter<typeof createInstance>;
  },
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getBranchGetByIdQueryOptions(
    articleId,
    branchId,
    options,
  );

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
