import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import { ReactComponent as BlockIconSvg } from './icons/block-icon.svg';

const blockIcon = () => (
	<BlockIconSvg
		width="24"
		height="24"
		viewBox="0 0 24 24"
	/>
);

/**
 * Register the block type
 */
registerBlockType( metadata.name, {
	edit: Edit,
	icon: blockIcon
} );