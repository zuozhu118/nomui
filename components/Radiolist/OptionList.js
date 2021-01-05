import Component from '../Component/index'
import List from '../List/index'

class OptionList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      itemDefaults: {
        tag: 'label',
        _config: function () {
          this.setProps({
            children: [
              {
                tag: 'span',
                classes: {
                  radio: true,
                },
              },
              {
                tag: 'span',
                classes: {
                  text: true,
                },
                children: this.props.text,
              },
            ],
          })
        },
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    super._create()

    this.radioList = this.parent
    this.radioList.optionList = this
  }

  _config() {
    const listProps = this.radioList.props
    if (listProps.type === 'radio') {
      this.setProps({
        gutter: 'x-md',
      })
    }
    this.setProps({
      items: listProps.options,
      itemDefaults: listProps.optionDefaults,
      itemSelectable: {
        byClick: true,
      },
      selectedItems: listProps.value,
      events: {
        itemSelectionChange: () => {
          this.radioList._onValueChange()
        },
      },
    })

    super._config()
  }
}

export default OptionList