/**
 * Edit Component for WordPress Block
 * 
 * This is the main edit component that renders the block in the WordPress editor.
 * It handles the block's visual representation and user interactions in the admin area.
 * 
 * @file edit.js
 * @since 1.0.0
 */

import {
	useBlockProps,
	useEffect,
	CustomBlockControls
} from './scripts'

import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
	const blockProps = useBlockProps()

	// Extract attributes
	const {
		content = ''
	} = attributes

	// Block initialization
	useEffect(() => {
		if (!attributes.blockId) {
			setAttributes({ blockId: `${clientId}-${Date.now()}` })
		}
	}, [clientId])

	return (
		<div {...blockProps}>
			{/* Sidebar Controls */}
			<CustomBlockControls
				attributes={attributes}
				setAttributes={setAttributes}
			/>

			{/* Block Content */}
			<div className="js-custom-block">
				<p>{content || 'Your block content will appear here'}</p>
			</div>
		</div>
	)
}