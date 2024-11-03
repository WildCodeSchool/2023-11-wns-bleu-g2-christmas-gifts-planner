import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Test from "../components/Test";

describe("Test component", () => {
    it("renders correctly", () => {
        const view = render (
        <Test 
        hello="Hello World" />);
        expect(view.baseElement).toMatchSnapshot();
    });
});