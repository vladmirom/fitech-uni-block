/**
 * Constants and templates for the Custom Stories Query block.
 *
 * @file BlockConstants.js
 */

import { __ } from '../index'

export const ALLOWED_BLOCKS = ['core/query']

export const TEMPLATE = [
  ['core/query', {
    queryId: Date.now(),
    query: {
      perPage: 6,
      pages: 0,
      offset: 0,
      postType: 'fit-university',
      orderBy: 'date',
      order: 'desc',
    },
    className: 'js-query-container',
    align: 'wide',
  }]
]
