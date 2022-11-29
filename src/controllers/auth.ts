const _login = async ({ request, response }: Context) => {
  const body = await request.body().value;
  const { email, password } = body;
  const user = await UserModel.getByEmail(email);
  if (!user) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No user found",
    };
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Invalid credentials",
    };
    return;
  }
  const token = await createToken(user);
  response.status = 200;
  response.body = {
    success: true,
    message: "Successfully logged in",
    token,
  };
};
