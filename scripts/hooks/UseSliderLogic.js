/**
 * Manages slider functionality.
 *
 * @file UseSliderLogic.js
 */

import { useState, useCallback } from 'react'
import { $ } from '../index'
import { captureOriginalContent } from '../utils/SliderHelpers'

export const useSliderLogic = (attributes, setAttributes, clientId) => {
  const {
    slidesToShow,
    slidesToScroll,
    arrows,
    dots,
    infinite,
    autoplay,
    focusOnSelect,
    autoplaySpeed,
    isSliderActive
  } = attributes

  // State to track if the slider is currently initialized.
  const [sliderInitialized, setSliderInitialized] = useState(isSliderActive)
  // Store original content to restore when needed
  const [originalContent, setOriginalContent] = useState(null)

  // Initialize the slick slider in editor.
  const initializeSlider = useCallback(() => {
    if (!sliderInitialized) {
      try {
        console.log('Trying to initialize slider...')

        // Capture original content before modifying
        if (!originalContent) {
          captureOriginalContent(setOriginalContent)
        }

        // In WordPress editor, the actual posts are inside the js-slide-container
        // The post-template is what we need to target for the slider
        const $postTemplate = $('.js-slide')

        if ($postTemplate.length) {
          console.log('Found post template with class js-slide')

          // Add title to links explaining they're inactive
          $postTemplate.find('a').each(function() {
            $(this).attr('title', 'Links are inactive in the editor')
          })

          // Initialize the slider on the post-template
          $postTemplate.slick({
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            arrows: arrows,
            dots: dots,
            infinite: infinite,
            autoplay: autoplay,
            focusOnSelect: focusOnSelect,
            autoplaySpeed: autoplaySpeed
          })

          console.log('Slick initialized successfully on post template')
        } else {
          console.warn('Could not find post template with js-slide class')

          // Try to find the slide container instead as a fallback
          const $sliderContainer = $('.js-slide-container')
          if ($sliderContainer.length) {
            console.log('Found js-slide-container as fallback')

            // Add title to links explaining they're inactive
            $sliderContainer.find('a').each(function() {
              $(this).attr('title', 'Links are inactive in the editor')
            })

            $sliderContainer.slick({
              slidesToShow: slidesToShow,
              slidesToScroll: slidesToScroll,
              arrows: arrows,
              dots: dots,
              infinite: infinite,
              autoplay: autoplay,
              focusOnSelect: focusOnSelect,
              autoplaySpeed: autoplaySpeed
            })

            console.log('Slick initialized successfully on slide container')
          } else {
            console.error('Could not find any valid container for slick')
            throw new Error('No valid container found')
          }
        }
      } catch (error) {
        console.error('Error initializing slider:', error)
        alert('Could not initialize slider. Check console for details.')
        return
      }

      // Update state and attribute
      setSliderInitialized(true)
      setAttributes({ isSliderActive: true })
    }
  }, [
    sliderInitialized,
    originalContent,
    slidesToShow,
    slidesToScroll,
    arrows,
    dots,
    infinite,
    autoplay,
    focusOnSelect,
    autoplaySpeed,
    setAttributes
  ])

  // Destroy the slick slider in editor.
  const destroySlider = useCallback(() => {
    if (sliderInitialized) {
      try {
        console.log('Trying to destroy slider...')

        // Remove the overlay first
        const overlayId = `slider-overlay-${clientId}`
        const overlay = document.getElementById(overlayId)
        if (overlay) {
          overlay.remove()
        }

        // Store elements before destroying slider
        const $postTemplate = $('.js-slide')
        const $sliderContainer = $('.js-slide-container')

        // Create backup of current slider state
        let contentBackup = null

        // First try to get all visible slides (not clones)
        if ($('.slick-slide:not(.slick-cloned)').length) {
          contentBackup = $('.slick-track').clone()
          // Clean up slick classes
          contentBackup.find('.slick-slide').removeClass('slick-slide slick-active slick-current')
            .removeAttr('aria-hidden tabindex role style data-slick-index')
        }

        // Check if post template is slick-initialized
        if ($postTemplate.length && $postTemplate.hasClass('slick-initialized')) {
          console.log('Unslicking post template')
          $postTemplate.slick('unslick')
        }
        // Check if slide container is slick-initialized
        else if ($sliderContainer.length && $sliderContainer.hasClass('slick-initialized')) {
          console.log('Unslicking slide container')
          $sliderContainer.slick('unslick')
        }
        else {
          console.warn('No initialized slick slider found to destroy')
        }

        // Restore content from backup or original content
        setTimeout(() => {
          // Check if content disappeared
          const target = $postTemplate.length ? $postTemplate : $sliderContainer

          if (target.children().length === 0 || target.html() === '') {
            console.log('Content disappeared after unslicking, restoring...')

            // Restore from backup first if available
            if (contentBackup && contentBackup.children().length) {
              target.html(contentBackup.html())
              console.log('Restored from backup content')
            }
            // Fall back to original content
            else if (originalContent) {
              console.log('Restoring from original content')
              if (originalContent.element === 'js-slide' && $postTemplate.length) {
                $postTemplate.html(originalContent.content)
              } else if (originalContent.element === 'js-slide-container' && $sliderContainer.length) {
                $sliderContainer.html(originalContent.content)
              }
            }
          }

          // Force refresh the block UI
          wp.data.dispatch('core/block-editor').updateBlock(clientId,
            wp.data.select('core/block-editor').getBlock(clientId)
          )

          console.log('Block UI refreshed')
        }, 50)
      } catch (error) {
        console.error('Error destroying slider:', error)
        alert('Error stopping slider. Check console for details.')
      } finally {
        // Always update state and attribute
        setSliderInitialized(false)
        setAttributes({ isSliderActive: false })
      }
    }
  }, [sliderInitialized, clientId, originalContent, setAttributes])

  return {
    sliderInitialized,
    originalContent,
    initializeSlider,
    destroySlider
  }
}
