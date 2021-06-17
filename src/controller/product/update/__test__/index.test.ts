import { useUpdateProduct } from "../";

describe("Testing update product", () => {
    function setup() {
        const Product = {
            update: jest.fn().mockReturnValue([1]),
        };
        const act = useUpdateProduct({ Product });
        return {
            act,
            Product,
        };
    }
    it("should return a valid product if there is no errors.", async () => {
        const { act, Product } = setup();

        const response = await act({ id: 123 });

        expect(response).toBe(true);
        expect(Product.update).toHaveBeenCalledTimes(1);
    });
    it("should return correct error message if product is not found.", async () => {
        const { act, Product } = setup();

        Product.update.mockReturnValue([0]);

        await act({ id: 123 }).catch((err) => {
            expect(err.message).toEqual("Unable to update product.");
        });

        expect(Product.update).toHaveBeenCalledTimes(1);
    });
    it("should return correct error message if update throws an error.", async () => {
        const { act, Product } = setup();

        Product.update.mockRejectedValue("Unable to update product.");

        await act({ id: 123 }).catch((err) => {
            expect(err.message).toEqual("Unable to update product.");
        });

        expect(Product.update).toHaveBeenCalledTimes(1);
    });
});
