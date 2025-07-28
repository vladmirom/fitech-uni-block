/**
 * Scripts export file for the marker block
 *
 * Export all components for easy imports in edit.js
 */

// External Dependencies
export { useBlockProps, InnerBlocks, InspectorControls, PanelColorSettings } from '@wordpress/block-editor'
export { PanelBody, PanelRow, ToggleControl, RangeControl, Button, Notice, SelectControl, Spinner } from '@wordpress/components'
export { useEffect, useState, useCallback } from 'react'
export { __ } from '@wordpress/i18n'

// jQuery and Slick
export { default as $ } from 'jquery'
import 'slick-carousel/slick/slick'

// Internal Components
export { default as SliderControls } from './admin-controls/SliderControls'
export { default as SliderActivationPanel } from './admin-controls/SliderActivationPanel'
export { default as SliderSettingsPanel } from './admin-controls/SliderSettingsPanel'
export { default as QueryControlsPanel } from './admin-controls/QueryControlsPanel'
export { default as SliderArrows } from './components/SliderArrows'

// Custom Hooks
export { useSliderLogic } from './hooks/UseSliderLogic'
export { useSliderStyles } from './hooks/UseSliderStyles'

// Utilities
export { ALLOWED_BLOCKS, TEMPLATE, POST_TYPE_OPTIONS } from './utils/SliderConstants'
export { captureOriginalContent, applyJsSlideClass } from './utils/SliderHelpers'

// Icons
export { ReactComponent as arrowPrev } from '../icons/arrow-prev.svg'
export { ReactComponent as arrowNext } from '../icons/arrow-next.svg'

