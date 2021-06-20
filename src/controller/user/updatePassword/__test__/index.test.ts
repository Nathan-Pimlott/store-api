import { useUpdateUserPassword } from "../";

const mockData = {
    email: "test",
    newPassword: "test",
    currentPassword: "test",
};
const errorMessage = "Unable to update user's password.";
describe("Testing update user password", () => {
    function setup() {
        const User = {
            findAll: jest
                .fn()
                .mockReturnValue([{ dataValues: { password: "password" } }]),
            update: jest.fn().mockReturnValue({ success: true }),
        };
        const bcrypt = {
            compare: jest.fn().mockReturnValue(true),
            hash: jest.fn().mockReturnValue("hash"),
        };
        const act = useUpdateUserPassword({ User, bcrypt });
        return {
            act,
            User,
            bcrypt,
        };
    }
    it("should return true if the user's password is updated.", async () => {
        const { act, User, bcrypt } = setup();

        const response = await act(mockData);

        expect(response).toBe(true);
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(User.update).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
        expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    });
    it("should return correct error message if user is not found.", async () => {
        const { act, User, bcrypt } = setup();

        User.findAll.mockReturnValue([]);

        await act(mockData).catch((err) => {
            expect(err.message).toEqual(errorMessage);
        });

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(User.update).toHaveBeenCalledTimes(0);
        expect(bcrypt.compare).toHaveBeenCalledTimes(0);
        expect(bcrypt.hash).toHaveBeenCalledTimes(0);
    });
    it("should return correct error message if User.findAll throws an error.", async () => {
        const { act, User, bcrypt } = setup();

        User.findAll.mockRejectedValue("error");

        await act(mockData).catch((err) => {
            expect(err.message).toEqual(errorMessage);
        });

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(User.update).toHaveBeenCalledTimes(0);
        expect(bcrypt.compare).toHaveBeenCalledTimes(0);
        expect(bcrypt.hash).toHaveBeenCalledTimes(0);
    });
    it("should return correct error message if User.update throws an error.", async () => {
        const { act, User, bcrypt } = setup();

        User.update.mockRejectedValue("error");

        await act(mockData).catch((err) => {
            expect(err.message).toEqual(errorMessage);
        });

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(User.update).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
        expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    });
    it("should return correct error message if bcrypt.compare throws an error.", async () => {
        const { act, User, bcrypt } = setup();

        bcrypt.compare.mockRejectedValue("error");

        await act(mockData).catch((err) => {
            expect(err.message).toEqual(errorMessage);
        });

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
        expect(User.update).toHaveBeenCalledTimes(0);
        expect(bcrypt.hash).toHaveBeenCalledTimes(0);
    });
    it("should return correct error message if bcrypt.hash throws an error.", async () => {
        const { act, User, bcrypt } = setup();

        bcrypt.hash.mockRejectedValue("error");

        await act(mockData).catch((err) => {
            expect(err.message).toEqual(errorMessage);
        });

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
        expect(bcrypt.hash).toHaveBeenCalledTimes(1);
        expect(User.update).toHaveBeenCalledTimes(0);
    });
});
