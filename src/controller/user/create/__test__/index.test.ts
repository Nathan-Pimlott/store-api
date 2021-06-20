import { useCreateUser } from "../";

const mockData = {
    email: "test",
    password: "test",
    forename: "test",
    surname: "test",
};

describe("Testing create user", () => {
    function setup() {
        const User = {
            create: jest.fn().mockReturnValue({ dataValues: { id: 123 } }),
        };
        const act = useCreateUser({ User });
        return {
            act,
            User,
        };
    }
    it("should return a true if the user is created.", async () => {
        const { act, User } = setup();

        const response = await act(mockData);

        expect(response).toBe(true);
        expect(User.create).toHaveBeenCalledTimes(1);
    });
    it("should throw an error if user is not created.", async () => {
        const { act, User } = setup();

        User.create.mockReturnValue({});

        await act(mockData).catch((err) => {
            expect(err.message).toEqual("Unable to create user.");
        });

        expect(User.create).toHaveBeenCalledTimes(1);
    });
    it("should return correct error message if create throws an error.", async () => {
        const { act, User } = setup();

        User.create.mockRejectedValue({});

        await act(mockData).catch((err) => {
            expect(err.message).toEqual("Unable to create user.");
        });

        expect(User.create).toHaveBeenCalledTimes(1);
    });
});
