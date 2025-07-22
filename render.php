<?php
/**
 * Server rendering of the block.
 * @var $attributes array of the attributes that come from the block.
 * @var $content string The block inner content.
 */

$selectedPosts = $attributes['selectedPosts'] ?? [];

$block_wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-valve-custom-universities-query'
	)
);

// Only use custom query if we have selected posts, otherwise use the inner content
$use_custom_query = !empty($selectedPosts);

/**
 * Helper function that retrieves the term ID from a specified taxonomy where a custom field references a given post ID.
 *
 * This function loops through all terms in the provided taxonomy and checks a specified custom field
 * (usually an ACF relationship field) to see if it references the given post ID. If a match is found,
 * the term ID is returned.
 *
 * @param int    $post_id     The ID of the post to search for in the custom field.
 * @param string $taxonomy    (Optional) The taxonomy to search within. Default is 'fit-study_university'.
 * @param string $field_name  (Optional) The name of the custom field to check. Default is 'university_related_post_type'.
 *
 * @return int|false The term ID if a matching term is found, or false if not found or on error.
 */
function get_term_id_by_post_id( $post_id, $taxonomy = 'fit-study_university', $field_name = 'university_related_post_type' ) {
    // Get all terms in the taxonomy
    $terms = get_terms(array(
        'taxonomy' => $taxonomy,
        'hide_empty' => false,
    ));

    if (is_wp_error($terms) || empty($terms)) {
        return false;
    }

    // Loop through terms to find the one with matching post ID
    foreach ($terms as $term) {
        $selected_post = get_field($field_name, $taxonomy . '_' . $term->term_id);

        // Check if the selected post matches our target post ID
        if ($selected_post && $selected_post == $post_id) {
            return $term->term_id;
        }
    }

    return false; // No matching term found
}

/**
 * Generates an HTML anchor link for a university term.
 *
 * If a custom link is set via the 'university_courses_custom_link' ACF field for the given university term,
 * it returns an anchor tag using the custom URL, title, and target attributes.
 * Otherwise, it generates a default search link to the 'fit-studies' archive, filtered by the university term.
 *
 * @param int $term_id The ID of the university term.
 * @return string The HTML anchor link for the university.
 */
function university_link( int $term_id ): string {
	$university_link = '';
	$custom_link_from_field = get_field('university_courses_custom_link', 'fit-study_university_' . $term_id);

	if ( $custom_link_from_field ) { // User selects a custom link.

		$university_link .= '<a href="';
		$university_link .= $custom_link_from_field['url'];
		$university_link .= '"';
		$university_link .= $custom_link_from_field['target'] ? ' target="' . $custom_link_from_field['target'] . '"' : '';
		$university_link .= '>';
			$university_link .= $custom_link_from_field['title'];
		$university_link .= '</a>';

	} else { // Automatically generated seach link with university parameters.

		$university_link .= '<a href="';
		$university_link .= get_post_type_archive_link( 'fit-studies' );
		$university_link .= '?orderby=start_date&fit_course_types=upcoming';
		$university_link .= $term_id ? '&fit_study_university=' . $term_id : '';
		$university_link .= '" target="_self">';
			$university_link .= __( 'See all courses here', 'fitech-theme' );
		$university_link .= '</a>';

	}

	return $university_link;
}

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
										<?php echo university_link( get_term_id_by_post_id( $custom_query->post->ID ) ); ?>
									</div>
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
