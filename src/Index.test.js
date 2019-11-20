import React from "react";
import Index from "./pages/index";
import "./setupTest";
import { expect } from "chai";
import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";

describe("Testando o componente Index", () => {
  const wrapper = shallow(<Index />);
  it("Renderiza dois componentes  <Button />", () => {
    expect(wrapper.find(Button)).to.have.lengthOf(2);
  });

  it("Renderiza o componente mockup", () => {
    expect(wrapper.find(".mockup")).to.have.lengthOf(1);
  });
});
