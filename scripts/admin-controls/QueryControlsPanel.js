/**
 * Query settings controls.
 *
 * @file QueryControlsPanel.js
 */

import { PanelBody, PanelRow, SelectControl, Button, Spinner, __ } from '../index'
import { useState, useEffect } from 'react'
import { FALLBACK_POST_TYPE_OPTIONS } from '../utils/SliderConstants'

const QueryControlsPanel = ({ attributes, setAttributes }) => {
  const { postType, postId, selectedPosts = [] } = attributes
  const [postTypeOptions, setPostTypeOptions] = useState([])
  const [postIdsOptions, setPostIdOptions] = useState([])
  const [allPostTypesIds, setAllPostTypesIds] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Debug logging
  console.log('Current attributes:', attributes)
  console.log('Selected posts:', selectedPosts)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/wp-json/valve/v1/blocks/')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Handle post types
        if (data.postTypes) {
          const postTypeOptions = Object.entries(data.postTypes).map(([value, label]) => ({
            label: label,
            value: value
          }))
          setPostTypeOptions(postTypeOptions)
        } else {
          throw new Error('Post types not found in API response')
        }

        // Store all post types IDs for later use
        if (data.postTypesIds) {
          setAllPostTypesIds(data.postTypesIds)
        }

      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message)
        // Fallback to default options if API fails
        setPostTypeOptions(FALLBACK_POST_TYPE_OPTIONS)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update post IDs options when postType changes
  useEffect(() => {
    if (postType && allPostTypesIds[postType]) {
      const postIdsForType = allPostTypesIds[postType]
      const options = Object.entries(postIdsForType).map(([value, label]) => ({
        label: label,
        value: value
      }))
      setPostIdOptions(options)

      // Clear the postId if it's not valid for the new post type
      if (postId && !postIdsForType[postId]) {
        setAttributes({ postId: '' })
      }
    } else {
      setPostIdOptions([])
      if (postId) {
        setAttributes({ postId: '' })
      }
    }
  }, [postType, allPostTypesIds, postId, setAttributes])

  const handlePostTypeChange = (value) => {
    setAttributes({
      postType: value,
      postId: '' // Clear postId when post type changes
    })
  }

  const handlePostIdChange = (value) => {
    setAttributes({ postId: value })
  }

  const handleAddPost = () => {
    if (!postId || selectedPosts.includes(postId)) {
      return // Don't add if no post selected or already in list
    }

    const updatedSelectedPosts = [...selectedPosts, postId]

    // Debug logging
    console.log('Adding post ID:', postId)
    console.log('Updated selectedPosts:', updatedSelectedPosts)

    setAttributes({
      selectedPosts: updatedSelectedPosts,
      postId: '' // Clear selection after adding
    })
  }

  const handleRemovePost = (postIdToRemove) => {
    const updatedSelectedPosts = selectedPosts.filter(id => id !== postIdToRemove)
    setAttributes({ selectedPosts: updatedSelectedPosts })
  }

  const getPostTitle = (postId) => {
    if (postType && allPostTypesIds[postType] && allPostTypesIds[postType][postId]) {
      return allPostTypesIds[postType][postId]
    }
    return `Post ID: ${postId}` // Fallback if title not found
  }

  const isPostAlreadySelected = postId && selectedPosts.includes(postId)

  return (
    <PanelBody title={__('Query Controls', 'slider-posts')}>
      <PanelRow>
        <div style={{ width: '100%' }}>
          {isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Spinner />
              <span>{__('Loading post types...', 'slider-posts')}</span>
            </div>
          ) : (
            <>
              <SelectControl
                label={__('Post type', 'slider-posts')}
                value={postType}
                options={[
                  { label: __('Select post type', 'slider-posts'), value: '' },
                  ...postTypeOptions
                ]}
                onChange={handlePostTypeChange}
                help={error ? __('Using fallback options due to API error', 'slider-posts') : null}
              />

              <div style={{ marginBottom: '16px' }}>
                <SelectControl
                  label={__(`Select your ${postType || 'post'}`, 'slider-posts')}
                  value={postId}
                  options={[
                    { label: __('Select Post', 'slider-posts'), value: '' },
                    ...postIdsOptions
                  ]}
                  onChange={handlePostIdChange}
                  help={postIdsOptions.length === 0 && postType ? __('No items available for this post type', 'slider-posts') : null}
                />

                <div style={{ marginTop: '8px' }}>
                  <Button
                    variant="primary"
                    onClick={handleAddPost}
                    disabled={!postId || isPostAlreadySelected}
                    style={{ marginRight: '8px' }}
                  >
                    {isPostAlreadySelected
                      ? __('Already Added', 'slider-posts')
                      : __('Add Post', 'slider-posts')
                    }
                  </Button>
                  {isPostAlreadySelected && (
                    <span style={{ color: '#666', fontSize: '12px' }}>
                      {__('This post is already in your selection', 'slider-posts')}
                    </span>
                  )}
                </div>
              </div>

              {selectedPosts.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
                    {__('Selected Posts:', 'slider-posts')}
                  </h4>
                  <div style={{
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}>
                    {selectedPosts.map((selectedPostId, index) => (
                      <div
                        key={selectedPostId}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          borderBottom: index < selectedPosts.length - 1 ? '1px solid #eee' : 'none',
                          backgroundColor: '#fafafa'
                        }}
                      >
                        <span style={{
                          flex: 1,
                          fontSize: '13px',
                          color: '#333'
                        }}>
                          {getPostTitle(selectedPostId)}
                        </span>
                        <Button
                          variant="tertiary"
                          isDestructive
                          onClick={() => handleRemovePost(selectedPostId)}
                          style={{
                            minWidth: 'auto',
                            padding: '4px 8px',
                            fontSize: '12px',
                            lineHeight: '1'
                          }}
                          aria-label={__('Remove post', 'slider-posts')}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                    {__(`${selectedPosts.length} post(s) selected`, 'slider-posts')}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </PanelRow>
    </PanelBody>
  )
}

export default QueryControlsPanel
