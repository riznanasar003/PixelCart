import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Filter from "./Filter";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
    usePathname: () => "/products",
    useSearchParams: () => new URLSearchParams({ type: 'physical', sort: 'asc price' }),
    useRouter: () => ({ replace: mockReplace }),
}));

    describe("Filter Component", () => {
    beforeEach(() => {
        mockReplace.mockClear();
    });

        it("renders filter options", () => {
            render(<Filter />);

            expect(screen.getByRole("combobox", { name: /type/i })).toBeInTheDocument();
            expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();
            expect(screen.getByRole("combobox", { name: /sort by/i })).toBeInTheDocument();
        });
      

    it("calls replace on type select", async () => {
        render(<Filter />);
        const select = screen.getByLabelText(/Type/i);
        await userEvent.click(select);
        const option = await screen.findByText(/Digital/i);
        await userEvent.click(option);

        expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining("type=digital"));
    });

    it("calls replace on min price input", () => {
        render(<Filter />);
        const minInput = screen.getByLabelText(/min price/i);
        fireEvent.change(minInput, { target: { name: 'min', value: '100' } });
        expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining("min=100"));
    });

    it("calls replace on max price input", () => {
        render(<Filter />);
        const maxInput = screen.getByLabelText(/max price/i);
        fireEvent.change(maxInput, { target: { name: 'max', value: '500' } });
        expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining("max=500"));
    });

        it("calls replace on sort select", async () => {
            render(<Filter />);
            const sortSelect = screen.getByRole("combobox", { name: /sort by/i });
            await userEvent.click(sortSelect);

            const option = await screen.findByRole("option", { name: /Price \(high to low\)/i });
            await userEvent.click(option);

            expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining("sort=desc+price"));
        });
      
});
