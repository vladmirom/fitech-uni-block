/**
 * Preview controls.
 *
 * @file SliderActivationPanel.js
 */

import { PanelBody, PanelRow, Button, Notice, __ } from '../index';

const SliderActivationPanel = ({
  sliderInitialized,
  initializeSlider,
  destroySlider
}) => {
  return (
    <PanelBody title={__('Slider Activation', 'slider-posts')} initialOpen={false}>
      <PanelRow>
        <div style={{ marginBottom: '12px' }}>
          {__('Activate slider preview in the editor to see how it would work on the website. Exit preview to make changes in the slider query loop block. The slider is always initialized on the front end.', 'slider-posts')}
        </div>
      </PanelRow>

      <PanelRow>
        <div style={{ marginBottom: '12px' }}>
          <Notice
            status="warning"
            isDismissible={false}
          >
            {__('Slider is not clickable in the editor when previewed. This is due to the way how WordPress Editor deals with content.', 'slider-posts')}
          </Notice>
        </div>
      </PanelRow>

      <PanelRow>
        <div className="slider-activation-controls">
          <Button
            isPrimary
            onClick={initializeSlider}
            disabled={sliderInitialized}
            style={{ marginRight: '10px' }}
          >
            {__('Preview Slider', 'slider-posts')}
          </Button>
          <Button
            isSecondary
            onClick={destroySlider}
            disabled={!sliderInitialized}
          >
            {__('Exit Preview', 'slider-posts')}
          </Button>
        </div>
      </PanelRow>
    </PanelBody>
  );
};

export default SliderActivationPanel;
