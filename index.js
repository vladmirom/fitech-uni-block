import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import { ReactComponent as BlockIconSvg } from './icons/block-icon.svg';

// Create a wrapper component that adds necessary attributes fo the icon. Make sure to add the correct viewBox parameters.
const blockIcon = () => (
  <BlockIconSvg
    width="24"
    height="24"
    viewBox="0 0 640 640"
  />
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
  icon: blockIcon
} );
