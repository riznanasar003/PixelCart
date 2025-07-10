import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";


describe("Footer Component", () => {
    beforeEach(() => {
        render(<Footer />);
    })

    it("renders brand name PIXELCART", () => {
        const brand = screen.getByRole("link", { name: /PIXELCART/i });
        expect(brand).toBeInTheDocument();
    })

    it("renders contact info", () => {
        expect(screen.getByText(/hello@pixelcart.dev/i)).toBeInTheDocument();
        expect(screen.getByText(/\+1 234 567 890/i)).toBeInTheDocument();
    })

    it("renders all company/shop/help sections", () => {
        expect(screen.getByText(/company/i)).toBeInTheDocument();
        expect(screen.getByText(/shop/i)).toBeInTheDocument();
        expect(screen.getByText(/help/i)).toBeInTheDocument();
    })

    it("renders subscribe section", () => {
        expect(screen.getByText(/subscribe/i)).toBeInTheDocument();
        expect(screen.getByText(/Be the first to get the latest news/i)).toBeInTheDocument();

    })

    it("renders the email imput and join button", () => {
        expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /join/i})).toBeInTheDocument();
    })

    it("renders social icons and payment logos", () => {
        const socialIcons = ['fb', 'insta', 'yt', 'pin', 'x'];
        socialIcons.forEach((alt) => {
            expect(screen.getByAltText(alt)).toBeInTheDocument();
        })

        const paymentLogos = screen.getAllByAltText('pay');
        expect(paymentLogos.length).toBe(5);
    })     
})
