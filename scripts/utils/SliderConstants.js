/**
 * Constants and templates for the Slider Posts block.
 *
 * @file SliderConstants.js
 */

import { __ } from '../index'

export const ALLOWED_BLOCKS = ['core/query']

export const TEMPLATE = [
  ['core/query', {
    queryId: Date.now(),
    query: {
      perPage: 3,
      pages: 0,
      offset: 0,
      postType: 'post',
      orderBy: 'date',
      order: 'desc',
      // This will be updated dynamically when posts are selected
    },
    displayLayout: {
      type: 'flex',
      columns: 1,
    },
    className: 'js-slide-container',
    align: '',
  }]
]

// Function to create a template with specific post IDs
export const createTemplateWithPosts = (selectedPosts = [], postType = 'post') => {
  const queryAttributes = {
    queryId: Date.now(),
    query: {
      perPage: selectedPosts.length > 0 ? selectedPosts.length : 3,
      pages: 0,
      offset: 0,
      postType: postType,
      orderBy: 'date',
      order: 'desc',
    },
    displayLayout: {
      type: 'flex',
      columns: 1,
    },
    className: 'js-slide-container',
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
  { label: __('Post', 'slider-posts'), value: 'post' },
  { label: __('Page', 'slider-posts'), value: 'page' },
  { label: __('Villas', 'slider-posts'), value: 'villa' },
  { label: __('Apartment', 'slider-posts'), value: 'apartment' },
  { label: __('Experiences', 'slider-posts'), value: 'experience' },
]
