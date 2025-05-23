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
import type { LoginRequestDto, RegisterRequestDto } from "../model";
import { createInstance } from "../api-instance";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const authRegister = (
  registerRequestDto: MaybeRef<RegisterRequestDto>,
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  registerRequestDto = unref(registerRequestDto);

  return createInstance<void>(
    {
      url: `/auth/register`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: registerRequestDto,
      signal,
    },
    options,
  );
};

export const getAuthRegisterMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authRegister>>,
    TError,
    { data: RegisterRequestDto },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authRegister>>,
  TError,
  { data: RegisterRequestDto },
  TContext
> => {
  const mutationKey = ["authRegister"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authRegister>>,
    { data: RegisterRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return authRegister(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthRegisterMutationResult = NonNullable<
  Awaited<ReturnType<typeof authRegister>>
>;
export type AuthRegisterMutationBody = RegisterRequestDto;
export type AuthRegisterMutationError = unknown;

export const useAuthRegister = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authRegister>>,
    TError,
    { data: RegisterRequestDto },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationReturnType<
  Awaited<ReturnType<typeof authRegister>>,
  TError,
  { data: RegisterRequestDto },
  TContext
> => {
  const mutationOptions = getAuthRegisterMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authLogin = (
  loginRequestDto: MaybeRef<LoginRequestDto>,
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  loginRequestDto = unref(loginRequestDto);

  return createInstance<void>(
    {
      url: `/auth/login`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: loginRequestDto,
      signal,
    },
    options,
  );
};

export const getAuthLoginMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authLogin>>,
    TError,
    { data: LoginRequestDto },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authLogin>>,
  TError,
  { data: LoginRequestDto },
  TContext
> => {
  const mutationKey = ["authLogin"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authLogin>>,
    { data: LoginRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return authLogin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authLogin>>
>;
export type AuthLoginMutationBody = LoginRequestDto;
export type AuthLoginMutationError = unknown;

export const useAuthLogin = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authLogin>>,
    TError,
    { data: LoginRequestDto },
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationReturnType<
  Awaited<ReturnType<typeof authLogin>>,
  TError,
  { data: LoginRequestDto },
  TContext
> => {
  const mutationOptions = getAuthLoginMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authLogout = (
  options?: SecondParameter<typeof createInstance>,
  signal?: AbortSignal,
) => {
  return createInstance<void>(
    { url: `/auth/logout`, method: "POST", signal },
    options,
  );
};

export const getAuthLogoutMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authLogout>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authLogout>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ["authLogout"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authLogout>>,
    void
  > = () => {
    return authLogout(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthLogoutMutationResult = NonNullable<
  Awaited<ReturnType<typeof authLogout>>
>;

export type AuthLogoutMutationError = unknown;

export const useAuthLogout = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authLogout>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof createInstance>;
}): UseMutationReturnType<
  Awaited<ReturnType<typeof authLogout>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getAuthLogoutMutationOptions(options);

  return useMutation(mutationOptions);
};
