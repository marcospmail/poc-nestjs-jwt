import * as bcrypt from 'bcryptjs';

export default (password: string) => {
  return bcrypt.hashSync(password, 10)
}