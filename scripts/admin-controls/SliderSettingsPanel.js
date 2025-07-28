/**
 * Slider settings controls.
 *
 * @file SliderSettingsPanel.js
 */

import { PanelBody, PanelRow, ToggleControl, RangeControl, PanelColorSettings, __ } from '../index'

const SliderSettingsPanel = ({ attributes, setAttributes }) => {
  const {
    slidesToShow,
    slidesToScroll,
    arrows,
    arrowsColor,
    dots,
    dotsMainColor,
    dotsHoverColor,
    dotsActiveColor,
    infinite,
    autoplay,
    focusOnSelect,
    autoplaySpeed
  } = attributes

  return (
    <PanelBody title={__('Slider Controls', 'slider-posts')} initialOpen={ false }>
      <PanelRow>
        <ToggleControl
          label={__('Navigation Arrows', 'slider-posts')}
          checked={arrows}
          onChange={(value) => setAttributes({ arrows: value })}
        />
      </PanelRow>

      {arrows && (
        <PanelRow>
          <div className={'panel-controll-color-settings'}>
            <PanelColorSettings
              colorSettings={[
                {
                  value: arrowsColor,
                  onChange: (newColor) => setAttributes({ arrowsColor: newColor }),
                  label: 'Arrow Color',
                },
              ]}
            />
          </div>
        </PanelRow>
      )}

      <PanelRow>
        <ToggleControl
          label={__('Infinite', 'slider-posts')}
          checked={infinite}
          onChange={(value) => setAttributes({ infinite: value })}
        />
      </PanelRow>

      <PanelRow>
        <ToggleControl
          label={__('Autoplay', 'slider-posts')}
          checked={autoplay}
          onChange={(value) => setAttributes({ autoplay: value })}
        />
      </PanelRow>

      <PanelRow>
        <ToggleControl
          label={__('Navigation Dots', 'slider-posts')}
          checked={dots}
          onChange={(value) => setAttributes({ dots: value })}
        />
      </PanelRow>

      {dots && (
        <PanelRow>
          <div className={'panel-controll-color-settings'}>
            <PanelColorSettings
              colorSettings={[
                {
                  value: dotsMainColor,
                  onChange: (newColor) => setAttributes({ dotsMainColor: newColor }),
                  label: 'Dots Main Color',
                },
              ]}
            />
            <PanelColorSettings
              colorSettings={[
                {
                  value: dotsHoverColor,
                  onChange: (newColor) => setAttributes({ dotsHoverColor: newColor }),
                  label: 'Dots Hover Color',
                },
              ]}
            />
            <PanelColorSettings
              colorSettings={[
                {
                  value: dotsActiveColor,
                  onChange: (newColor) => setAttributes({ dotsActiveColor: newColor }),
                  label: 'Dots Active Color',
                },
              ]}
            />
          </div>
        </PanelRow>
      )}

      <PanelRow>
        <ToggleControl
          label={__('Focus on Select', 'slider-posts')}
          checked={focusOnSelect}
          onChange={(value) => setAttributes({ focusOnSelect: value })}
        />
      </PanelRow>

      <PanelRow>
        <div style={{ width: '100%' }}>
          <RangeControl
            label={__('Slides to Show', 'slider-posts')}
            value={slidesToShow}
            onChange={(value) => setAttributes({ slidesToShow: value })}
            min={1}
            max={10}
          />
        </div>
      </PanelRow>

      <PanelRow>
        <div style={{ width: '100%' }}>
          <RangeControl
            label={__('Slides to Scroll', 'slider-posts')}
            value={slidesToScroll}
            onChange={(value) => setAttributes({ slidesToScroll: value })}
            min={1}
            max={10}
            style={{ width: '100%' }}
          />
        </div>
      </PanelRow>

      <PanelRow>
        <div style={{ width: '100%' }}>
          <RangeControl
            label={__('Autoplay Speed', 'slider-posts')}
            value={autoplaySpeed}
            onChange={(value) => setAttributes({ autoplaySpeed: value })}
            min={1000}
            max={10000}
            style={{ width: '100%' }}
          />
        </div>
      </PanelRow>
    </PanelBody>
  )
}

export default SliderSettingsPanel
