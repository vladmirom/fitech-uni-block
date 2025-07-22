<?php
/**
 * Server rendering of the block.
 * @var $attributes array of the attributes that come from the block.
 * @var $content string The block inner content.
 */

$selectedPosts = $attributes['selectedPosts'] ?? [];
$showExcerpt = $attributes['showExcerpt'] ?? true;
$showFeaturedImage = $attributes['showFeaturedImage'] ?? true;

$block_wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-valve-custom-stories-query'
	)
);

// Only use custom query if we have selected posts, otherwise use the inner content
$use_custom_query = !empty($selectedPosts);
?>

<div <?php echo $block_wrapper; ?>>
    <?php if ($use_custom_query) : ?>
        <?php
        // Custom query for selected posts
        $query_args = array(
            'post_type' => 'fit-story',
            'post_status' => 'publish',
            'post__in' => array_map('intval', $selectedPosts),
            'orderby' => 'post__in',
            'posts_per_page' => count($selectedPosts),
        );

        $custom_query = new WP_Query($query_args);
        ?>

        <?php if ($custom_query->have_posts()) : ?>
            <?php while ($custom_query->have_posts()) : $custom_query->the_post(); ?>

							<article class="wp-block-valve-custom-stories-query__post">
								<div class="wp-block-valve-custom-stories-query__image">
									<?php if ($showFeaturedImage && has_post_thumbnail()) : ?>
										<figure>
											<?php the_post_thumbnail('md'); ?>
										</figure>
									<?php endif; ?>
								</div>
								<div class="wp-block-valve-custom-stories-query__content">
									<h3 class="wp-block-valve-custom-stories-query__title">
										<?php the_title(); ?>
									</h3>

									<?php if ($showExcerpt) : ?>
										<div class="wp-block-valve-custom-stories-query__excerpt">
											<p><?php echo wp_trim_words(get_the_excerpt(), 40, '...'); ?></p>
										</div>
									<?php endif; ?>
								</div>
							</article>

            <?php endwhile; ?>
        <?php else : ?>
            <p><?php echo __('No posts found.', 'fitech-theme'); ?></p>
        <?php endif; ?>

        <?php wp_reset_postdata(); ?>

    <?php else : ?>
        <?php echo $content; ?>
    <?php endif; ?>
</div>
