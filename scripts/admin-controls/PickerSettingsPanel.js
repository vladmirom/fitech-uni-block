/**
 * Display settings controls.
 *
 * @file PickerSettingsPanel.js
 */

import { PanelBody, PanelRow, SelectControl, RangeControl, __ } from '../index'

const PickerSettingsPanel = ({ attributes, setAttributes }) => {
  const {
    displayLayout,
    columnsDesktop,
    columnsTablet,
    columnsMobile
  } = attributes

  return (
    <PanelBody title={__('Display Settings', 'posts-picker')} initialOpen={false}>
      <PanelRow>
        <SelectControl
          label={__('Layout', 'posts-picker')}
          value={displayLayout}
          options={[
            { label: __('Grid', 'posts-picker'), value: 'grid' },
            { label: __('List', 'posts-picker'), value: 'list' }
          ]}
          onChange={(value) => setAttributes({ displayLayout: value })}
        />
      </PanelRow>

      {displayLayout === 'grid' && (
        <>
          <PanelRow>
            <div style={{ width: '100%' }}>
              <RangeControl
                label={__('Columns (Desktop)', 'posts-picker')}
                value={columnsDesktop}
                onChange={(value) => setAttributes({ columnsDesktop: value })}
                min={1}
                max={6}
              />
            </div>
          </PanelRow>

          <PanelRow>
            <div style={{ width: '100%' }}>
              <RangeControl
                label={__('Columns (Tablet)', 'posts-picker')}
                value={columnsTablet}
                onChange={(value) => setAttributes({ columnsTablet: value })}
                min={1}
                max={4}
              />
            </div>
          </PanelRow>

          <PanelRow>
            <div style={{ width: '100%' }}>
              <RangeControl
                label={__('Columns (Mobile)', 'posts-picker')}
                value={columnsMobile}
                onChange={(value) => setAttributes({ columnsMobile: value })}
                min={1}
                max={2}
              />
            </div>
          </PanelRow>
        </>
      )}
    </PanelBody>
  )
}

export default PickerSettingsPanel
