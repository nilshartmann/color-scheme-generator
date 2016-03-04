// import sass from 'sass.js'

function generateScss(baseColors, shades, getClassName) {
  function operator(className, shade) {
    const { value } = shade;
    if (value < 0) {
      return `darken($${className}, ${Math.abs(value) }%)`;
    }
    return `lighten($${className}, ${value}%)`;
  }

  function generateShadeColors(baseColor) {
    return shades.map((shade, ix) => {
      const className = getClassName(baseColor, ix + 1);
      const baseClassName = getClassName(baseColor);
      const operatorExpression = operator(baseClassName, shade);

      return `$${className}: ${operatorExpression};
.${className} { background-color: $${className} };`}).join('\n');
  }

  function generateBaseColor(baseColor) {
    if (!baseColor.value) {
      return '';
    }
    const baseClassName = getClassName(baseColor);
    const shadeColors = generateShadeColors(baseColor);
    return `$${baseClassName}: ${baseColor.value};
.${baseClassName} { background-color: $${baseClassName} };
${shadeColors}
`;
  }

  const scss = baseColors.map(baseColor => generateBaseColor(baseColor)).join('\n');
  return scss;
}

function addStylesToDom(css) {
  const stylesDomNode = document.getElementById('styles');
  const styleDomNodeHtml = `<style type="text/css">${css}</style>`;
  stylesDomNode.innerHTML = styleDomNodeHtml;

}

function collectAllColors(baseColors, shades, getClassName, setAllColors) {
  console.log('collectAllColors');
  function getColor(className) {
    const elements = document.getElementsByClassName(className);
    const color = elements[0];
    // console.log('className', className, 'Elements: ', elements, typeof color);
    return getComputedStyle(color)['background-color'];
  }

  let allColors = {};
  baseColors.forEach(baseColor => {
    // const baseColorClassName = getClassName(baseColor);
    // allColors[baseColorClassName] = getColor(baseColorClassName);
    shades.forEach((shade, ix) => {
      const shadeClassName = getClassName(baseColor, ix + 1);
      allColors[shadeClassName] = getColor(shadeClassName);
    })
  });
  return allColors;
}


export default function computeStyles(baseColors, shades, getClassName, setAllColors, setScss) {
  if (baseColors.length < 1 || (baseColors.length === 1 && !baseColors[0].value)) {
    return;
  }


  // if (!baseColors.find(bc => bc.value && bc.value.length>2)) {
  //   // only render when there is at least one color with length > 3
  //   setAllColors({});
  //   return;
  // }

  const scss = generateScss(baseColors, shades, getClassName);
  console.log('sass', Sass);
  Sass.compile(scss, result => {
    console.log('Compile Result', result);
    addStylesToDom(result.text);
    const allColors = result.text ? collectAllColors(baseColors, shades, getClassName) : null;
    console.log('settingAllColors', allColors);
    setScss(scss);
    setAllColors(allColors);
  });
}