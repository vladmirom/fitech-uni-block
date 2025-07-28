/**
 * Different utility functions.
 *
 * @file PickerHelpers.js
 */

export const updateQueryBlock = (clientId, selectedPosts, postType, setAttributes) => {
  const { dispatch, select } = wp.data
  const { updateBlockAttributes } = dispatch('core/block-editor')
  const { getBlock } = select('core/block-editor')

  // Get the current block and its inner blocks
  const currentBlock = getBlock(clientId)
  if (currentBlock && currentBlock.innerBlocks.length > 0) {
    const queryBlock = currentBlock.innerBlocks[0]

    if (queryBlock && queryBlock.name === 'core/query') {
      const currentQuery = queryBlock.attributes.query || {}

      // Update the query with selected post IDs
      const updatedQuery = {
        ...currentQuery,
        postType: postType || 'post',
        // Convert selectedPosts array to numbers if they're strings
        include: selectedPosts.length > 0 ? selectedPosts.map(id => parseInt(id, 10)) : undefined,
        // If we have specific posts, we might want to remove other restrictions
        perPage: selectedPosts.length > 0 ? selectedPosts.length : currentQuery.perPage,
      }

      // Remove include if no posts are selected
      if (selectedPosts.length === 0) {
        delete updatedQuery.include
      }

      console.log('Updating query block with:', updatedQuery)

      // Update the query block attributes
      updateBlockAttributes(queryBlock.clientId, {
        query: updatedQuery
      })
    }
  }
}

export const applyPickerClass = (clientId, setAttributes) => {
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

      if (postTemplateBlock && !postTemplateBlock.attributes.className?.includes('posts-picker-grid')) {
        // Add posts-picker-grid class to the post-template
        const newClassName = postTemplateBlock.attributes.className
          ? `${postTemplateBlock.attributes.className} posts-picker-grid`
          : 'posts-picker-grid'

        wp.data.dispatch('core/block-editor').updateBlockAttributes(
          postTemplateBlock.clientId,
          { className: newClassName }
        )
      }
    }
  }
}
