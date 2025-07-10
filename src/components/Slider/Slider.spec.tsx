import React from "react";
import { fireEvent, render, screen, act, within } from "@testing-library/react";
import Slider from "./Slider";


const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));


describe("Slider Component", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        render(<Slider />);
        act(() => {
            jest.advanceTimersByTime(0);
        })
    })

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    })

    it("renders initial slide content", () => {
        expect(screen.getByText(/Summer Sale Collections/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Sale! Up to 50% off!/i)).toHaveLength(3);
        
    })
    
    it("auto slide to next slide after 3 seconds", () => {
        expect(screen.getByText(/Summer sale collections/i)).toBeInTheDocument();
        act(() => {
            jest.advanceTimersByTime(3000);
        })

        expect(screen.getByText(/Winter sale collections/i)).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(3000);
        })

        expect(screen.getByText(/Spring sale collections/i)).toBeInTheDocument();
    })

    it("allows manual dot navigation", () => {
        const dots = screen.getAllByTestId("dot");
        fireEvent.click(dots[1]);
        expect(screen.getByText(/Winter sale collections/i)).toBeInTheDocument();
    })

    it("navigates to the list page on SHOP NOW button click", () => {
        act(() => {
            jest.advanceTimersByTime(0); 
        });

        const slide = screen.getByText(/Summer Sale Collections/i).closest('div');
        const button = within(slide!).getByRole('button', { name: /shop now/i });

        fireEvent.click(button);

        expect(mockPush).toHaveBeenCalledWith("/list");
    });
      

})
