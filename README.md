# `react-send` 📨

`react-send` is a library that creates components which send their children somewhere else in your render tree.

## API

`react-send` exports a function called `send` which is used to create a pair of component classes- an input and an output:

```js
const { Input, Output } = send();
// Input and Output are component classes
```

Any children you pass into `Input` will get rendered as the children of `Output`.

```js
const { Input, Output } = send();

const Example = () => (
  <div id="outer">
    <Output />
    <span id="inner">
      <Input>inside input</Input>
    </span>
  </div>
);
// Renders:
//   <div id="outer">
//     inside input
//     <span id="inner">
//     </span>
//   </div>
```

These components will show up in the React DevTools as `Send.Input` and `Send.Output`. You can pass an optional string to `send` to customize this:

```js
const { Input, Output } = send("AppBarContents");
// Input and Output now appear in React DevTools as
// AppBarContents.Input and AppBarContents.Output, respectively.
```

## Example

In this example, we use `react-send` to create two components named `Title.Input` and `Title.Output`. The outer `App` component renders `Title.Output`, and each page the app can render renders a `Title.Input`. Therefore, each page determines which title to render, but `App` determines where to put the title in the DOM.

```js
import send from "react-send";

const Title = send("Title");
// Title is now an object with two component classes on it: `Input` and `Output`.
// The children passed into `Input` will be rendered as children of `Output`.

class App extends React.Component {
  state = {
    currentPage: "index",
  };

  render() {
    const { currentPage } = this.state;

    return (
      <>
        <div id="title">
          <Title.Output />
        </div>
        <main>
          {currentPage === "index" ? (
            <IndexPage />
          ) : currentPage === "users" ? (
            <UsersPage />
          ) : null}
        </main>
      </>
    );
  }
}

class IndexPage extends React.Component {
  render() {
    return (
      <>
        <Title.Input>Home</Title.Input>
        This is the index page
      </>
    );
  }
}

class UsersPage extends React.Component {
  render() {
    return (
      <>
        <Title.Input>Users</Title.Input>
        This is the users page
      </>
    );
  }
}
```

## License

MIT
