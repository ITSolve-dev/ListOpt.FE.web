"use client";
import { useRef } from "react";
import type { Key } from "swr";
import useSWRMutation, {
	type MutationFetcher,
	type SWRMutationConfiguration,
	type SWRMutationResponse,
} from "swr/mutation";
import type { ApiDetailsError } from "@/shared/exceptions";

export const useCancelableMutationSWR = <
	Data = unknown,
	Error = ApiDetailsError,
	SWRMutationKey extends Key = Key,
	ExtraArg = never,
	SWRData = Data,
>(
	key: SWRMutationKey,
	fetcher: MutationFetcher<Data, SWRMutationKey, ExtraArg>,
	options?: SWRMutationConfiguration<
		Data,
		Error,
		SWRMutationKey,
		ExtraArg,
		SWRData
	> & {
		throwOnError?: boolean;
	},
	timer: number = 5000,
): SWRMutationResponse<Data, Error, SWRMutationKey, ExtraArg> & {
	cancel: () => void;
} => {
	const abortControllerRef = useRef<AbortController>(new AbortController());
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// @ts-expect-error key could be string, array and func
	const wrappedFetcher: MutationFetcher<
		Data,
		SWRMutationKey,
		ExtraArg
	> = async (key: SWRMutationKey, arg: ExtraArg): Promise<Data> => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		await new Promise((resolve) => {
			timeoutRef.current = setTimeout(resolve, timer);
		});
		let data: Data;
		try {
			// @ts-expect-error key could be string, array and func
			data = await fetcher(key, {
				...arg,
				signal: abortControllerRef.current.signal,
			});
		} finally {
			abortControllerRef.current = new AbortController();
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		}
		return data;
	};

	const cancel = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};
	const data = useSWRMutation<Data, Error, SWRMutationKey, ExtraArg, SWRData>(
		key,
		wrappedFetcher,
		options,
	);
	return {
		...data,
		cancel,
	};
};
