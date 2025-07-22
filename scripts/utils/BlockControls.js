/**
 * Main admin wrapper for Custom Universities Query block.
 *
 * @file BlockControls.js
 */

import { InspectorControls } from '../index'
import { QueryControlsPanel } from '../index'

const CustomUniversityControls = ({
  attributes,
  setAttributes
}) => {
  return (
    <InspectorControls>
      <QueryControlsPanel
        attributes={attributes}
        setAttributes={setAttributes}
      />
    </InspectorControls>
  )
}

export default CustomUniversityControls
