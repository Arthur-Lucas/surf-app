import { signUp } from "../../services/authService";

jest.mock("../../utils/supabase.utils", () => ({
  createClient: jest.fn().mockResolvedValue({
    auth: {
      signUp: jest.fn(({ email, password }) => {
        if (email && password) {
          return { data: { user: { email } }, error: null };
        }
        throw new Error("Invalid input");
      }),
    },
  }),
}));

describe("authService - signUp", () => {
  it("should sign up a user successfully", async () => {
    const email = "test@example.com";
    const password = "password123";

    const result = await signUp(email, password);

    expect(result).toEqual({ user: { email } });
  });

  it("should throw an error if sign up fails", async () => {
    const email = "";
    const password = "";

    await expect(signUp(email, password)).rejects.toThrow("Invalid input");
  });
});
