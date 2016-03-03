import React from 'react';

export default class OverallSettings extends React.Component {
  render() {
    const { showRGBColorValues, hideRGBColorValues, isShowRGBColorValues, showHexColorValues, hideHexColorValues, isShowHexColorValues, addEmptyBaseColor} = this.props;
    return <div className='row text-center'>
        <input type='checkbox' checked={isShowRGBColorValues()} onChange={e => e.target.checked ? showRGBColorValues() : hideRGBColorValues()} />Show RGB Color Values
        <input type='checkbox' checked={isShowHexColorValues()} onChange={e => e.target.checked ? showHexColorValues() : hideHexColorValues()} />Show Hex Color Values
        
       </div>;
  }

}