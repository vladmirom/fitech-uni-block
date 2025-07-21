import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import { ReactComponent as BlockIconSvg } from './icons/block-icon.svg';
import { registerUniversitiesLoopVariation } from './scripts';

// Create a wrapper component that adds necessary attributes for the icon
const blockIcon = () => (
  <BlockIconSvg
    width="24"
    height="24"
    viewBox="0 0 640 512"
  />
);

/**
 * Register the block variation first
 */
registerUniversitiesLoopVariation();

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	edit: Edit,
  icon: blockIcon
} );
