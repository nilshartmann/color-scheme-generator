import { EventEmitter } from 'events';
const MODEL_CHANGE_EVENT = 'model_change';

function mapValuesToObjectsWithId(values) {
  return values.map((value,ix)=>({
      id: ix+1,
      value
    })
  );
}

export default function createModel(values=['']) {
  let state = {
    baseColors: mapValuesToObjectsWithId(values),
    shades: mapValuesToObjectsWithId([ -25, -15, 0, 15, 25 ])
  }

  function getState() {
    return state;
  }

  // Event emitter
  const emitter = Object.assign({}, EventEmitter.prototype, {
    emitChange() {
      this.emit(MODEL_CHANGE_EVENT);
    },

    addChangeListener(callback) {
      this.on(MODEL_CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
      this.removeListener(MODEL_CHANGE_EVENT, callback);
    }
  });

  function subscribe(callback) {
    const cb = () => callback(state);
    emitter.on(MODEL_CHANGE_EVENT, cb);

    return () => emitter.removeListener(MODEL_CHANGE_EVENT, cb);
  }

  function mergeState(newState) {
    state = Object.assign({}, state, newState);
    emitter.emitChange();
  }

  const actions = {
    addBaseColor(value) {
      const newBaseColor = {
        id: state.baseColors.length + 1,
        value
      }
      const newBaseColors = [...state.baseColors, newBaseColor];
      mergeState({ baseColors: newBaseColors});
    },

    addEmptyBaseColor() {
      const { baseColors } = state;
      if (baseColors.length < 5) {
        const newBaseColors = [...baseColors, {id: baseColors.length+1, value: ''}];
        mergeState({ baseColors: newBaseColors });
      }
    },

    updateBaseColor(id, newValue) {
      const { baseColors } = state;
      const newBaseColors = baseColors.map(oldBaseColor => oldBaseColor.id === id ? {value: newValue, id} : oldBaseColor);
      mergeState({ baseColors: newBaseColors });
    },

    updateShade(id, newValue) {
      const newShades = state.shades.map(oldShade => oldShade.id === id ? {value: newValue, id} : oldShade);
      mergeState({ shades: newShades });
    },

    getClassName(baseColor, colorIx) {
      return colorIx ? `color-${baseColor.id}-${colorIx}` : `color-${baseColor.id}`
    },

    setAllColors(allColors) {
      mergeState({ allColors });
    },

    showRGBColorValues() {
      mergeState({_showRGBColorValues: true});
    },

    hideRGBColorValues() {
      mergeState({_showRGBColorValues: false});
    },

    isShowRGBColorValues() {
      return state._showRGBColorValues;
    },

    showHexColorValues() {
      mergeState({_showHexColorValues: true});
    },

    hideHexColorValues() {
      mergeState({_showHexColorValues: false});
    },

    isShowHexColorValues() {
      return state._showHexColorValues;
    },

    setScss(scss) {
      mergeState({scss});
    }
  }

  return {
    subscribe,
    getState,
    actions
  }
}