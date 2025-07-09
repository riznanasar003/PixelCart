import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartModal from './CartModal';
import { useCartStore } from '../../hooks/useCartStore';
import { useWixClient } from '../../hooks/useWixClient';
import { useRouter } from 'next/navigation';

jest.mock('@/hooks/useCartStore');
jest.mock('@/hooks/useWixClient');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('CartModal', () => {
    const mockPush = jest.fn();
    const mockRemoveItem = jest.fn();
    const mockWixClient = {};

    const mockedUseCartStore = useCartStore as unknown as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (useWixClient as jest.Mock).mockReturnValue(mockWixClient);
    });

    it('renders empty cart message', () => {
        mockedUseCartStore.mockReturnValue({
            cart: { lineItems: [] },
            isLoading: false,
            removeItem: jest.fn(),
        });

        render(<CartModal />);
        expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
        expect(screen.getByText('Cart is Empty')).toBeInTheDocument();
    });

    it('renders cart items and subtotal correctly', () => {
        mockedUseCartStore.mockReturnValue({
            cart: {
                lineItems: [
                    {
                        _id: 'item1',
                        productName: { original: 'Product A' },
                        price: { amount: 100 },
                        quantity: 2,
                        image: 'https://example.com/image.jpg',
                        availability: { status: true },
                    },
                ],
            },
            isLoading: false,
            removeItem: mockRemoveItem,
        });

        render(<CartModal />);
        expect(screen.getByText('Product A')).toBeInTheDocument();
        expect(screen.getByText('₹ 200.00')).toBeInTheDocument();
        expect(screen.getByText('Qty : 2')).toBeInTheDocument();
        expect(screen.getByText('Remove')).toBeInTheDocument();
    });

    it('calls removeItem on click', () => {
        mockedUseCartStore.mockReturnValue({
            cart: {
                lineItems: [
                    {
                        _id: 'item1',
                        productName: { original: 'Product A' },
                        price: { amount: 100 },
                        quantity: 1,
                        image: 'https://example.com/image.jpg',
                        availability: { status: true },
                    },
                ],
            },
            isLoading: false,
            removeItem: mockRemoveItem,
        });

        render(<CartModal />);
        fireEvent.click(screen.getByText('Remove'));
        expect(mockRemoveItem).toHaveBeenCalledWith(mockWixClient, 'item1');
    });

    it('disables checkout button when loading', () => {
        mockedUseCartStore.mockReturnValue({
            cart: {
                lineItems: [
                    {
                        _id: 'item1',
                        productName: { original: 'Product A' },
                        price: { amount: 50 },
                        quantity: 1,
                        image: 'https://example.com/image.jpg',
                        availability: { status: true },
                    },
                ],
            },
            isLoading: true,
            removeItem: mockRemoveItem,
        });

        render(<CartModal />);
        expect(screen.getByText('Checkout')).toBeDisabled();
    });

    it('navigates to /cart and /checkout on button clicks', () => {
        mockedUseCartStore.mockReturnValue({
            cart: {
                lineItems: [
                    {
                        _id: 'item1',
                        productName: { original: 'Product A' },
                        price: { amount: 75 },
                        quantity: 1,
                        image: 'https://example.com/image.jpg',
                        availability: { status: true },
                    },
                ],
            },
            isLoading: false,
            removeItem: mockRemoveItem,
        });

        render(<CartModal />);
        fireEvent.click(screen.getByText('View Cart'));
        expect(mockPush).toHaveBeenCalledWith('/cart');

        fireEvent.click(screen.getByText('Checkout'));
        expect(mockPush).toHaveBeenCalledWith('/checkout');
    });
});
