<?php
/**
 * Helper functions for the block
 *
 * @package YourNamespace\YourBlockName\Helpers
 */

namespace YourNamespace\YourBlockName\Helpers;

class BlockHelpers {

	/**
	 * Process and sanitize text content
	 *
	 * @param string $text The text to process
	 * @return string Processed text
	 */
	public static function process_text( string $text ): string {
		// Sanitize and process the text
		$text = sanitize_text_field( $text );
		return esc_html( $text );
	}

	/**
	 * Renders default block layout
	 *
	 * @param array $args Arguments for rendering
	 * @return string The rendered HTML
	 */
	public static function render_default_layout( array $args = [] ): string {
		$content = $args['content'] ?? __('Default layout content', 'your-textdomain');
		
		ob_start();
		?>
		<div class="block-default-layout">
			<p><?php echo esc_html( $content ); ?></p>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Get formatted content with fallback
	 *
	 * @param string $content The content to format
	 * @param string $fallback Fallback content if empty
	 * @return string Formatted content
	 */
	public static function get_formatted_content( string $content, string $fallback = '' ): string {
		if ( empty( $content ) ) {
			return $fallback ?: __('No content available', 'your-textdomain');
		}

		return wp_kses_post( $content );
	}
}