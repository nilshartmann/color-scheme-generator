import React from 'react';
import Highlight from 'react-highlight';
export default class CodePanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCode: 'css'
    }
  }

  onSelectActiveCode(activeCode) {
    console.log('sectActiveCode', activeCode);
    this.setState({activeCode});
  }

  renderCSS() {
    const { allColors } = this.props;
    const css = Object.keys(allColors).map(k => `.${k} {background: ${allColors[k]}}`).join('\n');

    return <Highlight className='css'>
      {css}
    </Highlight>;
  }

  renderScss() {
    const { scss } = this.props;

    return <Highlight className='scss'>
      {scss}
    </Highlight>;
  }

  render() {
    const { activeCode } = this.state;
    const { allColors } = this.props;

    if (!allColors) {
      return null;
    }

    return <div className='row'>
    <div className='button-bar'>
      <button className={activeCode==='css' ? 'active' : ''} onClick={()=>this.onSelectActiveCode('css')}>CSS</button>
      <button className={activeCode==='scss' ? 'active' : ''} onClick={()=>this.onSelectActiveCode('scss')}>SCSS</button>
    </div>

    {activeCode === 'css' ? this.renderCSS() : null}
    {activeCode === 'scss' ? this.renderScss() : null}
    </div>;
  }
}