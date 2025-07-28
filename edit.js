import {
  useBlockProps,
  InnerBlocks,
  useEffect,
  PickerControls,
  ALLOWED_BLOCKS,
  TEMPLATE,
  updateQueryBlock,
  applyPickerClass
} from './scripts'
import './editor.scss'

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps()

  // Extract default values from attributes
  const {
    innerBlocksType = 'core/query',
    postType = 'post',
    selectedPosts = [],
    displayLayout = 'grid',
    columnsDesktop = 3,
    columnsTablet = 2,
    columnsMobile = 1
  } = attributes

  // Effect to update query block when selectedPosts changes
  useEffect(() => {
    if (selectedPosts && selectedPosts.length >= 0) {
      // Small delay to ensure the inner blocks are ready
      setTimeout(() => {
        updateQueryBlock(clientId, selectedPosts, postType, setAttributes)
      }, 100)
    }
  }, [selectedPosts, postType, clientId])

  // Main useEffect for block initialization and cleanup
  useEffect(() => {
    if (!attributes.blockId) {
      setAttributes({ blockId: `${clientId}-${Date.now()}` })
    }

    // Apply picker class on initial load
    setTimeout(() => applyPickerClass(clientId, setAttributes), 500)

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
      // Clean up subscription
      unsubscribe()
    }
  }, [
    clientId,
    setAttributes,
    displayLayout,
    columnsDesktop,
    columnsTablet,
    columnsMobile,
    attributes
  ])

  const gridClasses = `posts-picker-grid columns-desktop-${columnsDesktop} columns-tablet-${columnsTablet} columns-mobile-${columnsMobile} layout-${displayLayout}`

  return (
    <div {...blockProps}>
      {/* Sidebar Controls */}
      <PickerControls
        attributes={attributes}
        setAttributes={setAttributes}
      />

      {/* Posts Picker Container */}
      <div className={`posts-picker-container ${gridClasses}`}>
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
          template={TEMPLATE}
          templateLock={false}
        />
      </div>
    </div>
  )
}
