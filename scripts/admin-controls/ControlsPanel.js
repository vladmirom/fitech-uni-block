/**
 * Control panel for block settings
 *
 * @file ControlsPanel.js
 */

import { PanelBody, PanelRow, TextControl, __ } from '../index'
import { useState } from 'react'

const ControlsPanel = ({ attributes, setAttributes }) => {
	const { content = '' } = attributes

	const handleContentChange = (newContent) => {
		setAttributes({ content: newContent })
	}

	return (
		<PanelBody title={__('Block Settings', 'your-textdomain')}>
			<PanelRow>
				<div style={{ width: '100%' }}>
					<TextControl
						label={__('Block Content', 'your-textdomain')}
						value={content}
						onChange={handleContentChange}
						placeholder={__('Enter your content...', 'your-textdomain')}
						help={__('This content will be displayed in your block.', 'your-textdomain')}
					/>
				</div>
			</PanelRow>
		</PanelBody>
	)
}

export default ControlsPanel