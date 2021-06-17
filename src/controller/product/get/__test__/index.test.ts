import { useGetProducts } from "../";

describe("Testing get product by id", () => {
    function setup() {
        const Product = {
            findAll: jest.fn().mockReturnValue([
                {
                    dataValues: {
                        id: 123,
                        name: "Test",
                    },
                },
                {
                    dataValues: {
                        id: 234,
                        name: "Not Test",
                    },
                },
            ]),
            count: jest.fn().mockReturnValue(2),
        };
        const Sequelize = {
            Op: {
                like: "",
                gte: "",
                lte: "",
            },
        };
        const act = useGetProducts({ Product, Sequelize });
        return {
            act,
            Product,
        };
    }
    it("should return valid products if there is no errors.", async () => {
        const { act, Product } = setup();

        const response = await act({ name: "test" });

        expect(response.count).toBe(2);
        expect(response.products).toHaveLength(2);
        expect(Product.findAll).toHaveBeenCalledTimes(1);
        expect(Product.count).toHaveBeenCalledTimes(1);
    });
    it("should return empty array if no products are found.", async () => {
        const { act, Product } = setup();

        Product.findAll.mockReturnValue([]);

        const response = await act({ name: "test" });

        expect(response.products).toHaveLength(0);
        expect(Product.findAll).toHaveBeenCalledTimes(1);
        expect(Product.count).toHaveBeenCalledTimes(1);
    });
    it("should return count=0 if no products are found.", async () => {
        const { act, Product } = setup();

        Product.count.mockReturnValue(0);

        const response = await act({ name: "test" });

        expect(response.count).toBe(0);
        expect(Product.findAll).toHaveBeenCalledTimes(1);
        expect(Product.count).toHaveBeenCalledTimes(1);
    });
    it("should return correct error message if findAll throws an error.", async () => {
        const { act, Product } = setup();

        Product.findAll.mockRejectedValue("Unable to find product by id");

        await act({ name: "test" }).catch((err) => {
            expect(err.message).toEqual("Unable to find products.");
        });

        expect(Product.findAll).toHaveBeenCalledTimes(1);
        expect(Product.count).toHaveBeenCalledTimes(0);
    });
    it("should return correct error message if count throws an error.", async () => {
        const { act, Product } = setup();

        Product.count.mockRejectedValue("Unable to find product by id");

        await act({ name: "test" }).catch((err) => {
            expect(err.message).toEqual("Unable to find products.");
        });

        expect(Product.findAll).toHaveBeenCalledTimes(1);
        expect(Product.count).toHaveBeenCalledTimes(1);
    });
});
