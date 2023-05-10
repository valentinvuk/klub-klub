import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthSignUpCredentialsDto {
  @Matches(/^.+@aiesec\.net$/, {
    message: 'Please enter proper aiesec email address.',
  })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
