import { useGetProductById } from "../";

describe("Testing get product by id", () => {
    function setup() {
        const Product = {
            findOne: jest.fn().mockReturnValue({
                dataValues: {
                    id: 123,
                    name: "Test",
                },
            }),
        };
        const act = useGetProductById({ Product });
        return {
            act,
            Product,
        };
    }
    it("should return a valid product if there is no errors.", async () => {
        const { act } = setup();

        const response = await act("123");

        expect(response).toHaveProperty("id");
        expect(response.id).toBe(123);
    });
    it("should return correct error message if no product is found.", async () => {
        const { act, Product } = setup();

        Product.findOne.mockReturnValue({});

        await act("123").catch((err) => {
            expect(err.message).toEqual("Unable to find product by id.");
        });

        expect(Product.findOne).toHaveBeenCalledTimes(1);
    });
    it("should return correct error message if findOne throws an error.", async () => {
        const { act, Product } = setup();

        Product.findOne.mockRejectedValue("Unable to find product by id");

        await act("123").catch((err) => {
            expect(err.message).toEqual("Unable to find product by id.");
        });

        expect(Product.findOne).toHaveBeenCalledTimes(1);
    });
});
