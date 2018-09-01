import React from "react";
import { render, cleanup } from "react-testing-library";
import send from "..";

describe("react-send", () => {
  afterEach(cleanup);

  it("hoists children of Input into Output", () => {
    const { Input, Output } = send();
    const result = render(
      <div>
        <Output />
        <span>
          <Input>input text</Input>
          span contents
        </span>
      </div>,
    );
    expect(result.container.outerHTML).toMatchInlineSnapshot(
      `"<div><div>input text<span>span contents</span></div></div>"`,
    );
  });

  it("updates the output when the input's contents change", () => {
    class Incrementer extends React.Component {
      state = { value: 1 };

      render() {
        const { children } = this.props;
        const { value } = this.state;

        const button = (
          <button
            onClick={() => {
              this.setState((prevState) => ({
                value: prevState.value + 1,
              }));
            }}
          >
            Increment
          </button>
        );

        return children({ button, value });
      }
    }

    const { Input, Output } = send();
    const result = render(
      <Incrementer>
        {({ button, value }) => (
          <div>
            <Output />
            <span>
              <Input>{value}</Input>
              {button}
            </span>
          </div>
        )}
      </Incrementer>,
    );

    expect(result.container.outerHTML).toMatchInlineSnapshot(
      `"<div><div>1<span><button>Increment</button></span></div></div>"`,
    );

    result.getByText("Increment").click();

    expect(result.container.outerHTML).toMatchInlineSnapshot(
      `"<div><div>2<span><button>Increment</button></span></div></div>"`,
    );
  });

  it("removes the children from output when the input unmounts", () => {
    class Toggle extends React.Component {
      state = { value: true };

      render() {
        const { children } = this.props;
        const { value } = this.state;

        const button = (
          <button
            onClick={() => {
              this.setState((prevState) => ({
                value: !prevState.value,
              }));
            }}
          >
            Toggle
          </button>
        );

        return children({ button, value });
      }
    }

    const { Input, Output } = send();
    const result = render(
      <Toggle>
        {({ button, value }) => (
          <div>
            <Output />
            <span>
              {value ? <Input>hi</Input> : null}
              {button}
            </span>
          </div>
        )}
      </Toggle>,
    );

    expect(result.container.outerHTML).toMatchInlineSnapshot(
      `"<div><div>hi<span><button>Toggle</button></span></div></div>"`,
    );

    result.getByText("Toggle").click();

    expect(result.container.outerHTML).toMatchInlineSnapshot(
      `"<div><div><span><button>Toggle</button></span></div></div>"`,
    );
  });
});
