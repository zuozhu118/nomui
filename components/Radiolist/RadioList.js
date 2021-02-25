import Component from '../Component/index'
import Field from '../Field/index'
import OptionList from './OptionList'

class RadioList extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      options: [],
      uistyle: 'radio',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      optionDefaults: {
        key() {
          return this.props.value
        },
      },
    })

    this.setProps({
      optionList: {
        component: OptionList,
      },
    })

    this.setProps({
      control: this.props.optionList,
    })

    super._config()
  }

  getSelectedOption() {
    return this.optionList.getSelectedItem()
  }

  _getValue() {
    const selected = this.getSelectedOption()
    if (selected !== null) {
      return selected.props.value
    }

    return null
  }

  _setValue(value) {
    if (value === null) {
      this.optionList.unselectAllItems()
    } else {
      this.optionList.selectItem(function () {
        return this.props.value === value
      })
    }
  }

  _disable() {
    if (this.firstRender === false) {
      this.optionList.disable()
    }
  }

  _enable() {
    if (this.firstRender === false) {
      this.optionList.enable()
    }
  }
}

Component.register(RadioList)

export default RadioList
