import Component from '../Component/index'
import RuleManager from "../util/rule-manager"
import { clone, isFunction, extend } from '../util/index'
import Tooltip from '../Tooltip/index'

class Control extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            rules: [],
            required: false,
            requiredMessage: "必填"
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.initValue = null
        this.oldValue = null
        this.currentValue = null

        if (this.props.value !== undefined) {
            this.initValue = clone(this.props.value)
        }
    }

    _config() {
        if (this.props.required === true) {
            this.props.rules.unshift({ type: 'required', message: this.props.requiredMessage })
        }
    }

    getValue() {
        let value = isFunction(this._getValue) ? this._getValue() : null
        return value
    }

    setValue(value) {
        isFunction(this._setValue) && this._setValue(value)
    }

    validate() {
        var invalids = this.invalids = []

        if (this.disabled === true) {
            return true
        }

        this.validateTriggered = true
        invalids = this._validate()
        if (invalids.length > 0) {
            invalids[0].focus()
        }

        return invalids.length === 0
    }

    _validate() {
        let { rules } = this.props
        if (Array.isArray(rules) && rules.length > 0) {
            var validationResult = RuleManager.validate(rules, this.getValue())

            if (validationResult === true) {
                this.removeClass('s-invalid')
                this.trigger('valid')
                if (this.errorTip) {
                    this.errorTip.remove()
                    delete this.errorTip
                }
                return true
            }
            else {
                this.addClass('s-invalid')
                this.trigger('invalid', validationResult)
                this._invalid(validationResult)
                return this
            }
        }

        return true
    }

    _invalid(message) {
        if (!this.errorTip) {
            this.errorTip = new Tooltip({
                trigger: this,
                styles: {
                    color: 'danger',
                },
                children: message
            })

            if (this.element.contains(document.activeElement)) {
                this.errorTip.show()
            }
        }
        else {
            this.errorTip.update({
                children: message
            })
        }
    }

    // 派生的控件子类内部适当位置调用
    _onValueChange() {
        var that = this;
        this.oldValue = clone(this.currentValue)
        this.currentValue = clone(this.getValue())
        this.props.value = this.currentValue

        var changed = {
            name: this.name,
            oldValue: this.oldValue,
            newValue: this.currentValue,
        }

        setTimeout(function () {
            that.trigger("valueChange", changed)
            console.log(changed)
            if (that.validateTriggered) {
                that._validate()
            }
        }, 0)
    }
}

Component.register(Control)

export default Control