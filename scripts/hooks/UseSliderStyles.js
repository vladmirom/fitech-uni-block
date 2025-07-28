/**
 * Controls styling and overlays.
 *
 * @file UseSliderStyles.js
 */

import { useEffect } from '../index'

export const useSliderStyles = (sliderInitialized, clientId) => {
  // CSS for styled links and slider behavior
  useEffect(() => {
    const styleId = 'slider-disabled-link-style'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.innerHTML = `
        /* Links should always be non-clickable in the editor */
        .js-slide a, .js-slide-container a {
          pointer-events: none
          text-decoration: none
          color: inherit
        }

        /* Allow editor UI to be clickable */
        .components-panel button,
        .slider-activation-controls button,
        .slider-preview-controls button {
          pointer-events: auto !important
        }

        /* Overlay to catch clicks and prevent editor selection */
        .slider-overlay {
          position: absolute
          top: 0
          left: 0
          right: 0
          bottom: 0
          z-index: 100
          background: transparent
          cursor: default
        }

        /* Allow slider navigation UI elements to receive clicks */
        .slick-dots, .slick-arrow {
          position: relative
          z-index: 101 !important
          pointer-events: auto !important
        }

        /* Ensure slider container has position for overlay */
        .js-slider {
          position: relative
          min-height: 100px
        }
      `
      document.head.appendChild(style)
    }

    return () => {
      // Clean up style when component unmounts
      const styleElement = document.getElementById(styleId)
      if (styleElement) {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  // Create and manage the overlay element
  useEffect(() => {
    // Only add overlay when slider is initialized
    if (sliderInitialized) {
      const overlayId = `slider-overlay-${clientId}`

      // Remove any existing overlay first
      const existingOverlay = document.getElementById(overlayId)
      if (existingOverlay) {
        existingOverlay.remove()
      }

      // Create and append the overlay
      const overlay = document.createElement('div')
      overlay.id = overlayId
      overlay.className = 'slider-overlay'

      // Add click handler that does nothing but prevents propagation
      overlay.addEventListener('click', (e) => {
        // Allow click to propagate only for slider controls
        if (!e.target.closest('.slick-dots') && !e.target.closest('.slick-arrow')) {
          e.stopPropagation()
          e.preventDefault()
        }
      })

      // Append overlay to slider container
      const sliderContainer = document.querySelector(`.js-slider`)
      if (sliderContainer) {
        sliderContainer.appendChild(overlay)
      }

      return () => {
        // Clean up overlay on effect cleanup
        const overlay = document.getElementById(overlayId)
        if (overlay) {
          overlay.remove()
        }
      }
    }
  }, [sliderInitialized, clientId])
}
