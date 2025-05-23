/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * EScience.Application
 * OpenAPI spec version: 1.0
 */
import { useMutation } from "@tanstack/vue-query";
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationReturnType,
} from "@tanstack/vue-query";
import { unref } from "vue";
import type { MaybeRef } from "vue";
import type {
  GetMergeRequest,
  MergeRequest,
  SuccessResponse,
  TextDiff,
} from "../model";
import { createInstance } from "../api-instance";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const merge = (
  articleId: MaybeRef<string>,
  branchId: MaybeRef<string>,
  mergeRequest: MaybeRef<MergeRequest>,
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  articleId = unref(articleId);
  branchId = unref(branchId);
  mergeRequest = unref(mergeRequest);

  return createInstance<SuccessResponse>(
    {
      url: `/merge/${articleId}/version/${branchId}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: mergeRequest,
      signal,
    },
    options,
  );
};

export const getMergeMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof merge>>,
    TError,
    { articleId: string; branchId: string; data: MergeRequest },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof merge>>,
  TError,
  { articleId: string; branchId: string; data: MergeRequest },
  TContext
> => {
  const mutationKey = ["merge"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof merge>>,
    { articleId: string; branchId: string; data: MergeRequest }
  > = (props) => {
    const { articleId, branchId, data } = props ?? {};

    return merge(articleId, branchId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type MergeMutationResult = NonNullable<
  Awaited<ReturnType<typeof merge>>
>;
export type MergeMutationBody = MergeRequest;
export type MergeMutationError = unknown;

export const useMerge = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof merge>>,
    TError,
    { articleId: string; branchId: string; data: MergeRequest },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationReturnType<
  Awaited<ReturnType<typeof merge>>,
  TError,
  { articleId: string; branchId: string; data: MergeRequest },
  TContext
> => {
  const mutationOptions = getMergeMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getMergeRequest = (
  articleId: MaybeRef<string>,
  branchId: MaybeRef<string>,
  getMergeRequest: MaybeRef<GetMergeRequest>,
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  articleId = unref(articleId);
  branchId = unref(branchId);
  getMergeRequest = unref(getMergeRequest);

  return createInstance<TextDiff[]>(
    {
      url: `/merge/${articleId}/version/${branchId}/merge-request`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: getMergeRequest,
      signal,
    },
    options,
  );
};

export const getGetMergeRequestMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof getMergeRequest>>,
    TError,
    { articleId: string; branchId: string; data: GetMergeRequest },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof getMergeRequest>>,
  TError,
  { articleId: string; branchId: string; data: GetMergeRequest },
  TContext
> => {
  const mutationKey = ["getMergeRequest"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof getMergeRequest>>,
    { articleId: string; branchId: string; data: GetMergeRequest }
  > = (props) => {
    const { articleId, branchId, data } = props ?? {};

    return getMergeRequest(articleId, branchId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type GetMergeRequestMutationResult = NonNullable<
  Awaited<ReturnType<typeof getMergeRequest>>
>;
export type GetMergeRequestMutationBody = GetMergeRequest;
export type GetMergeRequestMutationError = unknown;

export const useGetMergeRequest = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof getMergeRequest>>,
    TError,
    { articleId: string; branchId: string; data: GetMergeRequest },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationReturnType<
  Awaited<ReturnType<typeof getMergeRequest>>,
  TError,
  { articleId: string; branchId: string; data: GetMergeRequest },
  TContext
> => {
  const mutationOptions = getGetMergeRequestMutationOptions(options);

  return useMutation(mutationOptions);
};
