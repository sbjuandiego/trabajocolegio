/**
 * Icon — Material Symbols Rounded
 *
 * Usage:
 *   <Icon name="download" />
 *   <Icon name="lock" size={24} fill={1} weight={400} />
 *   <Icon name="check_circle" size={20} color="var(--blue-300)" />
 *
 * Find icon names at: https://fonts.google.com/icons?icontype=material-symbols
 */
export default function Icon({
  name,
  size = 20,
  fill = 1,
  weight = 300,
  grade = 0,
  color = 'currentColor',
  style = {},
  className = '',
}) {
  return (
    <span
      className={`icon ${className}`}
      style={{
        fontSize: size,
        color,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${size}`,
        flexShrink: 0,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
