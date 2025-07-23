/**
 * Constants for the block
 *
 * @file BlockConstants.js
 */

import { __ } from '../index'

// Example constants for your block
export const BLOCK_DEFAULTS = {
	content: __('Default content', 'your-textdomain')
}

export const BLOCK_OPTIONS = [
	{ label: __('Option 1', 'your-textdomain'), value: 'option1' },
	{ label: __('Option 2', 'your-textdomain'), value: 'option2' },
	{ label: __('Option 3', 'your-textdomain'), value: 'option3' }
]