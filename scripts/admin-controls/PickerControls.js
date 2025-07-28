/**
 * Main admin wrapper.
 *
 * @file PickerControls.js
 */

import { InspectorControls } from '../index'
import { PickerSettingsPanel, QueryControlsPanel } from '../index'

const PickerControls = ({
  attributes,
  setAttributes
}) => {
  return (
    <InspectorControls>
      <QueryControlsPanel
        attributes={attributes}
        setAttributes={setAttributes}
      />

      <PickerSettingsPanel
        attributes={attributes}
        setAttributes={setAttributes}
      />
    </InspectorControls>
  )
}

export default PickerControls
