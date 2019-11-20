import React from "react";
import App from "./App";
import './setupTest';
import { shallow } from "enzyme";


describe("Testando App Component", () => {
  it("Componente renderiza corretamente", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
