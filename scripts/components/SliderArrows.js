/**
 * Controls arrow components for front-end.
 *
 * @file UseSliderStyles.js
 */

import { arrowPrev, arrowNext } from '../index'

// Create a wrapper component that adds necessary attributes for the icon
const Arrow = ({ SvgIcon, color }) => (
  <SvgIcon
    width="24"
    height="24"
    viewBox="0 0 448 512"
    fill={color}
  />
)

const SliderArrows = ({ arrows, arrowsColor, clientId }) => {
  if (!arrows) return null

  return (
    <div className="slick-arrows__wrap">
      <button className={`slick-arrow prev-arrow prev-arrow-${clientId}-${Date.now()}`}>
        <Arrow SvgIcon={arrowPrev} color={arrowsColor} />
      </button>

      <button className={`slick-arrow next-arrow next-arrow-${clientId}-${Date.now()}`}>
        <Arrow SvgIcon={arrowNext} color={arrowsColor} />
      </button>
    </div>
  )
}

export default SliderArrows
