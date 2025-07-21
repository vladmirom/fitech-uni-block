/**
 * Display settings controls for Custom Stories Query block.
 *
 * @file DisplaySettingsPanel.js
 */

import { PanelBody, PanelRow, ToggleControl, RangeControl, __ } from '../index'

const DisplaySettingsPanel = ({ attributes, setAttributes }) => {
  const {
    postsPerPage,
    showExcerpt,
    showFeaturedImage
  } = attributes

  return (
    <PanelBody title={__('Display Settings', 'fitech-theme')} initialOpen={false}>
      <PanelRow>
        <div style={{ width: '100%' }}>
          <RangeControl
            label={__('Posts per page', 'fitech-theme')}
            value={postsPerPage}
            onChange={(value) => setAttributes({ postsPerPage: value })}
            min={1}
            max={20}
            help={__('Number of posts to display (only applies when no specific posts are selected)', 'fitech-theme')}
          />
        </div>
      </PanelRow>

      <PanelRow>
        <ToggleControl
          label={__('Show Featured Image', 'fitech-theme')}
          checked={showFeaturedImage}
          onChange={(value) => setAttributes({ showFeaturedImage: value })}
        />
      </PanelRow>

      <PanelRow>
        <ToggleControl
          label={__('Show Excerpt', 'fitech-theme')}
          checked={showExcerpt}
          onChange={(value) => setAttributes({ showExcerpt: value })}
        />
      </PanelRow>
    </PanelBody>
  )
}

export default DisplaySettingsPanel
