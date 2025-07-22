/**
 * Different utility functions for Custom Stories Query block.
 *
 * @file BlockHelpers.js
 */

export const applyJsClass = (clientId, setAttributes) => {
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

      if (postTemplateBlock && !postTemplateBlock.attributes.className?.includes('js-custom-universities')) {
        // Add js-custom-universities class to the post-template
        const newClassName = postTemplateBlock.attributes.className
          ? `${postTemplateBlock.attributes.className} js-custom-universities`
          : 'js-custom-universities'

        wp.data.dispatch('core/block-editor').updateBlockAttributes(
          postTemplateBlock.clientId,
          { className: newClassName }
        )
      }
    }
  }
}
