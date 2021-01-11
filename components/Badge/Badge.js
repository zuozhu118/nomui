import Component from '../Component/index'

class Badge extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'span',
      type: 'square',
      text: null,
      icon: null,
      number: null,
      overflowCount: 99,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['size']
    const { icon, text, type, number, overflowCount } = this.props

    if (icon) {
      this.setProps({
        classes: {
          'p-with-icon': true,
        },
      })
    }

    if (type === 'round') {
      this.setProps({
        classes: {
          'u-shape-round': true,
        },
      })
    } else if (type === 'dot') {
      if (number > 0) {
        this.setProps({
          classes: {
            'p-with-number': true,
          },
        })
      }
    }

    this.setProps({
      children: [
        Component.normalizeIconProps(icon),
        text && { tag: 'span', children: text },
        number && { tag: 'span', children: number > overflowCount ? `${overflowCount}+` : number },
      ],
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.mixin({
  _config: function () {
    if (this.props.badge) {
      this.setProps({
        classes: {
          's-with-badge': true,
        },
      })
    }
  },
  _render: function () {
    if (this.props.badge) {
      const badgeProps = {
        type: 'dot',
      }
      badgeProps.number = this.props.badge.number ? this.props.badge.number : null
      badgeProps.overflowCount = this.props.badge.overflowCount
        ? this.props.badge.overflowCount
        : 99
      badgeProps.styles = this.props.badge.styles ? this.props.badge.styles : { color: 'danger' }
      this.props.badge = badgeProps
      this.badge = new Badge(Component.extendProps({ reference: this }, this.props.badge))
    }
  },
})

Component.register(Badge)

export default Badge