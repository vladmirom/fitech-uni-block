/**
 * Main admin wrapper.
 *
 * @file SliderControls.js
 */

import { InspectorControls } from '../index'
import { SliderActivationPanel, SliderSettingsPanel, QueryControlsPanel } from '../index'

const SliderControls = ({
  attributes,
  setAttributes,
  sliderInitialized,
  initializeSlider,
  destroySlider
}) => {
  return (
    <InspectorControls>
      <QueryControlsPanel
        attributes={attributes}
        setAttributes={setAttributes}
      />

      <SliderActivationPanel
        sliderInitialized={sliderInitialized}
        initializeSlider={initializeSlider}
        destroySlider={destroySlider}
      />

      <SliderSettingsPanel
        attributes={attributes}
        setAttributes={setAttributes}
      />
    </InspectorControls>
  )
}

export default SliderControls
