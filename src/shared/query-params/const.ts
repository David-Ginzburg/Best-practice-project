/* eslint-disable no-magic-numbers */
import { NumberParam, withDefault } from 'use-query-params'

export const PAGE_SIZE_KEY = 'page_size'
export const PAGE_KEY = 'page'
export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 20

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 50]

export const BASE_PAGINATION_CONFIG = {
  [PAGE_KEY]: withDefault(NumberParam, DEFAULT_PAGE),
  [PAGE_SIZE_KEY]: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
}
