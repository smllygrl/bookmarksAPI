// This file is similar to Application.jsx in React

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

// @Module is a decorator
// A decorator is a function which adds meta-data to the class/ function etc that it is decorating. It adds more property to that class.
// A module can import other modules, controllers and providers
@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
