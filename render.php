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
        // Custom query for selected posts
        $query_args = array(
            'post_type' => 'fit-university',
            'post_status' => 'publish',
            'post__in' => array_map('intval', $selectedPosts),
            'orderby' => 'post__in',
            'posts_per_page' => count($selectedPosts),
        );

        $custom_query = new WP_Query($query_args);
        ?>

        <?php if ($custom_query->have_posts()) : ?>
            <?php while ($custom_query->have_posts()) : $custom_query->the_post(); ?>

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
										$term_id = UniversityHelpers::get_term_id_by_post_id( $custom_query->post->ID );
										echo UniversityHelpers::university_link( $term_id );
										?>
									</div>
								</div>
							</article>

            <?php endwhile; ?>
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
