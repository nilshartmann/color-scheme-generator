import React from 'react';

// https://jsfiddle.net/junto/ku4zp1nt/
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

export default function ColorBox({className, allColors, showRGBColorValues, hideRGBColorValues, isShowRGBColorValues, showHexColorValues, hideHexColorValues, isShowHexColorValues}) {
  const color = allColors ? allColors[className] : '';
  return <div className={`box ${className}`}>
    {isShowRGBColorValues() ? <div className='hex'>{color}</div> : null}
    {isShowHexColorValues() ? <div className='hex'>{rgb2hex(color)}</div> : null}
  </div>;
}

// return <div className={`box ${className}`} onMouseOver={showColorValues} onMouseOut={hideColorValues}>
//     {isShowColorValues() ? <div className='hex' onMouseOver={showColorValues} onMouseOut={hideColorValues}>{color}</div> : null}
//   </div>;