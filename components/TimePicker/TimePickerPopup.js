import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import TimePickerWrapper from './TimePickerWrapper'

class TimePickerPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.pickerControl = this.opener.parent.parent
  }

  _config() {
    this.setProps({
      attrs: {
        style: {
          width: `${this.pickerControl.offsetWidth()}px`,
        },
      },
      children: {
        component: Layout,
        body: {
          children: {
            component: TimePickerWrapper,
            onConfirm: () => {
              // debugger
            },
          },
        },
      },
    })

    super._config()
  }
}

Component.register(TimePickerPopup)

export default TimePickerPopup
