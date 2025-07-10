import React from "react";
import { render, screen } from "@testing-library/react";
import ClientNavbar from "./ClientNavbar";

jest.mock('../Navbar', () => {
    const MockNavbar = () => <div data-testid="navbar">Mocked Navbar</div>;
    MockNavbar.displayName = 'MockNavbar';
    return MockNavbar;
});
  
describe('ClientNavbar', () => {
    it('renders Navbar Component', () => {
        render(<ClientNavbar />);

        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    })
})