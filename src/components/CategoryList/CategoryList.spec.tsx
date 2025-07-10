// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import CategoryList from "./CategoryList";
// import { wixClientServer } from "@/lib/wixClientServer";

// jest.mock('next/image', () => ({
//     __esModule: true,
//     default: function MockedImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
//         return <img {...props} />;
//     },
// }));
  
  
// jest.mock('@/lib/wixClientServer', () => ({
//     wixClientServer: jest.fn(),
// }));

// describe('CategoryList', () => {
//     it('renders category cards correctly', async () => {
//         const mockCats = {
//             items: [
//                 {
//                     _id: '1',
//                     slug: 'electronics',
//                     name: 'Electronics',
//                     media: {
//                         mainMedia: {
//                             image: {
//                                 url: 'https://example.com/electronics.jpg'
//                             }
//                         }
//                     }
                    
//                 },
//                 {
//                     _id: '2',
//                     slug: 'clothing',
//                     name: 'Clothing',
//                     media: {
//                         mainMedia: {
//                             image: {
//                                 url: 'https://example.com/clothing.jpg'
//                             }
//                         }
//                     }
//                 },
//             ]
//         };

//         (wixClientServer as jest.Mock).mockReturnValue({
//             collections: {
//                 queryCollections: () => ({
//                     find: () => Promise.resolve(mockCats),
//                 })
//             }
//         })

//         render(<CategoryList />);

//         await waitFor(() => {
//             expect(screen.getByText('Electronics')).toBeInTheDocument();
//             expect(screen.getByText('Clothing')).toBeInTheDocument();
//         });

//         expect(screen.getAllByRole('img')).toHaveLength(2);

//         expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', '/list?cat=electronics')
//     })
// })



