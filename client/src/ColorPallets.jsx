import React from 'react';

import ShadeEditorColumn from './ShadeEditorColumn';
import ColorPallet from './ColorPallet';
import computeStyles from './model/computeStyles';

// TODO: this class should not be a component but rather a 'regular' listener
// on the model
class SassWrapper extends React.Component {
  render() {
    return null;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.baseColors !== this.props.baseColors || nextProps.shades !== this.props.shades;
  }

  componentDidMount() {
    this.updateSass();
  }

  componentDidUpdate() {
    this.updateSass();
  }

  updateSass() {
      const { baseColors, shades, getClassName, setAllColors, setScss } = this.props;

      // note that we change a dom element here that is not under react's control :-/
      computeStyles(baseColors, shades, getClassName, setAllColors, setScss);
  }
}


export default function ColorPallets(props) {
  const { baseColors, shades, allColors, getClassName, setAllColors, addBaseColor, setScss } = props;

  if (baseColors.length<1) {
    return <div />;
  }

  const showShadeEditorColumn = baseColors.length > 1 || baseColors[0].value;
  const numberOfVisibleColumns = showShadeEditorColumn ? baseColors.length+2 : 1;

  const firstClassName = `columns first-of-${numberOfVisibleColumns}`;

  return <div className='row'>
      {showShadeEditorColumn ? <div className={firstClassName}><ShadeEditorColumn position='left' {...props} /></div> : null}
      {baseColors.map((baseColor,ix) => <ColorPallet className={ix == 0 && !showShadeEditorColumn ? firstClassName : null} key={baseColor.id} color={baseColor} ix={ix} end={ix===baseColors.length-1} {...props}  />)}
     <SassWrapper baseColors={baseColors} shades={shades} allColors={allColors} getClassName={getClassName} setAllColors={setAllColors} setScss={setScss} />
     {showShadeEditorColumn ? <div className='columns'><ShadeEditorColumn position='right' {...props} /></div> : null}
  </div>;

};
// ColorPallets.propTypes = {
//   React.PropTypes.object.i
// }