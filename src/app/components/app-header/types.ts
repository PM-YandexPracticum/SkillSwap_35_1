import { type IUser } from '../../../entities/types/types';

/**
 * Пропсы для компонента AppHeader
 * user — объект с данными текущего пользователя (берем оттуда имя и аватар)
 * TODO: возможно стоит пересмотреть и получать аватар и имя отдельными строками
 * isRegistrationHeader — булево значение для отображения варианта header при регистрации
 */

export interface AppHeaderProps {
  user?: IUser | undefined;
  isRegistrationHeader?: boolean;
}
