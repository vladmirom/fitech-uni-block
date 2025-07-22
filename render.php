<?php
/**
 * Server rendering of the block.
 * @var $attributes array of the attributes that come from the block.
 * @var $content string The block inner content.
 * @var $block WP_Block_Parser_Block The parsed block object.
 */

// Load the autoloader
require_once __DIR__ . '/lib/autoload.php';

// Import the helper class
use FitechTheme\CustomUniversitiesQuery\Helpers\UniversityHelpers;

$selectedPosts = $attributes['selectedPosts'] ?? [];
$postsPerPage = $attributes['postsPerPage'] ?? 6;

$block_wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-valve-custom-universities-query'
	)
);

// Only use custom query if we have selected posts
$use_custom_query = !empty($selectedPosts);
?>

<div <?php echo $block_wrapper; ?>>
    <?php if ($use_custom_query) : ?>
        <?php
        // Custom query for selected posts - FIXED: Proper ordering
        $query_args = array(
            'post_type' => 'fit-university',
            'post_status' => 'publish',
            'post__in' => array_map('intval', $selectedPosts),
            'orderby' => 'post__in', // This should preserve the order of the post__in array
            'posts_per_page' => count($selectedPosts),
        );

        // FALLBACK: If post__in orderby doesn't work, use a custom solution
        $custom_query = new WP_Query($query_args);

        // If WordPress doesn't respect post__in order, we'll manually sort
        if ($custom_query->have_posts()) {
            $posts = $custom_query->posts;

            // Create a mapping of post IDs to their selected order
            $order_map = array_flip($selectedPosts);

            // Sort posts according to the selectedPosts order
            usort($posts, function($a, $b) use ($order_map) {
                $pos_a = isset($order_map[$a->ID]) ? $order_map[$a->ID] : PHP_INT_MAX;
                $pos_b = isset($order_map[$b->ID]) ? $order_map[$b->ID] : PHP_INT_MAX;
                return $pos_a - $pos_b;
            });

            // Update the query object with sorted posts
            $custom_query->posts = $posts;
            $custom_query->post_count = count($posts);
        }
        ?>

        <?php if ($custom_query->have_posts()) : ?>
            <?php
            // FIXED: Loop through manually sorted posts
            foreach ($custom_query->posts as $post) :
                // Set up global post data
                $GLOBALS['post'] = $post;
                setup_postdata($post);
            ?>

                <article class="wp-block-valve-custom-universities-query__post">
                    <div class="wp-block-valve-custom-universities-query__image">
                        <?php if (has_post_thumbnail()) : ?>
                            <figure>
                                <?php the_post_thumbnail('md'); ?>
                            </figure>
                        <?php endif; ?>
                    </div>
                    <div class="wp-block-valve-custom-universities-query__content">
                        <h3 class="wp-block-valve-custom-universities-query__title">
                            <?php the_title(); ?>
                        </h3>

                        <div class="wp-block-valve-custom-universities-query__link">
                            <?php
                            $term_id = UniversityHelpers::get_term_id_by_post_id( $post->ID );
                            echo UniversityHelpers::university_link( $term_id );
                            ?>
                        </div>
                    </div>
                </article>

            <?php endforeach; ?>
        <?php else : ?>
            <p><?php echo esc_html(__('No posts found.', 'fitech-theme')); ?></p>
        <?php endif; ?>

        <?php wp_reset_postdata(); ?>

    <?php else : ?>
        <?php
        // Check if there are saved inner blocks
        if (!empty($block->inner_blocks)) {
            // Render saved inner blocks
            foreach ($block->inner_blocks as $inner_block) {
                echo render_block($inner_block);
            }
        } else {
            // No inner blocks saved yet, render the default template
            $default_query_args = array(
                'post_type' => 'fit-university',
                'post_status' => 'publish',
                'posts_per_page' => $postsPerPage,
                'orderby' => 'date',
                'order' => 'desc',
            );

            echo UniversityHelpers::render_default_university_layout($default_query_args);
        }
        ?>
    <?php endif; ?>
</div>
