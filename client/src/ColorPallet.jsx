import React from 'react';
import ColorPicker from 'react-color';

import ColorBox from './ColorBox';

export default class ColorPallet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
    };
  }

  openColorPicker() {
    this.setState({
      displayColorPicker: true
    });
  }

  closeColorPicker() {
    this.setState({
      displayColorPicker: false
    });

    this.addEmptyBaseColorIfEnd();
  }

  onKeyUp(e) {
     if (e.keyCode !== 13) {
      return;
    }

    this.addEmptyBaseColorIfEnd();
  }

  addEmptyBaseColorIfEnd() {
    // const { end, addEmptyBaseColor } = this.props;

    // if (end) {
    //   addEmptyBaseColor()
    // }
  }


  render() {
    const { baseColors, color, shades, getClassName, allColors, updateBaseColor, className='' } = this.props;

    return <div className={`columns ${className}`}>
      <div className='input-group' style={{ position: `relative` }}>
        <input type='text' className='input-group-field'
        placeholder='Enter Color'
          onKeyUp={e => this.onKeyUp(e)}
          value={color.value}
          onChange={e=>updateBaseColor(color.id, e.target.value)}
        />
      <div className='input-group-button'>
        <button className='button' style={{fontWeight:'bold'}} onClick={()=>this.openColorPicker()}>...</button>
      </div>
      <ColorPicker
          color={color.value}
          display={ this.state.displayColorPicker }
          onClose={ () => this.closeColorPicker() }
          onChange={c=>updateBaseColor(color.id, '#' + c.hex)}
        />
      </div>
      {shades.map((shade,ix) => <ColorBox {...this.props} key={color.id+'_'+ix} className={getClassName(color, ix+1)} />)}
    </div>;
  }
}