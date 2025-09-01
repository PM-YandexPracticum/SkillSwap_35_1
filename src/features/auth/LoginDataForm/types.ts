export interface LoginDataFormProps {
  nextStep?: () => void;
  variant: 'register' | 'auth';
  onAuth?: () => void;
  goToRegister?: () => void;
}
