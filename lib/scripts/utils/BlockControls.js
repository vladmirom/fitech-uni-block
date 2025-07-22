/**
 * Main admin wrapper for Custom Stories Query block.
 *
 * @file BlockControls.js
 */

import { InspectorControls } from '../index'
import { QueryControlsPanel, DisplaySettingsPanel } from '../index'

const CustomStoriesControls = ({
  attributes,
  setAttributes
}) => {
  return (
    <InspectorControls>
      <QueryControlsPanel
        attributes={attributes}
        setAttributes={setAttributes}
      />

      <DisplaySettingsPanel
        attributes={attributes}
        setAttributes={setAttributes}
      />
    </InspectorControls>
  )
}

export default CustomStoriesControls
