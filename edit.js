import {
  useBlockProps,
  InnerBlocks,
  useEffect,
  CustomUniversityControls,
  ALLOWED_BLOCKS,
  TEMPLATE,
  applyJsClass,
  $
} from './scripts'

import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps()

  // Extract default values from attributes
  const {
    innerBlocksType = 'core/query',
    selectedPosts = [],
    postsPerPage = 6
  } = attributes

  // Function to update the inner query block
  const updateQueryBlock = (newSelectedPosts) => {
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
          postType: 'fit-university',
          perPage: newSelectedPosts.length > 0 ? newSelectedPosts.length : postsPerPage,
        }

        // Add or remove include parameter based on selected posts
        if (newSelectedPosts && newSelectedPosts.length > 0) {
          updatedQuery.include = newSelectedPosts.map(id => parseInt(id, 10))
        } else {
          delete updatedQuery.include
        }

        // Update the query block attributes
        updateBlockAttributes(queryBlock.clientId, {
          query: updatedQuery
        })
      }
    }
  }

  // Function to apply university variation
  const applyUniversityVariation = () => {
    const { dispatch, select } = wp.data
    const { replaceBlock } = dispatch('core/block-editor')
    const { getBlock } = select('core/block-editor')

    // Get the current block and its inner blocks
    const currentBlock = getBlock(clientId)
    if (currentBlock && currentBlock.innerBlocks.length > 0) {
      const queryBlock = currentBlock.innerBlocks[0]

      if (queryBlock && queryBlock.name === 'core/query') {
        // Get the university variation
        const { getBlockVariations } = select('core/blocks')
        const variations = getBlockVariations('core/query')
        const variation = variations.find(v => v.name === 'universities-variation')

        if (variation) {
          // Prepare query attributes
          const queryAttributes = {
            ...queryBlock.attributes.query,
            postType: 'fit-university',
            perPage: selectedPosts.length > 0 ? selectedPosts.length : postsPerPage
          }

          // Add selected posts if any
          if (selectedPosts.length > 0) {
            queryAttributes.include = selectedPosts.map(id => parseInt(id, 10))
          } else {
            delete queryAttributes.include
          }

          // Create new block with variation attributes
          const newBlock = wp.blocks.createBlock(
            'core/query',
            {
              ...queryBlock.attributes,
              ...variation.attributes,
              query: queryAttributes
            },
            variation.innerBlocks ? wp.blocks.createBlocksFromInnerBlocksTemplate(variation.innerBlocks) : queryBlock.innerBlocks
          )

          // Replace the old query block with the new one
          replaceBlock(queryBlock.clientId, newBlock)
        }
      }
    }
  }

  // Effect to update query block when selectedPosts changes
  useEffect(() => {
    if (selectedPosts && selectedPosts.length >= 0) {
      setTimeout(() => {
        updateQueryBlock(selectedPosts)
      }, 100)
    }
  }, [selectedPosts, clientId, postsPerPage])

  // Main useEffect for block initialization
  useEffect(() => {
    if (!attributes.blockId) {
      setAttributes({ blockId: `${clientId}-${Date.now()}` })
    }

    // Apply university variation and js class on initial load
    setTimeout(() => {
      applyUniversityVariation()
      applyJsClass(clientId, setAttributes)
    }, 500)

    // Set up a subscription to detect changes in inner blocks
    const unsubscribe = wp.data.subscribe(() => {
      const currentBlock = wp.data.select('core/block-editor').getBlock(clientId)
      if (currentBlock && currentBlock.innerBlocks.length > 0) {
        const innerBlock = currentBlock.innerBlocks[0]
        if (innerBlock && innerBlock.name !== attributes.innerBlocksType) {
          setAttributes({ innerBlocksType: innerBlock.name })
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [clientId, setAttributes, attributes, selectedPosts, postsPerPage])

  return (
    <div {...blockProps}>
      {/* Sidebar Controls */}
      <CustomUniversityControls
        attributes={attributes}
        setAttributes={setAttributes}
      />

      {/* Posts Container */}
      <div className="js-custom-university-query">
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
          template={TEMPLATE}
          templateLock={false}
        />
      </div>
    </div>
  )
}
