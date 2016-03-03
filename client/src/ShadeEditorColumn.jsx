import React from 'react';

export default class ShadeEditorColumn extends React.Component {
  constructor(props) {
    super(props);
    this.inputElements = {};
  }

  adjust(shadeId, amount) {
    console.log('input', this.inputElements);
    const { inputElements } = this;

    if (!inputElements[shadeId]) {
      return;
    }

    console.log('input', inputElements[shadeId]);

    const value = inputElements[shadeId].value;
    console.log('valuebefore: ', value, parseInt(value));
    const newValue = parseInt(value) + amount;
    console.log('value after', newValue);

    this.setShadeValue(shadeId, newValue);

  }

  setShadeValue(id, value) {
    const { updateShade } = this.props;

    updateShade(id, value)
  }

  render() {
  const { shades, updateShade, position } = this.props;
    return <div className={`shadeEditorColumn shadeEditorColumn-${position}`}>
      {shades.map((shade,ix) => {
        return <div key={ix} className='box' >
          <div className='shadeEditorColumnInput input-group'>
          <div className='input-group-button'>
        <button className='button' onClick={()=>this.adjust(shade.id, -5)}>-</button>
        </div>
            <input
              ref={n => this.inputElements[shade.id] = n}
              type='text'
              value={shade.value}
              onChange={e => this.setShadeValue(shade.id, e.target.value)}
              />
            <div className='input-group-button'>
        <button className='button' onClick={()=>this.adjust(shade.id, 5)}>+</button>
      </div>
          </div>
          </div>;
      })}
    </div>;
  }
}