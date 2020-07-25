import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from "../components/App";
require("dotenv").config();

const mockStore = configureStore([]);

describe("App Component", () => {
  let store = null;
  let component = null;

  beforeEach(() => {
    store = mockStore({
      alert: { alert: null, announcement: null },
      auth: {},
      nav: {
        brand: {
          path: "/",
          label: process.env.REACT_APP_NAME,
        },
        hasSearch: false,
        menu: {
          home: {
            path: "/",
            label: "Home",
            privilege: false,
          },
          admin: {
            path: "/admin",
            label: "Admin",
            privilege: true,
          },
        },
        submenu: {
          profile: {
            path: "/profile",
            label: "Profile",
            privilege: true,
          },
        },
      },
      service: {
        latlong: null,
        error: {},
      },
    });

    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("renders without crashing", () => {
    // const div = document.createElement("div");
    // ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
