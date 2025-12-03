/**
 * Universal function to get configuration object by key
 * @param config - Configuration object (Record)
 * @param key - Key from the configuration
 * @returns Configuration object for the key or empty object as fallback
 */
export function getConfig<
	TKey extends string,
	TConfig extends Record<TKey, { label: string; color: string }>
>(config: TConfig, key: TKey): TConfig[TKey] {
	return config[key] ?? ({ label: "", color: "" } as TConfig[TKey]);
}
