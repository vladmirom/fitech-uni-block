/**
 * Query settings controls for Custom Universities Query block.
 *
 * @file QueryControlsPanel.js
 */

import { PanelBody, PanelRow, SelectControl, Button, Spinner, __ } from '../index'
import { useState, useEffect } from 'react'

const QueryControlsPanel = ({ attributes, setAttributes }) => {
  const { postId, selectedPosts = [] } = attributes
  const [postIdsOptions, setPostIdsOptions] = useState([])
  const [allPostTypesIds, setAllPostTypesIds] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/wp-json/valve/v1/blocks/')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Store all post types IDs for later use
        if (data.postTypesIds) {
          setAllPostTypesIds(data.postTypesIds)
        }

      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update post IDs options when data is loaded
  useEffect(() => {
    if (allPostTypesIds['fit-university']) {
      const postIdsForType = allPostTypesIds['fit-university']
      const options = Object.entries(postIdsForType).map(([value, label]) => ({
        label: label,
        value: value
      }))
      setPostIdsOptions(options)

      // Clear the postId if it's not valid for fit-university
      if (postId && !postIdsForType[postId]) {
        setAttributes({ postId: '' })
      }
    } else {
      setPostIdsOptions([])
      if (postId) {
        setAttributes({ postId: '' })
      }
    }
  }, [allPostTypesIds, postId, setAttributes])

  const handlePostIdChange = (value) => {
    setAttributes({ postId: value })
  }

  const handleAddPost = () => {
    if (!postId || selectedPosts.includes(postId)) {
      return // Don't add if no post selected or already in list
    }

    const updatedSelectedPosts = [...selectedPosts, postId]
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
    if (allPostTypesIds['fit-university'] && allPostTypesIds['fit-university'][postId]) {
      return allPostTypesIds['fit-university'][postId]
    }
    return `Post ID: ${postId}` // Fallback if title not found
  }

  const isPostAlreadySelected = postId && selectedPosts.includes(postId)

  return (
    <PanelBody title={__('Query Controls', 'fitech-theme')}>
      <PanelRow>
        <div style={{ width: '100%' }}>
          {isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Spinner />
              <span>{__('Loading universities...', 'fitech-theme')}</span>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '16px' }}>
                <SelectControl
                  label={__('Select your university', 'fitech-theme')}
                  value={postId}
                  options={[
                    { label: __('Select University', 'fitech-theme'), value: '' },
                    ...postIdsOptions
                  ]}
                  onChange={handlePostIdChange}
                  help={postIdsOptions.length === 0 ? __('No universities available', 'fitech-theme') : null}
                />

                <div style={{ marginTop: '8px' }}>
                  <Button
                    variant="primary"
                    onClick={handleAddPost}
                    disabled={!postId || isPostAlreadySelected}
                    style={{ marginRight: '8px' }}
                  >
                    {isPostAlreadySelected
                      ? __('Already Added', 'fitech-theme')
                      : __('Add University', 'fitech-theme')
                    }
                  </Button>
                  {isPostAlreadySelected && (
                    <span style={{ color: '#666', fontSize: '12px' }}>
                      {__('This university is already in your selection', 'fitech-theme')}
                    </span>
                  )}
                </div>
              </div>

              {selectedPosts.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
                    {__('Selected Universities:', 'fitech-theme')}
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
                          aria-label={__('Remove university', 'fitech-theme')}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                    {__(`${selectedPosts.length} university(s) selected`, 'fitech-theme')}
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
