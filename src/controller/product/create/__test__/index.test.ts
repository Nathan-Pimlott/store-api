import { useCreateProduct } from "../";

describe("Testing create product", () => {
    function setup() {
        const Product = {
            create: jest.fn().mockReturnValue({ dataValues: { id: 123 } }),
        };
        const act = useCreateProduct({ Product });
        return {
            act,
            Product,
        };
    }
    it("should return a true if there is no errors.", async () => {
        const { act, Product } = setup();

        const response = await act({ name: "test", description: "", img: "" });

        expect(response).toBe(true);
        expect(Product.create).toHaveBeenCalledTimes(1);
    });
    it("should return false if product is not created.", async () => {
        const { act, Product } = setup();

        Product.create.mockReturnValue({});

        await act({ name: "test", description: "", img: "" }).catch((err) => {
            expect(err.message).toEqual("Unable to create product.");
        });

        expect(Product.create).toHaveBeenCalledTimes(1);
    });
    it("should return correct error message if create throws an error.", async () => {
        const { act, Product } = setup();

        Product.create.mockRejectedValue({});

        await act({ name: "test", description: "", img: "" }).catch((err) => {
            expect(err.message).toEqual("Unable to create product.");
        });

        expect(Product.create).toHaveBeenCalledTimes(1);
    });
});
