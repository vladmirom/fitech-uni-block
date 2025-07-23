<?php
/**
 * Server rendering of the block.
 * @var $attributes array Block attributes
 * @var $content string Block inner content
 * @var $block WP_Block_Parser_Block The parsed block object
 */

// Load the autoloader
require_once __DIR__ . '/lib/autoload.php';

// Import helper class
use YourNamespace\YourBlockName\Helpers\BlockHelpers;

// Extract attributes
$content = $attributes['content'] ?? '';

$block_wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-your-namespace-block'
	)
);
?>

<div <?php echo $block_wrapper; ?>>
	<?php if (!empty($content)) : ?>
		<p><?php echo esc_html($content); ?></p>
	<?php else : ?>
		<p><?php echo esc_html(__('Default block content', 'your-textdomain')); ?></p>
	<?php endif; ?>
</div>