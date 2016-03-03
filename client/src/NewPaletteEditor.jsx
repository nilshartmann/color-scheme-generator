import React from 'react';
import ColorPicker from 'react-color';


export default class NewPaletteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorName: '',
      displayColorPicker: false
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
  }

  onColorNameChange(newColorName) {
    this.setState({colorName: newColorName});
  }

  onKeyUp(e) {
    if (e.keyCode !== 13) {
      return;
    }

    this.addColor();
   }

  addColor() {
   const { colorName } = this.state;
   const { addBaseColor } = this.props;

    if (!colorName) {
      console.log('adios, no colorName');
      return;
    }

    addBaseColor(colorName);
    this.setState({
      colorName: ''
    })

    if (this.inputElement) {
      this.inputElement.focus();
    }
  }





  render() {
    const { colorName } = this.state;
    const { enabled } = this.props;
    return <div className='input-group' style={{ position: `relative` }}>
      <input className='input-group-field'
        type='text'
        placeholder={enabled ? 'Add color' : 'All colors in use'}
        value={colorName}
        onChange={e=>this.onColorNameChange(e.target.value)}
        onKeyUp={e=>this.onKeyUp(e)}
        ref={node=>{this.inputElement = node}}
        disabled={!enabled}
        />
      <div className='input-group-button'>
        <button disabled={!enabled} className='button' style={{fontWeight:'bold'}} onClick={()=>this.addColor()}>+</button>
      </div>
      <div className='input-group-button'>
        <button disabled={!enabled} className='button' style={{fontWeight:'bold'}} onClick={()=>this.openColorPicker()}>...</button>
      </div>
       <ColorPicker
          display={ this.state.displayColorPicker }
          onClose={ () => this.closeColorPicker() }
          onChangeComplete={color=>console.log('color', color)}
        />
    </div>;
  }
}

//          <div style={{ position: `relative` }}>

// </div>


