/* eslint import/prefer-default-export: 0 */
export const getElementSize = (rect, style) => {
  const { width, height } = rect;

  const marginLeft = parseFloat(style.getPropertyValue('margin-left'));
  const marginRight = parseFloat(style.getPropertyValue('margin-right'));
  const marginTop = parseFloat(style.getPropertyValue('margin-top'));
  const marginBottom = parseFloat(style.getPropertyValue('margin-bottom'));

  const borderLeft = parseFloat(style.getPropertyValue('border-left-width'));
  const borderRight = parseFloat(style.getPropertyValue('border-right-width'));
  const borderTop = parseFloat(style.getPropertyValue('border-top-width'));
  const borderBottom = parseFloat(style.getPropertyValue('border-bottom-width'));

  const totalWidth = borderLeft + marginLeft + width + marginRight + borderRight;
  const totalHeight = borderTop + marginTop + height + marginBottom + borderBottom;

  return { width: totalWidth, height: totalHeight };
};
