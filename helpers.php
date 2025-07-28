<?php
/**
 * Formats the slide content into an HTML heading tag based on the specified level.
 *
 * @param array $slide_content The content of the slide, including attributes such as 'level' and 'content'.
 * @param string $style The style attribute to be applied to the heading tag.
 * @return string The formatted HTML heading tag with the specified content and style.
 *
 * The function supports heading levels from 1 to 6. If an invalid level is provided, it defaults to a <p> tag.
 * - If 'level' is not set in $slide_content['attributes'], it defaults to 1.
 * - If 'content' is not set in $slide_content['attributes'], it defaults to an empty string.
 */
function formatHLevel ( $slide_content, $style ): string {
    $level = $slide_content['attributes']['level'] ?? 1; // Default to 1 if 'level' is not set

    switch ($level) {
        case 1:
            return "<h1 " . $style . ">" . esc_html($slide_content['attributes']['content'] ?? '') . "</h1>";
        case 2:
            return "<h2 " . $style . ">" . esc_html($slide_content['attributes']['content'] ?? '') . "</h2>";
        case 3:
            return "<h3 " . $style . ">" . esc_html($slide_content['attributes']['content'] ?? '') . "</h3>";
        case 4:
            return "<h4 " . $style . ">" . esc_html($slide_content['attributes']['content'] ?? '') . "</h4>";
        case 5:
            return "<h5 " . $style . ">" . esc_html($slide_content['attributes']['content'] ?? '') . "</h5>";
        case 6:
            return "<h6 " . $style . ">" . esc_html($slide_content['attributes']['content'] ?? '') . "</h6>";
        default:
            // Fallback in case of an invalid level, using <p> as a fallback
            return "<p " . $style . ">" . esc_html($slide_content['attributes']['content'] ?? '') . "</p>";
    }
 }

/**
 * Formats the styles for a slide content array.
 *
 * This function takes a slide content array and generates a string of inline CSS styles
 * based on the attributes provided in the array. It handles margin, padding, text alignment,
 * text color, and background color.
 *
 * @param array $slide_content The slide content array containing style attributes.
 *
 * @return string The formatted inline CSS styles as a string.
 */
function formatStyles ( $slide_content ): string {
    $margin = '';
        $margin .= isset($slide_content['attributes']['style']['spacing']['margin']['top']) ? 'margin-top:' . $slide_content['attributes']['style']['spacing']['margin']['top'] . ';' : '';
        $margin .= isset($slide_content['attributes']['style']['spacing']['margin']['right']) ? 'margin-right:' . $slide_content['attributes']['style']['spacing']['margin']['right'] . ';' : '';
        $margin .= isset($slide_content['attributes']['style']['spacing']['margin']['bottom']) ? 'margin-bottom:' . $slide_content['attributes']['style']['spacing']['margin']['bottom'] . ';' : '';
        $margin .= isset($slide_content['attributes']['style']['spacing']['margin']['left']) ? 'margin-left:' . $slide_content['attributes']['style']['spacing']['margin']['left'] . ';' : '';

    $padding = '';
        $padding .= isset($slide_content['attributes']['style']['spacing']['padding']['top']) ? 'padding-top:' . $slide_content['attributes']['style']['spacing']['padding']['top'] . ';' : '';
        $padding .= isset($slide_content['attributes']['style']['spacing']['padding']['right']) ? 'padding-right:' . $slide_content['attributes']['style']['spacing']['padding']['right'] . ';' : '';
        $padding .= isset($slide_content['attributes']['style']['spacing']['padding']['bottom']) ? 'padding-bottom:' . $slide_content['attributes']['style']['spacing']['padding']['bottom'] . ';' : '';
        $padding .= isset($slide_content['attributes']['style']['spacing']['padding']['left']) ? 'padding-left:' . $slide_content['attributes']['style']['spacing']['padding']['left'] . ';' : '';
    $spacing = $margin . $padding;

    $text_align = isset($slide_content['attributes']['textAlign']) ? 'text-align:' . $slide_content['attributes']['textAlign'] . ';' : '';
    $text_color = isset($slide_content['attributes']['textColor']) ? 'color:var(--wp--preset--color--' . $slide_content['attributes']['textColor'] . ');' : '';
    $background_color = isset($slide_content['attributes']['backgroundColor']) ? 'background-color:var(--wp--preset--color--' . $slide_content['attributes']['backgroundColor'] . ');' : '';

    $style = $spacing || $text_align || $text_color || $background_color ? 'style="' : '';
        $style .= $text_align ? $text_align : '';
        $style .= $text_color ? $text_color : '';
        $style .= $background_color ? $background_color : '';
        $style .= $spacing ? $spacing : '';
    $style .= $spacing || $text_align || $text_color || $background_color ? '"' : '';

    return $style;
 }
/**
 * Formats the CSS classes for a slide based on its content position.
 *
 * This function takes the slide content array and checks if the 'contentPosition'
 * attribute is set. If it is, it generates a CSS class string that includes
 * 'has-custom-content-position' and 'is-position-' followed by the content position
 * in lowercase with spaces replaced by hyphens.
 *
 * @param array $slide_content The content of the slide, including attributes.
 * @return string The formatted CSS classes for the slide.
 */

 function formatClasses ( $slide_content ): string {
    $cover_content_position = isset($slide_content['attributes']['contentPosition']) ? 'has-custom-content-position is-position-' . strtolower(ucwords(str_replace(" ","-",$slide_content['attributes']['contentPosition']))) : '';

    $classes = '';
    $classes .= $cover_content_position ?? '';

    return $classes;
 }
