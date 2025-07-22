/**
 * Block variations for Custom Stories Query block.
 *
 * @file BlockVariations.js
 */

const { registerBlockVariation } = wp.blocks;
const { createElement } = wp.element;
const { __ } = wp.i18n;

/**
 * Registers a custom block variation for the 'core/query' block.
 *
 * This variation displays a layout with an image, title, and excerpt.
 *
 * @function registerStoriesLoopVariation
 * @returns {void}
 *
 */
export const registerStoriesLoopVariation = () => {
  // Custom icon.
  const StoriesVariationIcon = createElement(
    'svg',
    {
      width: 48,
      height: 48,
      viewBox: '0 0 48 48',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    [
      createElement('rect', {
        key: 'rect1',
        x: 20,
        y: 18,
        width: 17,
        height: 1,
      }),
      createElement('rect', {
        key: 'rect2',
        x: 20,
        y: 21,
        width: 20,
        height: 1,
      }),
      createElement('rect', {
        key: 'rect3',
        x: 20,
        y: 31,
        width: 17,
        height: 1,
      }),
      createElement('rect', {
        key: 'rect4',
        x: 20,
        y: 34,
        width: 20,
        height: 1,
      }),
      createElement('rect', {
        key: 'rect5',
        x: 20,
        y: 13,
        width: 20,
        height: 3,
      }),
      createElement('rect', {
        key: 'rect6',
        x: 20,
        y: 26,
        width: 20,
        height: 3,
      }),
      createElement('rect', {
        key: 'rect7',
        x: 7,
        y: 13,
        width: 11,
        height: 9,
      }),
      createElement('rect', {
        key: 'rect8',
        x: 7,
        y: 26,
        width: 11,
        height: 9,
      })
    ]
  );

  registerBlockVariation(
    'core/query',
    {
      name: 'stories-variation',
      title: 'Stories',
      description: 'Displays image, title, and excerpt for stories layout style',
      icon: StoriesVariationIcon,
      innerBlocks: [
        ['core/post-template', {}, [
          ['core/columns', {}, [
            ['core/column', { width: '25%' }, [
              ['core/post-featured-image', {
                isLink: false
              }]
            ]],
            ['core/column', { width: '75%' }, [
              ['core/post-title', {
                level: 4,
                isLink: false
              }],
              ['core/post-excerpt', {
                showMoreOnNewLine: false,
                moreText: '',
                excerptLength: 20
              }]
            ]]
          ]]
        ]]
      ],
      scope: ['block'],
      isDefault: false
    }
  );
}

export default registerStoriesLoopVariation
