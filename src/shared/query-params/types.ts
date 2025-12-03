import type { QueryParamConfig } from "use-query-params"

export type NullishValueToExclude = null

export type ExcludeNullish<QueryValue> = QueryValue extends (infer QueryValueItem)[]
	? Exclude<QueryValueItem, NullishValueToExclude>[]
	: Exclude<QueryValue, NullishValueToExclude>

export type ParameterValue<QueryParameter> = QueryParameter extends QueryParamConfig<
	infer QueryValue
>
	? QueryValue
	: never

export type InputValue<Config> = {
	[Key in keyof Config]?: ExcludeNullish<ParameterValue<Config[Key]>>;
}

export type OutputValue<QueryConfig> = {
	[QueryKey in keyof QueryConfig]: ExcludeNullish<QueryConfig[QueryKey]>;
}
