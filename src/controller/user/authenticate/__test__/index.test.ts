import { useAuthenticate } from "../";

describe("Testing authenticate", () => {
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
        const act = useAuthenticate({ User, bcrypt });
        return {
            act,
            User,
            bcrypt,
        };
    }
    it("should return a valid user if a user is found and password is correct.", async () => {
        const { act, User, bcrypt } = setup();

        const response = await act({ email: "test", password: "test" });
        console.log("Response: ", response);

        expect(response.authenticated).toBe(true);
        expect(response.user).toHaveProperty("id");
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });
    it("should return an empty user object if a user if found but password is incorrect.", async () => {
        const { act, User, bcrypt } = setup();

        bcrypt.compare.mockReturnValue(false);

        const response = await act({ email: "test", password: "test" });

        expect(response.authenticated).toBe(false);
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });
    it("should return authenticated: false if a user is not found.", async () => {
        const { act, User, bcrypt } = setup();

        User.findAll.mockReturnValue([]);

        const response = await act({ email: "test", password: "test" });

        expect(response.authenticated).toBe(false);
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(0);
    });
    it("should return authenticated: false if User.findAll throws an error.", async () => {
        const { act, User, bcrypt } = setup();

        User.findAll.mockRejectedValue("No records found");

        const response = await act({ email: "test", password: "test" });

        expect(response.authenticated).toBe(false);
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(0);
    });
    it("should return authenticated: false if bcrypt.compare throws an error.", async () => {
        const { act, User, bcrypt } = setup();

        bcrypt.compare.mockRejectedValue("Unable to compare");

        const response = await act({ email: "test", password: "test" });

        expect(response.authenticated).toBe(false);
        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });
});
