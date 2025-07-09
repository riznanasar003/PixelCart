import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Add from './Add';
import type { Mock } from 'jest-mock';
import * as cartStoreModule from '../../hooks/useCartStore';
import * as wixClientModule from '../../hooks/useWixClient';
import { useRouter } from 'next/navigation';


jest.mock('../../hooks/useCartStore', () => ({
    useCartStore: jest.fn(),
}));

jest.mock('../../hooks/useWixClient', () => ({
    useWixClient: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Add Component', () => {
    const mockAddItem = jest.fn();
    const mockLoggedIn = jest.fn();
    const mockPush = jest.fn(); 
    

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });


        (cartStoreModule.useCartStore as unknown as Mock).mockReturnValue({
            addItem: mockAddItem,
        });

        (wixClientModule.useWixClient as unknown as Mock).mockReturnValue({
            auth: {
                loggedIn: mockLoggedIn,
            },
        });

    });

    it('renders with initial quantity of 1', () => {
        render(<Add productId="123" variantId="456" stockNumber={4} />);
        expect(screen.getByText(/choose a quantity/i)).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('increases and decreases quantity', () => {
        render(<Add productId="123" variantId="456" stockNumber={4} />);
        fireEvent.click(screen.getByText('+'));
        expect(screen.getByText('2')).toBeInTheDocument();

        fireEvent.click(screen.getByText('-'));
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('shows out-of-stock message when stockNumber is 0', () => {
        render(<Add productId="123" variantId="456" stockNumber={0} />);
        expect(screen.getByText(/product is out of stock/i)).toBeInTheDocument();
    });

    it('calls addItem if user is logged in', async () => {
        mockLoggedIn.mockResolvedValue(true);

        render(<Add productId="123" variantId="456" stockNumber={4} />);
        fireEvent.click(screen.getByText('Add to Cart'));

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(mockAddItem).toHaveBeenCalledWith(
            expect.anything(),
            '123',
            '456',
            1
        );
    });

    it('redirects to login if user is not logged in', async () => {
        mockLoggedIn.mockResolvedValue(false);
        

        render(<Add productId="123" variantId="456" stockNumber={4} />);
        fireEvent.click(screen.getByText('Add to Cart'));

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(mockPush).toHaveBeenCalledWith('/login?returnTo=/');
    });


})