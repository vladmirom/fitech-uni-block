import {
  useBlockProps,
  InnerBlocks,
  useEffect,
  SliderControls,
  SliderArrows,
  useSliderLogic,
  useSliderStyles,
  ALLOWED_BLOCKS,
  TEMPLATE,
  applyJsSlideClass,
  $
} from './scripts'
import './editor.scss'

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps()

  // Extract default values from attributes
  const {
    slidesToShow = 1,
    slidesToScroll = 1,
    arrows = false,
    arrowsColor,
    dots = true,
    dotsMainColor,
    dotsHoverColor,
    dotsActiveColor,
    infinite = true,
    autoplay = true,
    focusOnSelect = false,
    autoplaySpeed = 3000,
    isSliderActive = false,
    innerBlocksType = 'core/query',
    postType = 'post',
    selectedPosts = []
  } = attributes

  // Use custom hooks
  const {
    sliderInitialized,
    originalContent,
    initializeSlider,
    destroySlider
  } = useSliderLogic(attributes, setAttributes, clientId)

  useSliderStyles(sliderInitialized, clientId)

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
          postType: postType || 'post',
          // Convert selectedPosts array to numbers if they're strings
          include: newSelectedPosts.length > 0 ? newSelectedPosts.map(id => parseInt(id, 10)) : undefined,
          // If we have specific posts, we might want to remove other restrictions
          perPage: newSelectedPosts.length > 0 ? newSelectedPosts.length : currentQuery.perPage,
        }

        // Remove include if no posts are selected
        if (newSelectedPosts.length === 0) {
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

  // Effect to update query block when selectedPosts changes
  useEffect(() => {
    if (selectedPosts && selectedPosts.length >= 0) {
      // Small delay to ensure the inner blocks are ready
      setTimeout(() => {
        updateQueryBlock(selectedPosts)
      }, 100)
    }
  }, [selectedPosts, postType, clientId])

  // Main useEffect for block initialization and cleanup
  useEffect(() => {
    if (!attributes.blockId) {
      setAttributes({ blockId: `${clientId}-${Date.now()}` })
    }

    // Apply js-slide class on initial load
    setTimeout(() => applyJsSlideClass(clientId, setAttributes), 500)

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

    // If slider was active in a previous session, re-initialize it
    if (isSliderActive && !sliderInitialized) {
      setTimeout(() => {
        console.log('Auto-initializing slider based on saved state')
        initializeSlider()
      }, 1000)
    }

    return () => {
      // Clean up subscription
      unsubscribe()

      // Remove overlay
      const overlayId = `slider-overlay-${clientId}`
      const overlay = document.getElementById(overlayId)
      if (overlay) {
        overlay.remove()
      }

      // Safely destroy slick when component unmounts if initialized
      if (sliderInitialized) {
        try {
          const $sliderContainer = $('.js-slide-container')
          if ($sliderContainer.length && $sliderContainer.hasClass('slick-initialized')) {
            $sliderContainer.slick('unslick')
          }

          const $postTemplate = $('.js-slide')
          if ($postTemplate.length && $postTemplate.hasClass('slick-initialized')) {
            $postTemplate.slick('unslick')
          }
        } catch (error) {
          console.error('Error cleaning up slider:', error)
        }
      }
    }
  }, [
    clientId,
    setAttributes,
    slidesToShow,
    slidesToScroll,
    infinite,
    dots,
    dotsMainColor,
    dotsHoverColor,
    dotsActiveColor,
    autoplay,
    autoplaySpeed,
    focusOnSelect,
    arrows,
    arrowsColor,
    sliderInitialized,
    isSliderActive,
    initializeSlider,
    originalContent,
    attributes
  ])

  return (
    <div {...blockProps}>
      {/* Sidebar Controls */}
      <SliderControls
        attributes={attributes}
        setAttributes={setAttributes}
        sliderInitialized={sliderInitialized}
        initializeSlider={initializeSlider}
        destroySlider={destroySlider}
      />

      {/* Slider Container */}
      <div className="js-slider">
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
          template={TEMPLATE}
          templateLock={false}
        />
      </div>

      {/* Slider Arrows */}
      <SliderArrows
        arrows={arrows}
        arrowsColor={arrowsColor}
        clientId={clientId}
      />
    </div>
  )
}
