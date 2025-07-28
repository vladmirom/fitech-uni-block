<?php
/**
 * Server rendering of the block.
 * @var $attributes array of the attributes that come from the block.
 * @var $content string The block inner content.
 */

$selectedPosts = $attributes['selectedPosts'] ?? [];
$postType = $attributes['postType'] ?? 'post';
$arrows = $attributes['arrows'] ?? false;
$arrowsColor = $attributes['arrowsColor'] ?? '#000000';
$dots = $attributes['dots'] ?? false;
$dotsMainColor = $attributes['dotsMainColor'] ?? '#000000';
$dotsHoverColor = $attributes['dotsHoverColor'] ?? '#000000';
$dotsActiveColor = $attributes['dotsActiveColor'] ?? '#D3D3D3';

$block_id = $attributes['blockId'] ?? wp_unique_id('block-');

// Prepare attributes for JavaScript
$js_attributes = array(
	'blockId' => $block_id,
	'slidesToShow' => $attributes['slidesToShow'] ?? 3,
	'slidesToScroll' => $attributes['slidesToScroll'] ?? 1,
	'arrows' => $arrows,
	'dots' => $dots,
	'infinite' => $attributes['infinite'] ?? false,
	'autoplay' => $attributes['autoplay'] ?? false,
	'focusOnSelect' => $attributes['focusOnSelect'] ?? false,
	'autoplaySpeed' => $attributes['autoplaySpeed'] ?? 5000,
	'innerBlocksType' => $attributes['innerBlocksType'] ?? 'core/query',
	'isSliderActive' => $attributes['isSliderActive'] ?? false
);

$block_wrapper = get_block_wrapper_attributes(
	array(
			'class' => 'js-slider',
			'id' => $block_id,
			'data-block-attributes' => wp_json_encode($js_attributes)
	)
);

// Get arrow icons
$prev_icon = '';
$next_icon = '';
$prev_icon_path = get_template_directory() . '/blocks/src/slider-posts/icons/arrow-prev.svg';
$next_icon_path = get_template_directory() . '/blocks/src/slider-posts/icons/arrow-next.svg';

if (file_exists($prev_icon_path)) {
    $prev_icon = file_get_contents($prev_icon_path);
}
if (file_exists($next_icon_path)) {
    $next_icon = file_get_contents($next_icon_path);
}

// Only use custom query if we have selected posts, otherwise use the inner content
$use_custom_query = !empty($selectedPosts);
?>

<style>
    #<?php echo $block_id; ?> .slick-dots li button::before {
        color: <?php echo $dotsMainColor; ?>;
    }
    #<?php echo $block_id; ?> .slick-dots li button:hover::before {
        color: <?php echo $dotsHoverColor; ?>;
    }
    #<?php echo $block_id; ?> .slick-dots li.slick-active button::before {
        color: <?php echo $dotsActiveColor; ?>;
    }
    .prev-arrow-<?php echo $block_id; ?>,
    .next-arrow-<?php echo $block_id; ?> {
        fill: <?php echo $arrowsColor; ?>;
    }
</style>

<div <?php echo $block_wrapper; ?>>
    <?php if ($arrows) : ?>
        <div class="slick-arrows__wrap">
            <button class="slick-arrow prev-arrow prev-arrow-<?php echo $block_id; ?> slick-disabled">
                <?php echo $prev_icon; ?>
            </button>
            <button class="slick-arrow next-arrow next-arrow-<?php echo $block_id; ?>">
                <?php echo $next_icon; ?>
            </button>
        </div>
    <?php endif; ?>

    <?php if ($use_custom_query) : ?>
        <?php
        // Custom query for selected posts
        $query_args = array(
            'post_type' => $postType,
            'post_status' => 'publish',
            'post__in' => array_map('intval', $selectedPosts),
            'orderby' => 'post__in', // Maintain the order of selected posts
            'posts_per_page' => count($selectedPosts),
        );

        $custom_query = new WP_Query($query_args);
        ?>

        <?php if ($custom_query->have_posts()) : ?>
            <ul class="wp-block-valve-slider-posts__slider wp-block-post-template is-layout-grid wp-block-post-template-is-layout-grid">
                <?php while ($custom_query->have_posts()) : $custom_query->the_post(); ?>
                    <li class="wp-block-valve-slider-posts__post wp-block-post post-<?php echo get_the_ID(); ?> <?php echo get_post_type(); ?>">
                        <div class="wp-block-post-featured-image">
                            <?php if (has_post_thumbnail()) : ?>
                                <figure class="wp-block-valve-slider-posts__image wp-block-post-featured-image">
                                  	<?php the_post_thumbnail('header-posts'); ?>
                                </figure>
                            <?php endif; ?>
                        </div>

                        <h5 class="wp-block-valve-slider-posts__title wp-block-post-title has-link">
                          	<?php the_title(); ?>
                        </h5>

                        <div class="wp-block-valve-slider-posts__excerpt wp-block-post-excerpt">
                            <p class="wp-block-post-excerpt__text">
                                <?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?>
                            </p>
                        </div>

												<div class="wp-block-button is-style-secondary-outline is-style-sesal-outline-icon">
													<a class="wp-block-valve-slider-posts__button wp-block-button__link wp-element-button" href="<?php the_permalink(); ?>" target="_self">
														<?php echo __( 'Explore', 'jankaresort-theme'); ?>
													</a>
												</div>

                    </li>
                <?php endwhile; ?>
            </ul>
        <?php else : ?>
            <p>No posts found.</p>
        <?php endif; ?>

        <?php wp_reset_postdata(); ?>

    <?php else : ?>
        <?php // Use the inner content (Query block) if no specific posts selected ?>
        <?php echo $content; ?>
    <?php endif; ?>

</div>
