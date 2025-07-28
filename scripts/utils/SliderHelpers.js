/**
 * Different utulity functions.
 *
 * @file SliderHelpers.js
 */

import { $ } from '../index'

export const captureOriginalContent = (setOriginalContent) => {
  const $postTemplate = $('.js-slide')
  const $sliderContainer = $('.js-slide-container')

  if ($postTemplate.length) {
    const content = $postTemplate.html()
    if (content) {
      setOriginalContent({
        element: 'js-slide',
        content: content
      })
      console.log('Captured original content from post template')
      return true
    }
  } else if ($sliderContainer.length) {
    const content = $sliderContainer.html()
    if (content) {
      setOriginalContent({
        element: 'js-slide-container',
        content: content
      })
      console.log('Captured original content from slider container')
      return true
    }
  }

  console.warn('Could not capture original content')
  return false
}

export const applyJsSlideClass = (clientId, setAttributes) => {
  const currentBlock = wp.data.select('core/block-editor').getBlock(clientId)
  if (currentBlock && currentBlock.innerBlocks.length > 0) {
    const innerBlock = currentBlock.innerBlocks[0]

    // Store the inner block type
    if (innerBlock && innerBlock.name) {
      setAttributes({ innerBlocksType: innerBlock.name })
    }

    if (innerBlock && innerBlock.name === 'core/query') {
      // Find the post-template block
      const postTemplateBlock = innerBlock.innerBlocks.find(
        block => block.name === 'core/post-template'
      )

      if (postTemplateBlock && !postTemplateBlock.attributes.className?.includes('js-slide')) {
        // Add js-slide class to the post-template for slider functionality
        const newClassName = postTemplateBlock.attributes.className
          ? `${postTemplateBlock.attributes.className} js-slide`
          : 'js-slide'

        wp.data.dispatch('core/block-editor').updateBlockAttributes(
          postTemplateBlock.clientId,
          { className: newClassName }
        )
      }
    }
  }
}
