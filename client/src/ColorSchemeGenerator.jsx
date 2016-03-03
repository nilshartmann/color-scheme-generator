import React from 'react';

import NewPaletteEditor from './NewPaletteEditor';
import ColorPallets from './ColorPallets';
import OverallSettings from './OverallSettings';
import CodePanel from './CodePanel';

export default class ColorSchemeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }


  componentDidMount() {
    const { model } = this.props;
    this.unsubscribeModel = model.subscribe( () => this.onChangeModel() );
  }

  onChangeModel() {
    this.forceUpdate(); // TODO
  }

  render() {

    const { model: { actions, getState } } = this.props;
    const state = getState();
    return <div className='Background DarkTheme'>
      <div className='text-center'>
        <h1>Color Scheme Generator</h1>
        <p>A Color Scheme Generator using React and SASS. Inspired by this <a href='http://codepen.io/TepigMC/full/YPdLRq/'>Generator on Codepen</a></p>
        <p>Find Source Code at GitHub: <a href='https://github.com/nilshartmann/color-scheme-generator'>https://github.com/nilshartmann/color-scheme-generator</a></p>
        <button style={{width: 'auto', display: 'inline'}} onClick={actions.addEmptyBaseColor}>Add color</button>
      </div>

      <ColorPallets {...actions} {...state} />
      <OverallSettings {...actions} />
      <CodePanel {...actions} {...state} />

    </div>;
  }
}

ColorSchemeGenerator.propTypes = {
  model: React.PropTypes.object.isRequired
}

      // <div className='row'>
      //   <div className='columns' style={{margin: '0 auto', float: 'none'}}>
      //    <NewPaletteEditor {...actions} enabled={state.baseColors.length < 5} />
      //   </div>
      // </div>