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
 * @function registerUniversitiesLoopVariation
 * @returns {void}
 *
 */
export const registerUniversitiesLoopVariation = () => {
  // Custom icon.
  const UniversitiesVariationIcon = createElement(
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
        y: 20,
        width: 8,
        height: 2,
        fill: 'black'
      }),
      createElement('rect', {
        key: 'rect2',
        x: 20,
        y: 33,
        width: 8,
        height: 2,
        fill: 'black'
      }),
      createElement('rect', {
        key: 'rect3',
        x: 20,
        y: 13,
        width: 20,
        height: 3,
        fill: 'black'
      }),
      createElement('rect', {
        key: 'rect4',
        x: 20,
        y: 26,
        width: 20,
        height: 3,
        fill: 'black'
      }),
      createElement('rect', {
        key: 'rect5',
        x: 7,
        y: 13,
        width: 11,
        height: 9,
        fill: 'black'
      }),
      createElement('rect', {
        key: 'rect6',
        x: 7,
        y: 26,
        width: 11,
        height: 9,
        fill: 'black'
      })
    ]
  );

  registerBlockVariation(
    'core/query',
    {
      name: 'universities-variation',
      title: 'Universities',
      description: 'Displays image, title, and link for universities layout style',
      icon: UniversitiesVariationIcon,
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
              ['core/read-more', {
                content: 'Read More',
                linkTarget: '_self'
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

export default registerUniversitiesLoopVariation
