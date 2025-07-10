import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

jest.mock("@hooks/useWixClient", () => ({
    useWixClient: jest.fn(() => ({
        auth: {
            loggedIn: jest.fn(() => true),
        },
    })),
}));

jest.mock("@hooks/useCartStore", () => ({
    useCartStore: jest.fn(() => ({
        counter: 2,
    })),
}));

describe("Navbar Component", () => {
    const pushMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
        (usePathname as jest.Mock).mockReturnValue("/test-page");

        
        (useWixClient as jest.Mock).mockReturnValue({
            auth: {
                loggedIn: () => true,
            },
        });

        (useCartStore as unknown as jest.Mock).mockReturnValue({
            counter: 2,
        });
    });

    test("renders logo and navigation links", () => {
        render(<Navbar />);
        screen.debug(undefined, Infinity);
        expect(screen.getByText(/PIXELCART/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'HOMEPAGE' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'ORDERS' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'CART' })).toBeInTheDocument();

    });

    test("renders ORDERS link", () => {
        render(<Navbar />);
        const ordersLink = screen.getByRole("link", { name: "ORDERS" });
        expect(ordersLink).toBeInTheDocument();
        expect(ordersLink).toHaveAttribute("href", "/orders");
      });

    test("redirects to login if not logged in when clicking wishlist", () => {
        (useWixClient as jest.Mock).mockReturnValue({
            auth: {
                loggedIn: () => false,
            },
        });

        render(<Navbar />);

        const wishlistButton = screen.getByTestId("wishlist-button");
        fireEvent.click(wishlistButton);
        expect(pushMock).toHaveBeenCalledWith("/auth?returnTo=/test-page");
    });

    test("redirects to wishlist if logged in when clicking wishlist", () => {
        (useWixClient as jest.Mock).mockReturnValue({
            auth: {
                loggedIn: () => true,
            },
        });

        render(<Navbar />);
        const wishlistButton = screen.getByTestId("wishlist-button");
        fireEvent.click(wishlistButton);
        expect(pushMock).toHaveBeenCalledWith("/wishlist");
    });

    

    test("shows cart badge with correct count", () => {
        render(<Navbar />);
        expect(screen.getByText("2")).toBeInTheDocument();
    });
});
