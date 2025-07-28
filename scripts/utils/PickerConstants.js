/**
 * Constants and templates for the Posts Picker block.
 *
 * @file PickerConstants.js
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
      postType: 'post',
      orderBy: 'date',
      order: 'desc',
    },
    displayLayout: {
      type: 'flex',
      columns: 3,
    },
    className: 'posts-picker-query',
    align: '',
  }]
]

// Function to create a template with specific post IDs
export const createTemplateWithPosts = (selectedPosts = [], postType = 'post') => {
  const queryAttributes = {
    queryId: Date.now(),
    query: {
      perPage: selectedPosts.length > 0 ? selectedPosts.length : 6,
      pages: 0,
      offset: 0,
      postType: postType,
      orderBy: 'date',
      order: 'desc',
    },
    displayLayout: {
      type: 'flex',
      columns: 3,
    },
    className: 'posts-picker-query',
    align: '',
  }

  // Add include parameter if we have selected posts
  if (selectedPosts.length > 0) {
    queryAttributes.query.include = selectedPosts.map(id => parseInt(id, 10))
  }

  return [['core/query', queryAttributes]]
}

// Fallback options - these will be used if the API call fails
export const FALLBACK_POST_TYPE_OPTIONS = [
  { label: __('Post', 'posts-picker'), value: 'post' },
  { label: __('Page', 'posts-picker'), value: 'page' },
  { label: __('Villas', 'posts-picker'), value: 'villa' },
  { label: __('Apartment', 'posts-picker'), value: 'apartment' },
  { label: __('Experiences', 'posts-picker'), value: 'experience' },
]
