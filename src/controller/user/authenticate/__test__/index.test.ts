import { useAuthenticate } from "../";

const mockData = { email: "test", password: "test" };

describe("Testing authenticate user", () => {
    function setup() {
        const User = {
            findAll: jest.fn().mockReturnValue([
                {
                    dataValues: {
                        id: 123,
                        name: "Test",
                    },
                },
            ]),
        };
        const bcrypt = {
            compare: jest.fn().mockReturnValue(true),
        };
        const jwt = {
            verify: jest.fn().mockReturnValue({ password: "password" }),
        };
        const signature = "test";
        const act = useAuthenticate({ User, bcrypt, jwt, signature });
        return {
            act,
            User,
            bcrypt,
            jwt,
        };
    }
    it("should return a valid user if a user is found and password is correct.", async () => {
        const { act, User, bcrypt, jwt } = setup();

        const response = await act(mockData);

        expect(response.authenticated).toBe(true);
        expect(response.user).toHaveProperty("id");

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(jwt.verify).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });
    it("should return unauthenticated if a user if found but password is incorrect.", async () => {
        const { act, User, bcrypt, jwt } = setup();

        bcrypt.compare.mockReturnValue(false);

        const response = await act(mockData);

        expect(response.authenticated).toBe(false);

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(jwt.verify).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });
    it("should return unauthenticated if a user is not found.", async () => {
        const { act, User, bcrypt } = setup();

        User.findAll.mockReturnValue([]);

        const response = await act(mockData);

        expect(response.authenticated).toBe(false);
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(0);
    });
    it("should return unauthenticated if User.findAll throws an error.", async () => {
        const { act, User, bcrypt, jwt } = setup();

        User.findAll.mockRejectedValue("No records found");

        const response = await act(mockData);

        expect(response.authenticated).toBe(false);
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(jwt.verify).toHaveBeenCalledTimes(0);
        expect(bcrypt.compare).toHaveBeenCalledTimes(0);
    });
    it("should return unauthenticated if bcrypt.compare throws an error.", async () => {
        const { act, User, bcrypt, jwt } = setup();

        bcrypt.compare.mockRejectedValue("Unable to compare");

        const response = await act(mockData);

        expect(response.authenticated).toBe(false);
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(jwt.verify).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });
});
