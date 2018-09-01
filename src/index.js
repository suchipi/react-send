const Component = require("react").Component;
const mitt = require("mitt").default;

module.exports = function send(name = "Send") {
  let emitter = mitt();

  class Input extends Component {
    static displayName = `${name}.Input`;

    componentDidMount() {
      emitter.emit("update", this.props.children);
    }

    componentDidUpdate() {
      emitter.emit("update", this.props.children);
    }

    componentWillUnmount() {
      emitter.emit("update", null);
    }

    render() {
      return null;
    }
  }

  class Output extends Component {
    static displayName = `${name}.Output`;

    state = {
      children: null,
    };

    _onUpdate = (children) => {
      this.setState({ children });
    };

    componentDidMount() {
      emitter.on("update", this._onUpdate);
    }

    componentWillUnmount() {
      emitter.off("update", this._onUpdate);
    }

    render() {
      return this.state.children;
    }
  }

  return {
    Input,
    Output,
  };
};

module.exports.default = module.exports;
