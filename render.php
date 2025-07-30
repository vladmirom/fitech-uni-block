<?php
/**
 * Server rendering of the block.
 * @var $attributes array of the attributes that come from the block.
 * @var $content string The block inner content.
 */

$selectedPosts = $attributes['selectedPosts'] ?? [];
$postType = $attributes['postType'] ?? 'post';
$displayLayout = $attributes['displayLayout'] ?? 'grid';
$columnsDesktop = $attributes['columnsDesktop'] ?? 3;
$columnsTablet = $attributes['columnsTablet'] ?? 2;
$columnsMobile = $attributes['columnsMobile'] ?? 1;

$block_id = $attributes['blockId'] ?? wp_unique_id('block-');

$block_wrapper = get_block_wrapper_attributes(
	array(
			'class' => 'posts-picker-container',
			'id' => $block_id,
			'data-columns-desktop' => $columnsDesktop,
			'data-columns-tablet' => $columnsTablet,
			'data-columns-mobile' => $columnsMobile
	)
);

// Only use custom query if we have selected posts, otherwise use the inner content
$use_custom_query = !empty($selectedPosts);
?>

<style>
    #<?php echo $block_id; ?> .wp-block-valve-posts-picker__picker {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(<?php echo $columnsMobile; ?>, 1fr);
    }

    @media (min-width: 768px) {
        #<?php echo $block_id; ?> .wp-block-valve-posts-picker__picker {
            grid-template-columns: repeat(<?php echo $columnsTablet; ?>, 1fr);
        }
    }

    @media (min-width: 1024px) {
        #<?php echo $block_id; ?> .wp-block-valve-posts-picker__picker {
            grid-template-columns: repeat(<?php echo $columnsDesktop; ?>, 1fr);
        }
    }
</style>

<div <?php echo $block_wrapper; ?>>
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
            <div class="posts-picker-grid wp-block-valve-posts-picker__picker">
                <?php while ($custom_query->have_posts()) : $custom_query->the_post(); ?>
                    <article class="wp-block-valve-posts-picker__post wp-block-post post-<?php echo get_the_ID(); ?> <?php echo get_post_type(); ?>">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="wp-block-post-featured-image">
                                <figure class="wp-block-valve-posts-picker__image">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('medium_large'); ?>
                                    </a>
                                </figure>
                            </div>
                        <?php endif; ?>

                        <div class="wp-block-valve-posts-picker__content">
                            <h3 class="wp-block-valve-posts-picker__title wp-block-post-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h3>

                            <div class="wp-block-valve-posts-picker__excerpt wp-block-post-excerpt">
                                <p class="wp-block-post-excerpt__text">
                                    <?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?>
                                </p>
                            </div>

                            <div class="wp-block-valve-posts-picker__meta">
                                <time class="wp-block-post-date" datetime="<?php echo get_the_date('c'); ?>">
                                    <?php echo get_the_date(); ?>
                                </time>
                            </div>

                            <div class="wp-block-button">
                                <a class="wp-block-valve-posts-picker__button wp-block-button__link wp-element-button" href="<?php the_permalink(); ?>">
                                    <?php echo __('Read More', 'posts-picker'); ?>
                                </a>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
        <?php else : ?>
            <p><?php echo __('No posts found.', 'posts-picker'); ?></p>
        <?php endif; ?>

        <?php wp_reset_postdata(); ?>

    <?php else : ?>
        <?php // Use the inner content (Query block) if no specific posts selected ?>
        <?php echo $content; ?>
    <?php endif; ?>

</div>
