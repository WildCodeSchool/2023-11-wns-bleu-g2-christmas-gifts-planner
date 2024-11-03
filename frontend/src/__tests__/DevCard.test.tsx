import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import DevCard from "@/components/home/DevCard";

describe("Test component", () => {
    it("renders correctly", () => {
        const view = render (
        <DevCard 
        name="testName"
        link="testLink"
        color="testColor"
        role="testRole"
        description="testDescription" 
        />
    );
        expect(view.baseElement).toMatchSnapshot();
    });
});