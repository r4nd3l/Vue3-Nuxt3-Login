import { getUserByEmail } from '~~/server/models/user'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string; rememberMe: boolean }>(event)

  const {
    email,
    password,
    rememberMe,
  } = body

  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: 'Email address and password are required',
    })
  }

  const userWithPassword = await getUserByEmail(email)

  if (!userWithPassword) {
    return createError({
      statusCode: 401,
      message: 'Bad credentials',
    })
  }

  const verified = await verify(password, userWithPassword.password)

  if (!verified) {
    return createError({
      statusCode: 401,
      message: 'Bad credentials',
    })
  }

  const config = useRuntimeConfig()

  const session = serialize({ userId: userWithPassword.id })
  const signedSession = sign(session, config.cookieSecret)

  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    expires: rememberMe ? new Date(Date.now() + config.cookieRememberMeExpires) : new Date(Date.now() + config.cookieExpires),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword

  return {
    user: userWithoutPassword,
  }
})
