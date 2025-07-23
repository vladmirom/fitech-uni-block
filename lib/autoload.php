<?php
/**
 * PSR-4 autoloader for the block
 *
 * @package YourNamespace\YourBlockName
 */

spl_autoload_register(function ($class) {
	// Project-specific namespace prefix
	$prefix = 'YourNamespace\\YourBlockName\\';

	// Base directory for the namespace prefix
	$base_dir = __DIR__ . '/';

	// Does the class use the namespace prefix?
	$len = strlen($prefix);
	if (strncmp($prefix, $class, $len) !== 0) {
		return;
	}

	// Get the relative class name
	$relative_class = substr($class, $len);

	// Replace namespace separators with directory separators
	$file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

	// If the file exists, require it
	if (file_exists($file)) {
		require $file;
	}
});