<?php
/**
 * University helper functions for Custom Universities Query block
 *
 * @package FitechTheme\CustomUniversitiesQuery\Helpers
 */

namespace FitechTheme\CustomUniversitiesQuery\Helpers;

class UniversityHelpers {

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
    public static function get_term_id_by_post_id( $post_id, $taxonomy = 'fit-study_university', $field_name = 'university_related_post_type' ) {
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
    public static function university_link( int $term_id ): string {
        $university_link = '';
        $custom_link_from_field = get_field('university_courses_custom_link', 'fit-study_university_' . $term_id);

        if ( $custom_link_from_field ) { // User selects a custom link.

            $university_link .= '<a href="';
            $university_link .= esc_url($custom_link_from_field['url']);
            $university_link .= '"';
            $university_link .= $custom_link_from_field['target'] ? ' target="' . esc_attr($custom_link_from_field['target']) . '"' : '';
            $university_link .= '>';
                $university_link .= esc_html($custom_link_from_field['title']);
            $university_link .= '</a>';

        } else { // Automatically generated search link with university parameters.

            $university_link .= '<a href="';
            $university_link .= esc_url(get_post_type_archive_link( 'fit-studies' ));
            $university_link .= '?orderby=start_date&fit_course_types=upcoming';
            $university_link .= $term_id ? '&fit_study_university=' . absint($term_id) : '';
            $university_link .= '" target="_self">';
                $university_link .= esc_html(__( 'See all courses here', 'fitech-theme' ));
            $university_link .= '</a>';

        }

        return $university_link;
    }

		/**
     * Renders the default university layout using the universities variation structure.
     *
     * This function matches the layout defined in BlockVariations.js and renders
     * universities in a column-based layout with featured image, title, and link.
     *
     * @param array $query_args WP_Query arguments for fetching universities.
     * @return string The rendered HTML for the default university layout.
     */
    public static function render_default_university_layout( array $query_args ): string {
        $query = new \WP_Query($query_args);

        if (!$query->have_posts()) {
            return '<p>' . esc_html(__('No universities found.', 'fitech-theme')) . '</p>';
        }

        ob_start();
        ?>

        <div class="wp-block-query is-layout-flow wp-block-query-is-layout-flow">
            <div class="wp-block-post-template is-layout-grid wp-block-post-template-is-layout-grid js-custom-universities">
                <?php while ($query->have_posts()) : $query->the_post(); ?>
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
														$term_id = UniversityHelpers::get_term_id_by_post_id( $query->post->ID );
														echo UniversityHelpers::university_link( $term_id );
														?>
													</div>
											</div>
										</article>
                <?php endwhile; ?>
            </div>
        </div>

        <?php
        wp_reset_postdata();
        return ob_get_clean();
    }
}
